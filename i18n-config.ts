export const i18n = {
  locales: ["en", "ar", "fr", "nl-NL"],
  languages: [{"label": "English", "locale": "en"}, {"label": "عرب", "locale": "ع"}, {"label": "Français", "locale": "fr"}, {"label": "Dutch", "locale": "nl-NL"}],
  defaultLocale: "fr",
};

export type I18nConfig = typeof i18n;
export type Locale = I18nConfig["locales"][number];
