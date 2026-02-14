const toSnakeCase = (value: string) => {
  return value
    .replace(/([a-z0-9])([A-Z])/g, "$1_$2")
    .replace(/[-\s]+/g, "_")
    .toLowerCase();
};

export default defineNuxtPlugin((nuxtApp) => {
  const modules = import.meta.glob("~/storyblok/*.vue", { eager: true });

  Object.entries(modules).forEach(([path, mod]) => {
    const component = (mod as { default?: any }).default;
    if (!component) {
      return;
    }

    const filename = path.split(/[\\/]/).pop()?.replace(/\.vue$/, "");
    if (!filename) {
      return;
    }

    nuxtApp.vueApp.component(toSnakeCase(filename), component);
  });
});
