import { Calendar } from "primereact/calendar";
import { InputNumber } from "primereact/inputnumber";
import { Password } from "primereact/password";
import { TriStateCheckbox } from "primereact/tristatecheckbox";
import { classNames } from "primereact/utils";







exports.datetimeObj = (date: any) => {
    if (date === undefined || date === null || date === '' || date === 0) {
        return null;
    }

    var dateParts;
    if (date) {
        dateParts = date.split('-')
    }
    if(dateParts.length < 6)    return null;
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

exports.datetimeCreated = (rowData: any) => {
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

exports.datetimeChanged = (rowData: any) => {
    if (rowData === undefined) {
        return '';
    }

    var dateParts;
    if (rowData.changed) {
        dateParts = rowData.changed.split('-')
    } else {
        dateParts = rowData.changed_at.split('-')
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

exports.floatFilterTemplate = (options: any) => {
    // console.log(options)
    return <InputNumber value={options.value} onValueChange={(e) => { options.filterApplyCallback(e.value); }} />
}

exports.booleanFilterTemplate = (options: any) => {
    return <TriStateCheckbox value={options.value} onChange={(e) => { options.filterApplyCallback(e.value); }} />
}

exports.dateFilterTemplate = (options: any) => {
    return <Calendar value={options.value}
        onChange={(e: any) => { options.filterCallback(e.value, options.index); options.value = e.value; }}
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





/**
 * ALARMS
 */
exports.alarmsClasses = (rowData: any) => {
    return <label>
        {rowData.alarm_classes?.class + ' - '
            + rowData.alarm_classes?.name
            + ' (' + rowData.alarm_classes?.company + ')'
            + ' [' + rowData.alarm_classes?.id + ']'} </label>
}

exports.alarmsGroups = (rowData: any) => {
    return <label>
        {rowData.alarm_groups?.group + ' - '
            + rowData.alarm_groups?.comment
            + ' (' + rowData.alarm_groups?.company + ')'
            + ' [' + rowData.alarm_groups?.id + ']'} </label>
}

exports.alarms = (rowData: any) => {
    return <label>
        {rowData.alarms?.alarm + ' - '
            + rowData.alarms?.name
            + ' (' + rowData.alarms?.company + ')'
            + ' [' + rowData.alarms?.id + ']'} </label>
}


exports.alarmsRenders = (rowData: any) => {
    return <label>
        {rowData.alarm_renders?.render + ' - '
            + rowData.alarm_renders?.name
            + ' (' + rowData.alarm_renders?.company + ')'
            + ' [' + rowData.alarm_renders?.id + ']'} </label>
}




/**
 * ANALYSES
 */

exports.analysesAllowed = (rowData: any) => {
    return <label>
        {rowData.analyse_allowed?.point + '/'
            + rowData.analyse_allowed?.type + ' - '
            + rowData.analyse_allowed?.designation
            + ' (' + rowData.analyse_allowed?.company + ')'
            + ' [' + rowData.analyse_allowed?.id + ']'} </label>
}

exports.analysesCategorie = (rowData: any) => {
    return <label>
        {rowData.analyse_allowed?.point + '/'
            + rowData.analyse_allowed?.type + ' - '
            + rowData.analyse_allowed?.designation
            + ' (' + rowData.analyse_allowed?.company + ')'
            + ' [' + rowData.analyse_allowed?.id + ']'} </label>
}

exports.analysesMethod = (rowData: any) => {
    return <label>
        {rowData.analyse_allowed?.point + '/'
            + rowData.analyse_allowed?.type + ' - '
            + rowData.analyse_allowed?.designation
            + ' (' + rowData.analyse_allowed?.company + ')'
            + ' [' + rowData.analyse_allowed?.id + ']'} </label>
}

exports.analysesPoint = (rowData: any) => {
    return <label>
        {rowData.analyse_allowed?.point + '/'
            + rowData.analyse_allowed?.type + ' - '
            + rowData.analyse_allowed?.designation
            + ' (' + rowData.analyse_allowed?.company + ')'
            + ' [' + rowData.analyse_allowed?.id + ']'} </label>
}

exports.analysesType = (rowData: any) => {
    return <label>
        {rowData.analyse_types?.point + '/'
            + rowData.analyse_types?.type + ' - '
            + rowData.analyse_types?.designation
            + ' (' + rowData.analyse_types?.business + '/' + rowData.analyse_types?.company + ')'
            + ' [' + rowData.analyse_types?.id + ']'} </label>
}


/**
 * BUSINESSES
 */
exports.business = (rowData: any) => {
    return <label>
        {rowData.businesses?.business + ' - '
            + rowData.businesses?.designation
            + ' [' + rowData.businesses?.id + ']'} </label>
}


exports.company = (rowData: any) => {
    return <label>
        {rowData.companies?.company
            + '- ' + rowData.companies?.designation
            + ' [' + rowData.companies?.id + ']'} </label>
}

exports.entity = (rowData: any) => {
    return <label>
        {rowData.entities?.entity + ' - '
            + rowData.entities?.designation
            + ' [' + rowData.entities?.id + ']'} </label>
}



/**
 * CONNEXIONS
 */
exports.machine = (rowData: any) => {
    // console.log(rowData);
    return <label>
        {rowData.machines ? rowData.machines?.name + ' / '
            + rowData.machines?.address + ' - '
            + rowData.machines?.mask
            + ' (' + rowData.machines?.company + ')'
            + ' [' + rowData.machines?.description + ']'
            : ''} </label>

}


exports.machinesDriver = (rowData: any) => {
    return <label>
        {rowData.mach_drivers ? rowData.mach_drivers?.driver + ' - '
            + rowData.mach_drivers?.designation
            + ' [' + rowData.mach_drivers?.id + ']'
            : ''} </label>
}




/**
 * LOCALISATIONS
 */

exports.city = (rowData: any) => {
    return <label>
        {rowData.loc_cities?.name
            + ' - ' + rowData.loc_cities?.wikiDataId + ' ('
            + rowData.loc_cities?.state_code + '/' + rowData.loc_cities?.country_code
            + ') [' + rowData.loc_cities?.id + ']'} </label>
}

exports.country = (rowData: any) => {
    return <label>
        {rowData.loc_countries?.name + ' - ' + rowData.loc_countries?.iso3 + ' (' +
            rowData.loc_countries?.numeric_code + ') ' + ' -  [' +
            rowData.loc_countries?.id + ']'} </label>

}


exports.location = (rowData: any) => {
    return <label>
        {rowData.locations?.location + ' ('
            + rowData.locations?.designation
            + ') [' + rowData.locations?.id + ']'} </label>
}


exports.region = (rowData: any) => {
    return <label>
        {rowData.loc_regions?.name + ' ('
            + rowData.loc_regions?.wikiDataId
            + ') [' + rowData.loc_regions?.id + ']'} </label>
}


exports.state = (rowData: any) => {
    return <label>
        {rowData.loc_states?.name + ' - '
            + rowData.loc_states?.iso2 + ' ('
            + rowData.loc_states?.country_code + ')'
            + ' [' + rowData.loc_states?.id + ']'} </label>
}

exports.subregion = (rowData: any) => {
    return <label>
        {rowData.loc_subregions?.name + ' ('
            + rowData.loc_subregions?.wikiDataId
            + ') [' + rowData.loc_subregions?.id + ']'} </label>
}



/**
 * Maintenance
 */
exports.equipementsDataExternal = (rowData: any) => {
    return <label>
        {rowData.equipements_data_external?.equipement + '/'
            + rowData.equipements_data_external?.provider + ' - '
            + rowData.equipements_data_external?.equipements?.equipement + '/'
            + rowData.equipements_data_external?.equipements_external_providers?.provider
            + ' (' + rowData.equipements_data_external?.company + ')'
            + ' [' + rowData.equipements_data_external?.id + ']'} </label>
}

exports.equipementsExternalProvider = (rowData: any) => {
    return <label>
        {rowData.equipements_external_providers?.provider + ' - '
            + rowData.equipements_external_providers?.name
            + ' (' + rowData.equipements_external_providers?.company + ')'
            + ' [' + rowData.equipements_external_providers?.id + ']'} </label>
}

exports.equipement = (rowData: any) => {
    return <label>
        {rowData.equipements?.equipement + ' - '
            + rowData.equipements?.name
            + ' (' + rowData.equipements?.company + ')'
            + ' [' + rowData.equipements?.id + ']'} </label>
}



/**
 * Measures
 */
exports.measuresComparator = (rowData: any) => {
    return <label>
        {rowData.meas_comparators?.symbol + ' - '
            + rowData.meas_comparators?.name
            + ' [' + rowData.meas_comparators?.id + ']'} </label>
}


exports.measuresLimitsGroup = (rowData: any) => {
    return <label>
        {rowData.meas_limits_groups?.group + ' - '
            + rowData.meas_limits_groups?.designation
            + ' (' + rowData.meas_limits_groups?.business + '/' + rowData.meas_limits_groups?.company + ')'
            + ' [' + rowData.meas_limits_groups?.id + ']'} </label>
}


exports.measuresLimit = (rowData: any) => {
    return <label>
        {rowData.meas_limits?.name + ' - '
            + rowData.meas_limits?.tags?.name
            + ' (' + rowData.meas_limits?.business + '/' + rowData.meas_limits?.company + ')'
            + ' [' + rowData.meas_limits?.id + ']'} </label>
}


exports.measuresUnit = (rowData: any) => {
    return <label>
        {rowData.meas_units?.sizeName + ' - '
            + rowData.meas_units?.sizeSymbol + ' - '
            + rowData.meas_units?.unitName
            + ' (' + rowData.meas_units?.entity + ')'
            + ' [' + rowData.meas_units?.id + ']'} </label>
}


/**
 * Persistences
 */
exports.persistencesMethod = (rowData: any) => {
    return <label>
        {rowData.pers_method?.name + ' - '
            + rowData.pers_method?.comment
            + ' [' + rowData.pers_method?.id + ']'} </label>
}


exports.persistence = (rowData: any) => {
    return <label>
        {rowData.persistence?.tags?.name + ' - '
            + rowData.persistence?.pers_method?.name
            + ' (' + rowData.persistence?.company + ')'
            + ' [' + rowData.persistence?.id + ']'} </label>
}

exports.persistencesStandardsLimit = (rowData: any) => {
    return <label>
        {rowData.pers_standard_limits?.name + ' - '
            + rowData.pers_standard_limits?.tags?.name + '/'
            + rowData.pers_standard_limits?.value + '/'
            + ' (' + rowData.pers_standard_limits?.company + ')'
            + ' [' + rowData.pers_standard_limits?.id + ']'} </label>
}

exports.persistencesStandard = (rowData: any) => {
    return <label>
        {rowData.pers_standard?.tags?.name + ' - '
            + rowData.pers_standard?.vFloat + '/'
            + rowData.pers_standard?.vInt + '/'
            + rowData.pers_standard?.vBool + '/'
            + rowData.pers_standard?.vStr + '/'
            + ' (' + rowData.pers_standard?.company + ')'
            + ' [' + rowData.pers_standard?.id + ']'} </label>
}


/**
 * Tags
 */
exports.tagsListContent = (rowData: any) => {
    return <label>
        {rowData.tags_lists_content?.tags_lists?.list + ' - '
            + rowData.tags_lists_content?.content
            + ' [' + rowData.tags_lists_content?.id + ']'} </label>
}

exports.tagsList = (rowData: any) => {
    return <label>
        {rowData.tags_lists?.list ? rowData.tags_lists?.list + ' - '
            + rowData.tags_lists?.designation
            + ' (' + rowData.tags_lists?.type + '/' + rowData.tags_lists?.company
            + ') [' + rowData.tags_lists?.id + ']'
            : ''} </label>
}


exports.tagsListType = (rowData: any) => {
    return <label>
        {rowData.tags_lists_types?.designation + ' - '
            + rowData.tags_lists_types?.comment
            + ' [' + rowData.tags_lists_types?.id + ']'} </label>
}



exports.tagsMemory = (rowData: any) => {
    return <label>
        {rowData.tags_memories?.name + ' - '
            + rowData.tags_memories?.comment
            + ' [' + rowData.tags_memories?.id + ']'} </label>
}



exports.tag = (rowData: any) => {
    return <label>
        {rowData.tags?.name + ' - '
            + (rowData.tags?.comment ? rowData.tags?.comment : '')
            + ' [' + rowData.tags?.machine + '-]'
            + ' (' + rowData.tags?.company
            + ') [' + rowData.tags?.id + ']'} </label>
}


exports.tagsTable = (rowData: any) => {
    return <label>
        {rowData.tags_tables?.table + ' - '
            + rowData.tags_tables?.designation
            + ' [' + rowData.tags_tables?.id + ']'} </label>
}




exports.tagsType = (rowData: any) => {
    return <label>
        {rowData.tags_types?.type + ' - '
            + rowData.tags_types?.designation
            + ' [' + rowData.tags_types?.id + ']'} </label>
}



/**
 * Users
 */
exports.usersAccount = (rowData: any) => {
    return <label>
        {rowData.user_account?.firstName +
            rowData.user_account?.lastName +
            rowData.user_account?.middleName
            + ' [' + rowData.user_account?.id + ']'} </label>
}

exports.usersAccountRole = (rowData: any) => {
    return <label>
        {rowData.user_account_role?.user_account?.firstName +
            rowData.user_account_role?.user_account?.lastName +
            rowData.user_account_role?.user_account?.middleName +
            ' (' + rowData.user_account_roles?.user_account?.id + ')/' +
            rowData.user_account_role?.user_roles?.name +
            ' (' + rowData.user_account_role?.user_roles?.id + ')/' +
            + ' [' + rowData.user_account_role?.id + ']'} </label>
}

exports.usersEmailVerified = (rowData: any) => {
    return <label>
        {rowData.user_email_verified?.statusDescription +
            + ' [' + rowData.user_email_verified?.id + ']'} </label>
}

exports.usersExternalProvider = (rowData: any) => {
    return <label>
        {rowData.user_external_providers?.name + ' - '
            + rowData.user_external_providers?.wsEndPoint
            + ' [' + rowData.user_external_providers?.id + ']'} </label>
}

exports.usersHashingAlgorithm = (rowData: any) => {
    return <label>
        {rowData.user_hashing_algorithms?.algorithmName + ' - '
            + rowData.user_hashing_algorithms?.designation
            + ' [' + rowData.user_hashing_algorithms?.id + ']'} </label>
}


exports.usersLoginDataExternal = (rowData: any) => {
    return <label>
        {rowData.user_login_data_external?.user_external_providers?.name + ' - '
            + rowData.user_login_data_external?.tokenExternalProvider
            + ' [' + rowData.user_login_data_external?.id + ']'} </label>
}

exports.usersLoginData = (rowData: any) => {
    return <label>
        {rowData.user_login_data?.loginName + ' - '
            + rowData.user_login_data?.email + ' (' +
            + rowData.user_login_data?.user_email_verified?.statusDescription
            + ') [' + rowData.user_login_data?.id + ']'} </label>
}



exports.usersPermission = (rowData: any) => {
    return <label>
        {rowData.user_permissions?.name + ' - '
            + rowData.user_permissions?.designation
            + ' [' + rowData.user_permissions?.id + ']'} </label>
}

exports.usersRolePermission = (rowData: any) => {
    return <label>
        {rowData.user_role_permissions?.user_permissions?.name + ' - '
            + rowData.user_role_permissions?.user_roles?.name
            + ' [' + rowData.user_role_permissions?.id + ']'} </label>
}


exports.usersRole = (rowData: any) => {
    return <label>
        {rowData.user_roles?.name + ' - '
            + rowData.user_roles?.description
            + ' [' + rowData.user_roles?.id + ']'} </label>
}


