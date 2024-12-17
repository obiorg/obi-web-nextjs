/**
 * Model
 * 
 * https://www.typescriptlang.org/docs/handbook/declaration-files/consumption.html
 * 
 */
import { InferGetStaticPropsType } from 'next';
import { DataTableSortMeta, DataTableOperatorFilterMetaData, DataTableFilterMetaData } from 'primereact/datatable';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
// import * as _ from 'lodash';
// import * as _ from 'lodash';
import { Calendar } from 'primereact/calendar';
import { TriStateCheckbox } from 'primereact/tristatecheckbox';
import { InputNumber } from 'primereact/inputnumber';


export class Model {

  map = {} as Map<string, string>;
  // defaults = {} as any;

  constructor(attributes = {}) {
    // _.defaultsDeep(this, attributes, this.defaults);
  }




  toMultiSortMeta(): any {
    const obj = Object.keys(this);

    let sortMeta: Array<DataTableSortMeta> = [];
    for (let i = 0; i < obj.length; i++) {
      const key: DataTableSortMeta = {
        field: obj[i] as string,
        order: undefined
      }
      sortMeta[i] = key;
    }
    return sortMeta;
  }




  /**
   * 
   * @returns filter object for specify object
   */
  toDefaultFilters(): any {
    // const obj = Object.keys(this);
    let filters = {} as any;
    // Default global fillter
    filters['global'] = { value: null, matchMode: FilterMatchMode.CONTAINS };


    this.map.forEach((value, key) => {

      let operatorValue = FilterOperator.AND;
      let matchModeValue = FilterMatchMode.CONTAINS;

      // console.log('key ', key, 'value', value)
      if (key !== undefined && key !== 'pk') {
        // Manage type value
        switch (this.map.get(key)) { 
          case 'numeric':
            filters[key] = {
              operator: FilterOperator.AND,
              constraints: [{
                value: null,
                matchMode: FilterMatchMode.EQUALS,
                type: 'numeric'
              }]
            };
            // console.log("key: " + key + " is a numeric value")
            break;

          case 'text':
            filters[key] = {
              operator: FilterOperator.AND,
              constraints: [{
                value: null,
                matchMode: FilterMatchMode.CONTAINS,
                type: 'text'
              }]
            };
            break;

          case 'datetime':
            filters[key] = {
              operator: FilterOperator.AND,
              constraints: [{
                value: null,
                matchMode: FilterMatchMode.DATE_IS,
                type: 'datetime'
              }]
            };
            // console.log("key: " + key + " is a datetime value")
            break;

          case 'date':
            filters[key] = {
              operator: FilterOperator.AND,
              constraints: [{
                value: null,
                matchMode: FilterMatchMode.DATE_IS,
                type: 'date'
              }]
            };
            // console.log("key: " + key + " is a date value")
            break;

          case 'boolean':
            filters[key] = {
              value: null,
              matchMode: FilterMatchMode.EQUALS,
              type: 'boolean'
            };
            // console.log("key: " + key + " is a date value")
            break;

          default:
            console.log('model >> toDefaultFilters >> type variable "' + value + '" for key: "' + key + '"  is not defined and defined has text !!');
            // nothing to do like operator and match mode eixsting
            break;
        }
      } else {

      }
    });
    return filters;
  }



  getStandardParam(sorted: any, filtered: any, page?: any): any {
    let pg = page;
    if (pg === undefined || pg === null) pg = 0;


    let sort = sorted;
    if (sorted === undefined || sorted === null)
      sort = { field: 'id', order: -1 }

    let filter = (filtered === undefined) ? '{}' : filtered;
    return {
      first: 0,
      rows: 10,
      page: pg,
      pageCount: 0,
      pk: 'id',
      dataKey: 'id', // Create for datakey purpose
      selectionMode: 'multiple',
      sortMode: 'multiple' as string,
      sortField: '',
      sortOrder: -1,
      filters: filter,


      //multiSortMeta: defaultMultiSortMeta,
      multiSortMeta: Array.isArray(sort) ? sort : [
        sort
      ],

    }
  }


}


