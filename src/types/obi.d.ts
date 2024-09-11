/* FullCalendar Types */
import { EventApi, EventInput } from '@fullcalendar/core';

/* Chart.js Types */
import { ChartData, ChartOptions } from 'chart.js';

export interface ChartDataState {
    barData?: ChartData;
    pieData?: ChartData;
    lineData?: ChartData;
    polarData?: ChartData;
    radarData?: ChartData;
}

declare namespace OBI {
    interface ColumnMeta {
        field: string;
        header: string;
        bodyTemplate?: any;
        sortable?: any;
        filter?: any;
        filterPlaceholder?: any;
        dataType?: any;
    }

    interface SizeOption {
        label: string;
        value: string;
    }

    // Define the shape of the form errors entities
    interface EntitiesFormErrors {
        id?: string[];
        deleted?: string[];
        created?: string[];
        changed?: string[];
        entity?: string[];
        designation?: string[];
        builded?: string[];
        main?: string[];
        activated?: string[];
        logoPath?: string[];
        location?: string[];
    }

    // Define the shape of the form state
    interface EntitiesFormState {
        errors: EntitiesFormErrors;
    }

    // Define the props that the PostForm component expects
    interface EntitiesPostFormProps {
        formAction: any; // The action to perform when the form is submitted
        type: number; // 0: create, 1: update, 2: destroy (delete), 3: read
        initialData: {
            // The initial data for the form fields
            id: number;
            deleted: boolean;
            created: date;
            changed: date;

            entity: string;
            designation: string;
            builded: boolean;
            main: number;
            activated: boolean;
            logoPath: string;
            location: number;
        };
    }

    // Define an interface for the form state
    interface EntitiesPostFormState {
        errors: {
            id?: string[];
            deleted?: string[];
            created?: string[];
            changed?: string[];
            entity?: string[];
            designation?: string[];
            builded?: string[];
            main?: string[];
            activated?: string[];
            logoPath?: string[];
            location?: string[];
            _form?: string[];
        };
    }

    // Define an interface for the form state
    interface LocationsFormState {
        errors: {
            id?: string[];
            deleted?: string[];
            created?: string[];
            changed?: string[];

            location?: string[];
            designation?: string[];
            group?: string[];

            country?: string[];
            state?: string[];
            city?: string[];
            address?: string[];
            address1?: string[];
            address3?: string[];
            bloc?: string[];
            floor?: string[];
            number?: string[];
            _form?: string[];
        };
    }

    type businesses = {
        id?: number;
        deleted?: boolean;
        created?: Date;
        changed?: Date;
        business?: string;
        designation?: string;
        builded?: number;
        main?: boolean;
        activated?: boolean;
        logoPath?: string;
        location?: number;
        entity?: string;
        locations?: OBI.locations;
        entities?: OBI.entities;
    };

    type companies = {
        id?: number;
        deleted?: boolean;
        created?: Date;
        changed?: Date;
        company: number;
        designation?: string;
        builded?: number;
        main?: boolean;
        activated?: boolean;
        logoPath?: string;
        location?: number;
        business?: number;
        businesses?: OBI.businesses;
        locations?: OBI.locations;
    };

    type entities = {
        id?: number;
        deleted?: boolean;
        created?: Date;
        changed?: Date;
        entity?: string;
        designation?: string;
        builded?: number;
        main?: boolean;
        activated?: boolean;
        logoPath?: string;
        location?: number;
        locations?: OBI.locations;
    };

    type loc_cities = {
        id?: number;
        name?: string;
        state_id?: number;
        state_code?: string;
        country_id?: number;
        country_code?: string;
        latitude?: number;
        longitude?: number;
        created_at?: Date;
        updated_at?: Date;
        flag?: boolean;
        wikiDataId?: string;
        loc_states?: OBI.loc_states;
        loc_countries?: OBI.loc_countries;
    };

    type loc_countries = {
        id?: number;
        name?: string;
        iso3?: string;
        numeric_code?: string;
        iso2?: string;
        phonecode?: string;
        capital?: string;
        currency?: string;
        currency_name?: string;
        currency_symbol?: string;
        tld?: string;
        native?: string;
        region?: string;
        region_id?: number;
        subregion?: string;
        subregion_id?: number;
        nationality?: string;
        timezones?: string;
        translations?: string;
        latitude?: number;
        longitude?: number;
        emoji?: string;
        emojiU?: string;
        created_at?: Date;
        updated_at?: Date;
        flag?: boolean;
        wikiDataId?: string;
        loc_regions?: OBI.loc_regions;
        loc_subregions?: OBI.loc_subregions;
    };

    type loc_regions = {
        id?: number;
        name?: string;
        translations?: string;
        created_at?: Date;
        updated_at?: Date;
        flag?: boolean;
        wikiDataId?: string;
    };

    type loc_states = {
        id?: number;
        name?: string;
        country_id?: number;
        country_code?: string;
        fips_code?: string;
        iso2?: string;
        type?: string;
        latitude?: number;
        longitude?: number;
        created_at?: Date;
        updated_at?: Date;
        flag?: boolean;
        wikiDataId?: string;
        loc_countries?: OBI.loc_countries;
    };

    type loc_subregions = {
        id?: number;
        name?: string;
        translations?: string;
        region_id?: number;
        created_at?: Date;
        updated_at?: Date;
        flag?: boolean;
        wikiDataId?: string;
        loc_regions?: OBI.loc_regions;
    };

    type locations = {
        id?: number;
        deleted?: boolean;
        created?: Date;
        changed?: Date;
        location?: string;
        designation?: string;
        group?: string;
        country?: number;
        state?: number;
        city?: number;
        address?: string;
        address1?: string;
        address3?: string;
        bloc?: string;
        floor?: number;
        number?: string;
        loc_cities?: OBI.loc_cities;
        loc_countries?: OBI.loc_countries;
        loc_states?: OBI.loc_states;
    };
    type mach_drivers = {
        id?: number;
        deleted?: boolean;
        created?: Date;
        changed?: Date;
        driver?: string;
        designation?: string;
    };

    type machines = {
        id?: number;
        deleted?: boolean;
        created?: Date;
        changed?: Date;
        company?: number;
        address?: string;
        mask?: string;
        dns?: string;
        ipv6?: string;
        port?: number;
        name?: string;
        rack?: number;
        slot?: number;
        driver?: number;
        mqtt?: boolean;
        mqtt_user?: string;
        mqtt_passwords?: string;
        webhook?: boolean;
        webhook_secret?: string;
        bus?: number;
        description?: string;

        companies?: OBI.companies;
        drivers?: OBI.mach_drivers;
    };

    type meas_comparators = {
        id?: number;
        deleted?: boolean;
        created?: Date;
        changed?: Date;
        symbol?: string;
        name?: string;
    };

    type meas_limits = {
        id?: number;
        deleted?: boolean;
        created?: Date;
        changed?: Date;
        business?: number;
        company?: number;
        tag?: number;
        name?: string;
        value?: number;
        comparator?: number;
        delay?: number;
        hysteresis?: number;
        target?: boolean;
        enable?: boolean;
        group?: number;
        sort?: number;
        description?: string;
        businesses?: OBI.businesses;
        companies?: OBI.companies;
        meas_comparators?: OBI.meas_comparators;
        meas_limits_groups?: OBI.meas_limits_groups;
        tags?: OBI.tags;
    };

    type meas_limits_groups = {
        id?: number;
        deleted?: boolean;
        created?: Date;
        changed?: Date;
        business?: number;
        company?: number;
        group?: string;
        designation?: string;
        description?: string;
        businesses?: OBI.businesses;
        companies?: OBI.companies;
    };

    type meas_units = {
        id?: number;
        deleted?: boolean;
        created?: Date;
        changed?: Date;
        entity?: string;
        sizeName?: string;
        sizeSymbol?: string;
        unitName?: string;
        unitSymbol?: string;
        dimension?: string;
        group?: string;
        tagging?: string;
        comment?: string;
        entities?: OBI.entities;
    };

    type pers_method = {
        id?: number;
        deleted?: boolean;
        created?: Date;
        changed?: Date;
        name?: string;
        comment?: string;
    };

    type pers_standard = {
        id?: number;
        deleted?: boolean;
        created?: Date;
        changed?: Date;
        company: number;
        tag: number;
        vFloat: number;
        vInt: number;
        vBool: boolean;
        vStr: string;
        vDateTime?: Date;
        vStamp?: Date;
        stampStart?: Date;
        stampEnd?: Date;
        tbf?: number;
        ttr?: number;
        error?: boolean;
        errorMsg?: string;
        companies?: OBI.companies;
        tags?: OBI.tags;
        pers_standard_limits?: OBI.pers_standard_limits[];
    };

    type pers_standard_limits = {
        id?: number;
        deleted?: boolean;
        created?: Date;
        changed?: Date;
        company: number;
        tag: number;
        pers_standard?: number;
        name?: string;
        value?: number;
        comparator?: number;
        delay?: number;
        hysteresis?: number;
        group?: number;
        sort?: number;
        hit?: boolean;
        reached?: boolean;
        companies?: OBI.companies;
        meas_comparators?: OBI.meas_comparators;
        meas_limits_groups?: OBI.meas_limits_groups;
        tags?: OBI.tags;
        pers_standard?: OBI.pers_standard;
    };

    type persistences = {
        id?: number;
        deleted?: boolean;
        created?: Date;
        changed?: Date;
        company?: number;
        tag?: number;
        method?: string;
        activate?: boolean;
        comment?: string;
        companies?: OBI.companies;
        pers_method?: OBI.pers_method;
        tags?: OBI.tags;
    };

    type tags = {
        id?: number;
        deleted?: boolean;
        created?: Date;
        changed?: Date;

        company?: number;
        table?: number;
        name?: string;
        machine?: number;
        type?: number;
        memory?: number;
        db?: number;
        byte?: number;
        bit?: number;
        active?: boolean;
        cycle?: number;
        delta?: boolean;
        deltaFloat?: number;
        deltaInt?: number;
        deltaBool?: number;
        deltaDateTime?: Date;
        vFloat?: number;
        vInt?: number;
        vBool?: boolean;
        vStr?: string;
        vDateTime?: Date;
        vStamp?: Date;
        vDefault?: boolean;
        vFloatDefault?: number;
        vIntDefault?: number;
        vBoolDefault?: boolean;
        vStrDefault?: string;
        vDateTimeDefault?: Date;
        vStampDefault?: Date;
        counter?: boolean;
        counterType?: number;
        mesure?: boolean;
        mesureMin?: number;
        mesureMax?: number;
        mesureUnit?: number;
        mqtt_topic?: string;
        webhook?: string;
        laboratory?: boolean;
        formula?: boolean;
        formCalculus?: string;
        formProcessing?: number;
        error?: boolean;
        errorMsg?: string;
        errorStamp?: Date;
        alarmEnable?: boolean;
        alarm?: number;
        persistenceEnabled?: boolean;
        persOffsetEnable?: boolean;
        persOffsetFloat?: number;
        persOffsetInt?: number;
        persOffsetBool?: boolean;
        persOffsetDateTime?: Date;
        comment?: string;
        list?: number;

        alarms?: OBI.alarms;
        companies?: OBI.companies;
        tags_lists?: OBI.tags_lists;
        machines?: OBI.machines;
        meas_units?: OBI.meas_units;
        tags_memories?: OBI.tags_memories;
        tags_tables?: OBI.tags_tables;
        tags_types?: OBI.tags_types;
    };
}
