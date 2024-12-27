export const locales = ["en", "ar", "fr", "nl-NL"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'fr';


export const languages =  [{"label": "English", "locale": "en"}, {"label": "عرب", "locale": "ع"}, {"label": "Français", "locale": "fr"}, {"label": "Dutch", "locale": "nl-NL"}];


