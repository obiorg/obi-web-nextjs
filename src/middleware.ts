import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Match only internationalized pathnames
  matcher: ["/", "/((?!api|static|.*\\..*|_next))/(en|ar|fr|nl-NL)/:path*"],
};
