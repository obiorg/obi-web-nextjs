import AlarmsClassesDropDown from "./alarms/classes/components/AlarmsClassesDropDown";
import AlarmsDropDown from "./alarms/components/AlarmsDropDown";
import AlarmsGroupsDropDown from "./alarms/groups/components/AlarmsGroupsDropDown";
import AlarmsRendersDropDown from "./alarms/renders/components/AlarmsRendersDropDown";
import AnalysesAllowedDropDown from "./analyses/allowed/components/AnalysesAllowedDropDown";
import AnalysesCategoriesDropDown from "./analyses/categories/components/AnalysesCategoriesDropDown";
import AnalysesMethodsDropDown from "./analyses/methods/components/AnalysesMethodsDropDown";
import AnalysesPointsDropDown from "./analyses/points/components/AnalysesPointsDropDown";
import AnalysesTypesDropDown from "./analyses/types/components/AnalysesTypesDropDown";
import BusinessesDropDown from "./businesses/businesses/components/BusinessesDropDown";
import CompaniesDropDown from "./businesses/companies/components/CompaniesDropDown";
import EntitiesDropDown from "./businesses/entities/components/EntitiesDropDown";
import MachinesDriversDropDown from "./connexions/drivers/components/MachinesDriversDropDown";
import MachinesDropDown from "./connexions/machines/components/MachinesDropDown";
import CitiesDropDown from "./localisations/cities/components/CitiesDropDown";
import CountriesDropDown from "./localisations/countries/components/CountriesDropDown";
import LocationsDropDown from "./localisations/locations/components/LocationsDropDown";
import RegionsDropDown from "./localisations/regions/components/RegionsDropDown";
import StatesDropDown from "./localisations/states/components/StatesDropDown";
import SubRegionsDropDown from "./localisations/subregions/components/SubRegionsDropDown";
import EquipementsDropDown from "./maintenance/equipements/components/EquipementsDropDown";
import EquipementsDataExternalDropDown from "./maintenance/equipements/dataexternal/components/EquipementsDataExternalDropDown";
import EquipementsExternalProvidersDropDown from "./maintenance/equipements/externalproviders/components/EquipementsExternalProvidersDropDown";
import MeasuresComparatorsDropDown from "./measures/comparators/components/MeasuresComparatorsDropDown";
import MeasuresLimitsDropDown from "./measures/limits/components/MeasuresLimitsDropDown";
import MeasuresLimitsGroupsDropDown from "./measures/limitsgroups/components/MeasuresLimitsGroupsDropDown";
import MeasuresUnitsDropDown from "./measures/units/components/MeasuresUnitsDropDown";
import PersistencesDropDown from "./persistences/components/PersistencesDropDown";
import PersistencesMethodsDropDown from "./persistences/methods/components/PersistencesMethodsDropDown";
import PersistencesStandardsDropDown from "./persistences/standards/components/PersistencesStandardsDropDown";
import PersistencesStandardsLimitsDropDown from "./persistences/standardslimits/components/PersistencesStandardsLimitsDropDown";
import TagsDropDown from "./tags/components/TagsDropDown";
import TagsListsDropDown from "./tags/list/components/TagsListsDropDown";
import TagsListContentsDropDown from "./tags/listcontents/components/TagsListContentsDropDown";
import TagsListTypesDropDown from "./tags/listtypes/components/TagsListTypesDropDown";
import TagsMemoriesDropDown from "./tags/memories/components/TagsMemoriesDropDown";
import TagsTablesDropDown from "./tags/tables/components/TagsTablesDropDown";
import TagsTypesDropDown from "./tags/types/components/TagsTypesDropDown";



/**
 * ALARMS
 */
exports.alarmsClasses_lazyFilter = (options: any) => {
    return <AlarmsClassesDropDown
        value={options.value}
        onChanged={(e: any) => {
            options.filterCallback(e.value);
        }}
    />;
}

exports.alarms_lazyFilter = (options: any) => {
    return <AlarmsDropDown
        value={options.value}
        onChanged={(e: any) => {
            options.filterCallback(e.value);
        }}
    />;
}

exports.alarmsGroups_lazyFilter = (options: any) => {
    return <AlarmsGroupsDropDown
        value={options.value}
        onChanged={(e: any) => {
            options.filterCallback(e.value);
        }}
    />;
}

exports.alarmsRenders_lazyFilter = (options: any) => {
    return <AlarmsRendersDropDown
        value={options.value}
        onChanged={(e: any) => {
            options.filterCallback(e.value);
        }}
    />;
}




/**
 * ANALYSES
 */
exports.analysesAllowed_lazyFilter = (options: any) => {
    return <AnalysesAllowedDropDown
        value={options.value}
        onChanged={(e: any) => {
            options.filterCallback(e.value);
        }}
    />;
}

exports.analysesCategories_lazyFilter = (options: any) => {
    return <AnalysesCategoriesDropDown
        value={options.value}
        onChanged={(e: any) => {
            options.filterCallback(e.value);
        }}
    />;
}

exports.analysesMethods_lazyFilter = (options: any) => {
    return <AnalysesMethodsDropDown
        value={options.value}
        onChanged={(e: any) => {
            options.filterCallback(e.value);
        }}
    />;
}

exports.analysesPoints_lazyFilter = (options: any) => {
    return <AnalysesPointsDropDown
        value={options.value}
        onChanged={(e: any) => {
            options.filterCallback(e.value);
        }}
    />;
}

exports.analysesTypes_lazyFilter = (options: any) => {
    return <AnalysesTypesDropDown
        value={options.value}
        onChanged={(e: any) => {
            options.filterCallback(e.value);
        }}
    />;
}


/**
 * BUSINESSES
 */
exports.business_lazyFilter = (options: any) => {
    return <BusinessesDropDown
        value={options.value}
        onChanged={(e: any) => {
            options.filterCallback(e.value);
        }}
    />;
}


exports.company_lazyFilter = (options: any) => {
    return <CompaniesDropDown
        value={options.value}
        onChanged={(e: any) => {
            options.filterCallback(e.value);
        }}
    />;
}

exports.entity_lazyFilter = (options: any) => {
    return <EntitiesDropDown
        value={options.value}
        onChanged={(e: any) => {
            options.filterCallback(e.value);
        }}
    />;
}


/**
 * CONNEXIONS
 */
exports.machines_lazyFilter = (options: any) => {
    return <MachinesDropDown
        value={options.value}
        onChanged={(e: any) => {
            options.filterCallback(e.value);
        }}
    />;
}
exports.machinesDrivers_lazyFilter = (options: any) => {
    return <MachinesDriversDropDown
        value={options.value}
        onChanged={(e: any) => {
            options.filterCallback(e.value);
        }}
    />;
}



/**
 * LOCALISATIONS
 */

exports.cities_lazyFilter = (options: any) => {
    return <CitiesDropDown
        value={options.value}
        onChanged={(e: any) => {
            options.filterCallback(e.value);
        }}
    />;
}

exports.countries_lazyFilter = (options: any) => {
    return <CountriesDropDown
        value={options.value}
        onChanged={(e: any) => {
            options.filterCallback(e.value);
        }}
    />;
}


exports.locations_lazyFilter = (options: any) => {
    return <LocationsDropDown
        value={options.value}
        onChanged={(e: any) => {
            options.filterCallback(e.value);
        }}
    />;
}


exports.regions_lazyFilter = (options: any) => {
    return <RegionsDropDown
        value={options.value}
        onChanged={(e: any) => {
            options.filterCallback(e.value);
        }}
    />;
}


exports.states_lazyFilter = (options: any) => {
    return <StatesDropDown
        value={options.value}
        onChanged={(e: any) => {
            options.filterCallback(e.value);
        }}
    />;
}

exports.subregions_lazyFilter = (options: any) => {
    return <SubRegionsDropDown
        value={options.value}
        onChanged={(e: any) => {
            options.filterCallback(e.value);
        }}
    />;
}


/**
 * MAINTENANCE
 */

exports.equipementsDataExternal_lazyFilter = (options: any) => {
    return <EquipementsDataExternalDropDown
        value={options.value}
        onChanged={(e: any) => {
            options.filterCallback(e.value);
        }}
    />;
}

exports.equipementsExternalProviders_lazyFilter = (options: any) => {
    return <EquipementsExternalProvidersDropDown
        value={options.value}
        onChanged={(e: any) => {
            options.filterCallback(e.value);
        }}
    />;
}



exports.equipements_lazyFilter = (options: any) => {
    return <EquipementsDropDown
        value={options.value}
        onChanged={(e: any) => {
            options.filterCallback(e.value);
        }}
    />;
}


/**
 * MEASURES
 */
exports.measuresComparators_lazyFilter = (options: any) => {
    return <MeasuresComparatorsDropDown
        value={options.value}
        onChanged={(e: any) => {
            options.filterCallback(e.value);
        }}
    />;
}

exports.measuresLimitsGroups_lazyFilter = (options: any) => {
    return <MeasuresLimitsGroupsDropDown
        value={options.value}
        onChanged={(e: any) => {
            options.filterCallback(e.value);
        }}
    />;
}


exports.measuresLimits_lazyFilter = (options: any) => {
    return <MeasuresLimitsDropDown
        value={options.value}
        onChanged={(e: any) => {
            options.filterCallback(e.value);
        }}
    />;
}


exports.measuresUnits_lazyFilter = (options: any) => {
    return <MeasuresUnitsDropDown
        value={options.value}
        onChanged={(e: any) => {
            options.filterCallback(e.value);
        }}
    />;
}




/**
 * PERSISTENCE
 */
exports.persistencesMethods_lazyFilter = (options: any) => {
    return <PersistencesMethodsDropDown
        value={options.value}
        onChanged={(e: any) => {
            options.filterCallback(e.value);
        }}
    />;
}

exports.persistences_lazyFilter = (options: any) => {
    return <PersistencesDropDown
        value={options.value}
        onChanged={(e: any) => {
            options.filterCallback(e.value);
        }}
    />;
}


exports.persistencesStandardsLimits_lazyFilter = (options: any) => {
    return <PersistencesStandardsLimitsDropDown
        value={options.value}
        onChanged={(e: any) => {
            options.filterCallback(e.value);
        }}
    />;
}


exports.persistencesStandards_lazyFilter = (options: any) => {
    return <PersistencesStandardsDropDown
        value={options.value}
        onChanged={(e: any) => {
            options.filterCallback(e.value);
        }}
    />;
}




/**
 * TAGS
 */
exports.tagsListContents_lazyFilter = (options: any) => {
    return <TagsListContentsDropDown
        value={options.value}
        onChanged={(e: any) => {
            options.filterCallback(e.value);
        }}
    />;
}

exports.tagsLists_lazyFilter = (options: any) => {
    return <TagsListsDropDown
        value={options.value}
        onChange={(e: any) => {
            options.filterCallback(e.value);
        }}
    />;
}


exports.tagsListTypes_lazyFilter = (options: any) => {
    return <TagsListTypesDropDown
        value={options.value}
        onChanged={(e: any) => {
            options.filterCallback(e.value);
        }}
    />;
}


exports.tagsMemories_lazyFilter = (options: any) => {
    return <TagsMemoriesDropDown
        value={options.value}
        onChange={(e: any) => {
            options.filterCallback(e.value);
        }}
    />;
}


exports.tags_lazyFilter = (options: any) => {
    return <TagsDropDown
        value={options.value}
        onChange={(e: any) => {
            options.filterCallback(e.value);
        }}
    />;
}

exports.tagsTables_lazyFilter = (options: any) => {
    return <TagsTablesDropDown
        value={options.value}
        onChange={(e: any) => {
            options.filterCallback(e.value);
        }}
    />;
}

exports.tagsTypes_lazyFilter = (options: any) => {
    return <TagsTypesDropDown
        value={options.value}
        onChange={(e: any) => {
            options.filterCallback(e.value);
        }}
    />;
}




/**
 * USERS
 */
exports.usersAccounts_lazyFilter = (options: any) => {
    return <TagsListContentsDropDown
        value={options.value}
        onChanged={(e: any) => {
            options.filterCallback(e.value);
        }}
    />;
}

exports.usersAccountRoles_lazyFilter = (options: any) => {
    return <TagsListsDropDown
        value={options.value}
        onChanged={(e: any) => {
            options.filterCallback(e.value);
        }}
    />;
}


exports.usersEmailVerified_lazyFilter = (options: any) => {
    return <TagsListTypesDropDown
        value={options.value}
        onChanged={(e: any) => {
            options.filterCallback(e.value);
        }}
    />;
}


exports.usersExternalProviders_lazyFilter = (options: any) => {
    return <TagsMemoriesDropDown
        value={options.value}
        onChanged={(e: any) => {
            options.filterCallback(e.value);
        }}
    />;
}


exports.usersHashingAlgorithms_lazyFilter = (options: any) => {
    return <TagsDropDown
        value={options.value}
        onChanged={(e: any) => {
            options.filterCallback(e.value);
        }}
    />;
}

exports.usersLoginDataExternal_lazyFilter = (options: any) => {
    return <TagsTablesDropDown
        value={options.value}
        onChanged={(e: any) => {
            options.filterCallback(e.value);
        }}
    />;
}

exports.usersLoginData_lazyFilter = (options: any) => {
    return <TagsTypesDropDown
        value={options.value}
        onChanged={(e: any) => {
            options.filterCallback(e.value);
        }}
    />;
}

exports.usersPermissions_lazyFilter = (options: any) => {
    return <TagsTypesDropDown
        value={options.value}
        onChanged={(e: any) => {
            options.filterCallback(e.value);
        }}
    />;
}

exports.usersRolePermissions_lazyFilter = (options: any) => {
    return <TagsTypesDropDown
        value={options.value}
        onChanged={(e: any) => {
            options.filterCallback(e.value);
        }}
    />;
}

exports.usersRoles_lazyFilter = (options: any) => {
    return <TagsTypesDropDown
        value={options.value}
        onChanged={(e: any) => {
            options.filterCallback(e.value);
        }}
    />;
}













