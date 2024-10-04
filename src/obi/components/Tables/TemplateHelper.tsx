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
    var dateParts = rowData.created.split('-')
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

