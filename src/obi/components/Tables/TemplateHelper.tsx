import { Calendar } from "primereact/calendar";
import { InputNumber } from "primereact/inputnumber";
import { Password } from "primereact/password";
import { TriStateCheckbox } from "primereact/tristatecheckbox";
import { classNames } from "primereact/utils";







exports.bool = (rowData: any) => {
    return <i className={
        classNames('pi', {
            'true-icon pi-check text-red-600':
                rowData?.deleted, 'false-icon pi-times text-green-600': !rowData?.deleted
        })} />;
}

exports.datetime = (rowData: any) => {
    if (rowData === undefined) {
        return '';
    }

    var dateParts;
    if (rowData.created) {
        dateParts = rowData.created.split('-')
    } else {
        dateParts = rowData.created_at.split('-')
    }
    var jsDate = new Date(
        dateParts[0],
        dateParts[1] - 1,
        dateParts[2].substr(0, 2),
        dateParts[2].substr(3, 2),
        dateParts[2].substr(6, 2),
        dateParts[2].substr(9, 2)
    )
    return (
        <span>
            {jsDate.toLocaleDateString('fr') +
                ' ' +
                jsDate.toLocaleTimeString('fr')}
        </span>
    )
}


exports.integerFilterTemplate = (options: any) => {
    // console.log(options)
    return <InputNumber value={options.value} onValueChange={(e) => { options.filterApplyCallback(e.value); }} />
}

exports.booleanFilterTemplate = (options: any) => {
    return <TriStateCheckbox value={options.value} onChange={(e) => { options.filterApplyCallback(e.value); }} />
}

exports.dateFilterTemplate = (options: any) => {
    return <Calendar value={options.value}
        onChange={(e: any) => { console.log(e); options.filterCallback(e.value, options.index); options.value = e.value; }}
        // showTime 
        showIcon
        hourFormat="24"
        showButtonBar
        dateFormat="dd/mm/yy" placeholder="dd/mm/yy" mask="99/99/9999"
        locale='fr'

    // headerTemplate={() => <Button label="Custom Button" />} footerTemplate={() => <div>Footer Content</div>}
    // dateTemplate={dateTemplater}
    />
}





exports.business = (rowData: any) => {
    return <label>
        {rowData.businesses?.business + ' - '
            + rowData.businesses?.designation
            + ' [' + rowData.businesses?.id + ']'} </label>
}

exports.entity = (rowData: any) => {
    return <label>
        {rowData.entities?.entity + ' - '
            + rowData.entities?.designation
            + ' [' + rowData.entities?.id + ']'} </label>
}


exports.regions = (rowData: any) => {
    return <label>
        {rowData.loc_regions?.name + ' ('
            + rowData.loc_regions?.wikiDataId
            + ') [' + rowData.loc_regions?.id + ']'} </label>
}

exports.subregions = (rowData: any) => {
    return <label>
        {rowData.loc_subregions?.name + ' ('
            + rowData.loc_subregions?.wikiDataId
            + ') [' + rowData.loc_subregions?.id + ']'} </label>
}


exports.country = (rowData: any) => {
    return <label>
        {rowData.loc_countries?.name + ' - '
            + rowData.loc_countries?.iso3
            + ' [' + rowData.loc_countries?.id + ']'} </label>
}





exports.state = (rowData: any) => {
    return <label>
        {rowData.loc_states?.name + ' - '
            + rowData.loc_states?.iso2
            + ' [' + rowData.loc_states?.id + ']'} </label>
}

exports.city = (rowData: any) => {
    return <label>
        {rowData.loc_cities?.name + ' [' + rowData.loc_cities?.id + ']'} </label>
}


exports.company = (rowData: any) => {
    return <label>
        {rowData.companies?.company + '- ' + rowData.companies?.designation + ' [' + rowData.companies?.id + ']'} </label>
}


exports.driver = (rowData: any) => {
    return <label>
        {rowData.mach_drivers?.driver + '- ' + rowData.mach_drivers?.designation + ' [' + rowData.mach_drivers?.id + ']'} </label>
}

