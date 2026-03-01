import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  ssr: true,

  modules: ["@storyblok/nuxt"],

  css: ["@/assets/scss/main.scss"],

  runtimeConfig: {
    public: {
      storyblokToken: process.env.NUXT_PUBLIC_STORYBLOK_TOKEN || "",
      storyblokVersion: process.env.STORYBLOK_VERSION || "published",
    },
  },

  storyblok: {
    accessToken: process.env.NUXT_PUBLIC_STORYBLOK_TOKEN,
    apiOptions: {
      region: "eu",
    },
  },

  nitro: {
    preset: "static",
  },

  hooks: {
    async "nitro:config"(nitroConfig) {
      const token = process.env.NUXT_PUBLIC_STORYBLOK_TOKEN;
      if (!token) {
        throw new Error("Missing env var: NUXT_PUBLIC_STORYBLOK_TOKEN");
      }

      const version = process.env.STORYBLOK_VERSION || "published";

      const routes = await fetchAllStoryblokRoutes({
        token,
        version,
        homeSlug: "hem",
      });

      nitroConfig.prerender = nitroConfig.prerender || {};
      nitroConfig.prerender.routes = [
        ...(nitroConfig.prerender.routes || []),
        ...routes,
      ];
    },
  },

  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },

  app: {
    head: {
      link: [
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap",
        },
      ],
    },
  },
});

async function fetchAllStoryblokRoutes(options: {
  token: string;
  version: string;
  homeSlug: string;
}) {
  const { token, version, homeSlug } = options;

  const routes: string[] = ["/"];
  const perPage = 100;
  let page = 1;

  while (true) {
    const url =
      `https://api.storyblok.com/v2/cdn/links` +
      `?token=${encodeURIComponent(token)}` +
      `&version=${encodeURIComponent(version)}` +
      `&per_page=${perPage}` +
      `&page=${page}`;

    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Storyblok links fetch failed: ${res.status}`);
    }

    const data = await res.json();
    const links = data?.links || {};
    const values = Object.values(links) as any[];

    for (const link of values) {
      if (!link?.slug) {
        continue;
      }

      if (link.is_folder) {
        continue;
      }

      if (link.slug === homeSlug) {
        continue;
      }

      routes.push(`/${link.slug}`);
    }

    const total = Number(data?.total || 0);
    const maxPage = Math.ceil(total / perPage);

    if (page >= maxPage || values.length === 0) {
      break;
    }

    page += 1;
  }

  return Array.from(new Set(routes));
}