import CompaniesDropDown from "./business/compnies/components/CompaniesDropDown";
import MachinesDriversDropDown from "./connexions/drivers/components/MachinesDriversDropDown";
import CitiesDropDown from "./localisations/cities/components/CitiesDropDown";
import CountriesDropDown from "./localisations/countries/components/CountriesDropDown";
import StatesDropDown from "./localisations/states/components/StatesDropDown";





exports.company_lazyFilter = (options: any) => {
    // console.log('Options', options);
    return <CompaniesDropDown
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






exports.machines_drivers_lazyFilter = (options: any) => {
    // console.log('Options', options);
    return <MachinesDriversDropDown
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

