import CountriesDropDown from "../../countries/components/CountriesDropDown";





exports.lazyFilter = (options: any) => {
    console.log('Options', options);
    return <CountriesDropDown
        value={options.value}
        onChanged={(e: any) => {
            options.filterCallback(e.value);
        }}
    />;
}










