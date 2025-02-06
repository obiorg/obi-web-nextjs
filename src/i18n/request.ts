import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  // This typically corresponds to the `[locale]` segment
  let locale = await requestLocale;
  // console.log(`request >> requestLocale is >> ${locale} << `);

  // Ensure that a valid locale is used
  if (!locale || !routing.locales.includes(locale as never)) {
    locale = routing.defaultLocale;
    console.log(`i18n\\request >> locale = routing.defaultLocale is >> ${locale} << `);
    
  }

  return {
    locale,
    messages: (
      await (locale === "fr"
        ? import(`@/src/lang/fr.json`)
        : import(`@/src/lang/${locale}.json`))
    ).default,
  };
});
