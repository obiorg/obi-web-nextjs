'use client';

/** langue */
import Header from "../../obi/components/Header/Header";
import Footer from "../../obi/components/Footer/Footer";
import { getDirection } from "../../lib/intl";

/** Primereact */
import { LayoutContext, LayoutProvider } from '@/src/layout/context/layoutcontext';

import { addLocale, locale, PrimeReactProvider } from 'primereact/api';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import '@/src/styles/layout/layout.scss';
import '@/src/styles/demo/Demos.scss';
import { useContext, useEffect, useState } from 'react';
import { Button } from "primereact/button";


type RootLayoutProps = {
    params: { lang: string };
    children: React.ReactNode;
};


export default function RootLayout({ params, children }: RootLayoutProps) {
    /** Manage locale properties */
    const { lang } = params || {lang:'fr'};
    const [locale, setLocale] = useState<any>(lang);

    /** Prime react */
    const { layoutConfig } = useContext(LayoutContext);


    addLocale('fr', {
        /**
             * Starts with
             */
        startsWith: 'Commence par',
        /**
         * Contains
         */
        contains: 'Contient',
        /**
         * Not contains
         */
        notContains: 'Contient pas',
        /**
         * Ends with
         */
        endsWith: 'Termine par',
        /**
         * Equals
         */
        equals: 'Egale',
        /**
         * Not equals
         */
        notEquals: "Egale pas",
        /**
         * No Filter
         */
        noFilter: 'Aucun filtre',
        /**
         * Filter
         */
        filter: 'Filtre',
        /**
         * Less than
         */
        lt: 'I',
        /**
         * Less than or equal to
         */
        lte: 'IE',
        /**
         * Greater than
         */
        gt: 'S',
        /**
         * Greater than or equal to
         */
        gte: 'SE',
        /**
         * Date is
         */
        dateIs: 'Est ',
        /**
         * Date is not
         */
        dateIsNot: "N'est pas",
        /**
         * Date is before
         */
        dateBefore: 'Avant le',
        /**
         * Date is after
         */
        dateAfter: 'Après le',
        /**
         * Custom
         */
        custom: 'Personnaliser',
        /**
         * Clear
         */
        clear: "Effacer",
        /**
         * Apply
         */
        apply: "Appliquer",
        /**
         * Match All
         */
        matchAll: "Equivalent  à ",
        /**
         * Match Any
         */
        matchAny: "Pas équivalent à",
        /**
         * Add Rule
         */
        addRule: 'Règles',
        /**
         * Remove Rule
         */
        removeRule: 'Supp. règle',
        /**
         * Yes
         */
        accept: 'Accepter',
        /**
         * No
         */
        reject: 'Rejeter',
        /**
         * Choose
         */
        choose: 'Choisir',
        /**
         * Upload
         */
        upload: 'Charger',
        /**
         * Cancel
         */
        cancel: 'Annuler',
        /**
         * Close
         */
        close: 'Fermer',
        /**
         * Pending
         */
        pending: 'Attente',
        /**
         * ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
         */
        // fileSizeTypes: string[],
        /**
         * ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
         */
        dayNames: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
        /**
         * ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
         */
        dayNamesShort: ['Di', 'Lu', 'Ma', 'Me', 'Je', 'Ve', 'Sa'],
        /**
         * ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
         */
        dayNamesMin: ['D', 'L', 'M', 'Me', 'J', 'V', 'S'],
        /**
         * ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
         */
        monthNames: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre',
            'Octobre', 'Novembre', 'Décembre'],
        /**
         * ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
         */
        monthNamesShort: ['Jan', 'Feb', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Aoû', 'Sep', 'Oct', 'Nov', 'Dec'],

        /**
         * Choose Year
         */
        chooseYear: 'Choisir une année',
        /**
         * Choose Month
         */
        chooseMonth: 'Choisir un mois',
        /**
         * Choose Date
         */
        chooseDate: 'Choisir une date',
        /**
         * Previous Decade
         */
        prevDecade: 'Décade préc.',
        /**
         * Next Decade
         */
        nextDecade: 'Décade suivante',
        /**
         * Previous Year
         */
        prevYear: 'Année préc.',
        /**
         * Next Year
         */
        nextYear: "Année suivante",
        /**
         * Previous Month
         */
        prevMonth: 'Mois préc.',
        /**
         * Next Month
         */
        nextMonth: 'Mois suivant',
        /**
         * Previous Hour
         */
        prevHour: 'Heure préc.',
        /**
         * Next Hour
         */
        nextHour: 'Heure suivante',
        /**
         * Previous Minute
         */
        prevMinute: 'Minute préc.',
        /**
         * Next Minute
         */
        nextMinute: 'Minute suivante',
        /**
         * Previous Second
         */
        prevSecond: 'Seconde préc.',
        /**
         * Next Second
         */
        nextSecond: 'Seconde',
        /**
         * AM
         */
        am: 'am',
        /**
         * PM
         */
        pm: 'pm',
        /**
         * Today (Calendar date only)
         */
        today: 'Aujourd\'hui',
        /**
         * Now (Calendar using time)
         */
        now: 'Maintenant',
        /**
         * Wk
         */
        weekHeader: 'Semaine',
        /**
         * 0
         */
        firstDayOfWeek: 1,
        /**
         * mm/dd/yy
         */
        dateFormat: 'dd/mm/yy',
        /**
         * Weak
         */
        weak: 'Faible',
        /**
         * Medium
         */
        medium: 'Correct',
        /**
         * Strong
         */
        strong: 'Fort',
        /**
         * Enter a password
         */
        passwordPrompt: 'Mot de passe',
        /**
         * No available options
         */
        emptyFilterMessage: 'Pas de filtre',
        /**
         * No results found
         */
        emptyMessage: 'Vide',
        /**
         * ARIA labels
         */
        aria: {
            /**
             * True
             */
            trueLabel: 'Vrai',
            /**
             * False
             */
            falseLabel: 'Faux',
            /**
             * Not Selected
             */
            nullLabel: 'indéfini',
            /**
             * 1 star
             */
            star: 'étoile',
            /**
             * {star} stars
             */
            stars: 'étoiles',
            /**
             *  All items selected
             */
            selectAll: 'Selectionner tout',
            /**
             * All items unselected
             */
            unselectAll: 'Déselectionner tout',
            /**
             * Close
             */
            close: 'Fermé',
            /**
             * Previous
             */
            previous: 'Précédent',
            /**
             * Next
             */
            next: 'Suivant',
            /**
             * Navigation
             */
            navigation: 'Naviger',
            /**
             * Scroll Top
             */
            scrollTop: 'Remonté',
            /**
             * Move Top
             */
            moveTop: 'Déplacer au dessus',
            /**
             * Move Up
             */
            moveUp: 'Déplacer vers le haut',
            /**
             * Move Down
             */
            moveDown: 'Déplacer vers le bas',
            /**
             * Move Bottom
             */
            moveBottom: 'Déplacer en bas',
            /**
             * Move to Target
             */
            moveToTarget: 'Déplacer à la destination',
            /**
             * Move to Source
             */
            moveToSource: 'Déplacer à la source',
            /**
             * Move All to Target
             */
            moveAllToTarget: 'Déplacer tout à la destination',
            /**
             * Move All to Source
             */
            moveAllToSource: 'Déplacer tout à la source',
            /**
             * Page {page}
             */
            pageLabel: 'Page(s)',
            /**
             * Please enter one time password character {0}
             */
            otpLabel: 'Veuillez saisir le caractère {0} du mot de passe à usage unique',
            /**
             * First Page
             */
            firstPageLabel: 'Première page',
            /**
             * Last Page
             */
            lastPageLabel: 'Dernière de page',
            /**
             * Next Page
             */
            nextPageLabel: 'Page Suivante',
            /**
             * Previous Page
             */
            previousPageLabel: 'Page Préc.',
            /**
             * Rows per page
             */
            rowsPerPageLabel: 'Ligne par page',
            /**
             *  Jump to Page Dropdown
             */
            jumpToPageDropdownLabel: 'Sauter à la page',
            /**
             *  Jump to Page Input
             */
            jumpToPageInputLabel: 'Sauter à la page',
            /**
             *  Row Selected
             */
            selectRow: 'Selectionner ligne',
            /**
             * Row Unselected
             */
            unselectRow: 'Déselectionner ligne',
            /**
             * Row Expanded
             */
            expandRow: 'Développer ligne',
            /**
             * Row Collapsed
             */
            collapseRow: 'Réduire ligne',
            /**
             * Show Filter Menu
             */
            showFilterMenu: "Montrer Menu Filtre",
            /**
             * Hide Filter Menu
             */
            hideFilterMenu: 'Cache Menu Filtre',
            /**
             * Filter Operator
             */
            filterOperator: 'Opérateur filtre',
            /**
             * Filter Constraint
             */
            filterConstraint: 'Contraint Filtre',
            /**
             *  Edit Row
             */
            editRow: 'Edition ligne',
            /**
             * Save Edit
             */
            saveEdit: 'Sauver Edition',
            /**
             * Cancel Edit
             */
            cancelEdit: 'Annuler Edition',
            /**
             * List View
             */
            listView: 'Liste',
            /**
             * Grid View
             */
            gridView: 'Grille',
            /**
             * Slide
             */
            slide: 'Glisser',
            /**
             * {slideNumber}
             */
            slideNumber: 'Slide Number',
            /**
             * Zoom Image
             */
            zoomImage: 'Zoom cadre',
            /**
             * Zoom In
             */
            zoomIn: 'Zoom +',
            /**
             * Zoom Out
             */
            zoomOut: 'Zoom -',
            /**
             * Rotate Right
             */
            rotateRight: 'Rot. Droite',
            /**
             * Rotate Left
             */
            rotateLeft: 'Rot. Gauche',
        }

    });

    useEffect(() => {
        // Set up the locale
        setLocale('fr');
    }, []);
    // locale('fr');
    // locale('fr')

    const dir = getDirection(locale);
    console.log('Locale : ' + locale);
    return (
        <html lang={locale} dir={dir} suppressHydrationWarning>
            <head>
                <link id="theme-css" href={`/themes/lara-dark-teal/theme.css`} rel="stylesheet"></link>
            </head>
            <body>
                <PrimeReactProvider value={params}>
                    <LayoutProvider>{children}</LayoutProvider>

                </PrimeReactProvider>
            </body>
        </html>
    );
}
