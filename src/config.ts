export const locales = ['en', 'ar', 'fr', 'nl-NL'] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'fr';
export const defaultLocalelable : string = 'Françaçs';
export const defaultLocaleFlag: string = 'FR';

export const languages = [
    { label: 'English', locale: 'en', flag: 'GB' },
    { label: 'عرب', locale: 'ar', flag: 'SA' },
    { label: 'Français', locale: 'fr', flag: 'FR' },
    { label: 'Dutch', locale: 'nl-NL', flag: 'NL' }
];

export function flagFromFlagKit(locale: string)  {
    let flag: string = defaultLocaleFlag;
    languages.map((language) => {
        if (language.locale === locale) {
            flag =  language.flag;
            return flag;
        }
    });
    return flag;
}

export function getLanguageLabel(locale: string)  {
    let lang: string = defaultLocaleFlag;
    languages.map((language) => {
        if (language.locale === locale) {
            lang =  language.label;
            return lang;
        }
    });
    return lang;
}

export function isLocale(locale: Locale) {
    let loc: boolean = false;
    languages.map((language) => {
        if (language.locale === locale) {
            return true;
        }
    });
    return false;
}
