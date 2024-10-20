import BusinessesDropDown from "./businesses/businesses/components/BusinessesDropDown";
import CompaniesDropDown from "./businesses/companies/components/CompaniesDropDown";
import EntitiesDropDown from "./businesses/entities/components/EntitiesDropDown";
import MachinesDriversDropDown from "./connexions/drivers/components/MachinesDriversDropDown";
import CitiesDropDown from "./localisations/cities/components/CitiesDropDown";
import CountriesDropDown from "./localisations/countries/components/CountriesDropDown";
import RegionsDropDown from "./localisations/regions/components/RegionsDropDownw";
import StatesDropDown from "./localisations/states/components/StatesDropDown";
import SubRegionsDropDown from "./localisations/subregions/components/SubRegionsDropDownw";





exports.entity_lazyFilter = (options: any) => {
    // console.log('Options', options);
    return <EntitiesDropDown
        value={options.value}
        onChanged={(e: any) => {
            options.filterCallback(e.value);
        }}
    />;
}

exports.business_lazyFilter = (options: any) => {
    // console.log('Options', options);
    return <BusinessesDropDown
        value={options.value}
        onChanged={(e: any) => {
            options.filterCallback(e.value);
        }}
    />;
}

exports.company_lazyFilter = (options: any) => {
    // console.log('Options', options);
    return <CompaniesDropDown
        value={options.value}
        onChanged={(e: any) => {
            options.filterCallback(e.value);
        }}
    />;
}




exports.regions_lazyFilter = (options: any) => {
    // console.log('Options', options);
    return <RegionsDropDown
        value={options.value}
        onChanged={(e: any) => {
            options.filterCallback(e.value);
        }}
    />;
}


exports.subregions_lazyFilter = (options: any) => {
    // console.log('Options', options);
    return <SubRegionsDropDown
        value={options.value}
        onChanged={(e: any) => {
            options.filterCallback(e.value);
        }}
    />;
}

exports.countries_lazyFilter = (options: any) => {
    // console.log('Options', options);
    return <CountriesDropDown
        value={options.value}
        onChanged={(e: any) => {
            options.filterCallback(e.value);
        }}
    />;
}


exports.cities_lazyFilter = (options: any) => {
    // console.log('Options', options);
    return <CitiesDropDown
        value={options.value}
        onChanged={(e: any) => {
            options.filterCallback(e.value);
        }}
    />;
}


exports.states_lazyFilter = (options: any) => {
    // console.log('Options', options);
    return <StatesDropDown
        value={options.value}
        onChanged={(e: any) => {
            options.filterCallback(e.value);
        }}
    />;
}







exports.machines_drivers_lazyFilter = (options: any) => {
    // console.log('Options', options);
    return <MachinesDriversDropDown
        value={options.value}
        onChanged={(e: any) => {
            options.filterCallback(e.value);
        }}
    />;
}

