// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
    modules: [
    '@nuxt/image',
    '@nuxtjs/sitemap',
    [
      '@storyblok/nuxt',
      {
        accessToken: process.env.STORYBLOK_TOKEN,
        apiOptions: { region: 'eu' }
      }
    ]
  ],
  site: {
    url: process.env.NUXT_PUBLIC_SITE_URL || 'https://kanmafoto.se'
  },
  sitemap: {
    siteUrl: 'https://kanmafoto.se',
    // add routes that aren’t easily discoverable:
    /* urls: ['/workshop-streetdance'], */
    defaults: { changefreq: 'monthly', priority: 0.7 }
  },
  image: {
    screens: { md: 960, lg: 1280, xl: 1920 },
  },
  css: ["~/assets/styles/main.scss"],
/*   nitro: {
    preset: "static",
    prerender: {
      // Nuxt will crawl links by default; list extra routes if needed:
      routes: ["/workshop-streetdance"],
    },
  },

  app: {
    head: {
      title: "Femme Fusion",
      meta: [
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          name: "description",
          content:
            "En showgrupp som erbjuder dans och sång med burlesque-inspiration.",
        },

        // Twitter
        { name: "twitter:title", content: "Femme Fusion" },
        {
          name: "twitter:description",
          content: "En showgrupp som erbjuder dans och sång…",
        },
        { name: "twitter:image", content: "https://femmefusion.se/images/meta.jpg" },

        // OG
        { property: "og:url", content: "https://femmefusion.se" },
        { property: "og:title", content: "Femme Fusion" },
        {
          property: "og:description",
          content: "En showgrupp som erbjuder dans och sång…",
        },
        { property: "og:image", content: "https://femmefusion.se/images/meta.jpg" },
        { property: "og:type", content: "website" },

        // Theme
        { name: "theme-color", content: "#660016" },
        { name: "msapplication-TileColor", content: "#b91d47" },
      ],
      link: [
        // Keep these files in /public/favicon/...
        {
          rel: "apple-touch-icon",
          sizes: "180x180",
          href: "/favicon/apple-touch-icon.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "32x32",
          href: "/favicon/favicon-32x32.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "16x16",
          href: "/favicon/favicon-16x16.png",
        },
        { rel: "manifest", href: "/favicon/site.webmanifest" },
        {
          rel: "mask-icon",
          href: "/favicon/safari-pinned-tab.svg",
          color: "#660016",
        },
        { rel: "shortcut icon", href: "/favicon/favicon.ico" },
      ],
      script: [
        // GA
        {
          src: "https://www.googletagmanager.com/gtag/js?id=G-6DXJST8ZM1",
          async: true,
        },
        {
          children: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-6DXJST8ZM1');
          `,
        },
        // Meta Pixel
        {
          children: `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
            n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}
            (window, document,'script','https://connect.facebook.net/en_US/fbevents.js');
            fbq('init','1551115292450247'); fbq('track','PageView');`,
        },
      ],
      noscript: [
        {
          children: `<img height="1" width="1" style="display:none"
           src="https://www.facebook.com/tr?id=1551115292450247&ev=PageView&noscript=1" />`,
        },
      ],
    },
  }, */
});
