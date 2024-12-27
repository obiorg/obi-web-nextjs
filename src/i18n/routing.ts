import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';
import { defaultLocale, locales } from '../config';

export const routing = defineRouting({
    locales,
    defaultLocale,

    // localePrefix: "always",
    // // localeDetection: false,

    // Will be merged with the defaults
    localeCookie: {
        // Custom cookie name
        name: 'USER_LOCALE',
        // Expire in one day
        maxAge: 60 * 60 * 24
    }

    // localeCookie: false,
});

// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing);
