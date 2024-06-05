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


export class Model {

  map = {} as Map<string, string>;

  constructor(attributes = {}) {
    //_.defaultsDeep(this, attributes, this.defaults);
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

    // add specific filters
    // console.log('maps', this.map)
    // console.log('map size', this.map.size)

    // const keys = this.map.keys();
    // console.log('keys', keys)


    this.map.forEach((value, key) => {

      let operatorValue = FilterOperator.AND;
      let matchModeValue = FilterMatchMode.CONTAINS;

      // console.log('key ', key, 'value', value)
      if (key !== undefined && key !== 'pk') {
        // Manage type value
        switch (this.map.get(key)) {
          case 'numeric':
            operatorValue = FilterOperator.AND;
            matchModeValue = FilterMatchMode.EQUALS;
            // console.log("key: " + key + " is a numeric value")
            break;

          case 'text':
            // Nothing to do like operator and match mode existing
            // console.log("key: " + key + " is a text value")
            break;

          case 'datetime':
            operatorValue = FilterOperator.AND;
            matchModeValue = FilterMatchMode.DATE_IS;
            // console.log("key: " + key + " is a datetime value")
            break;

          case 'date':
            operatorValue = FilterOperator.AND;
            matchModeValue = FilterMatchMode.DATE_IS;
            // console.log("key: " + key + " is a date value")
            break;

          default:
            console.log('model >> toDefaultFilters >> type variable "' + value + '" for key: "' + key + '"  is not defined and defined has text !!');
            // nothing to do like operator and match mode eixsting
            break;
        }

        // Create the filter
        filters[key] = {
          operator: operatorValue,
          constraints: [{
            value: null,
            matchMode: matchModeValue
          }]
        };
      } else {

      }
    });


    // for (let i = 0; i < this.map.size; i++) {



    //   // if (this.map.get(key) !== undefined && key !== 'pk') {
    //   //   // Manage type value
    //   //   switch (this.map.get(key)) {
    //   //     case 'numeric':
    //   //       operatorValue = FilterOperator.AND;
    //   //       matchModeValue = FilterMatchMode.EQUALS;
    //   //       break;
    //   //     case 'text':
    //   //       // Nothing to do like operator and match mode existing
    //   //       break;
    //   //     case 'datetime':
    //   //       operatorValue = FilterOperator.AND;
    //   //       matchModeValue = FilterMatchMode.DATE_IS;
    //   //       break;
    //   //     case 'date':
    //   //       operatorValue = FilterOperator.AND;
    //   //       matchModeValue = FilterMatchMode.DATE_IS;
    //   //       break;

    //   //     default:
    //   //       console.log('model >> toDefaultFilters >> type variable "' + this.map.get(key) + '" is not defined and defined has text !!');
    //   //       // nothing to do like operator and match mode eixsting
    //   //       break;
    //   //   }

    //   //   // Create the filter
    //   //   filters[key] = {
    //   //     operator: operatorValue,
    //   //     constraints: [{
    //   //       value: null,
    //   //       matchMode: matchModeValue
    //   //     }]
    //   //   };
    //   // } else {
    //   //   console.log('model >> toDefaultFilters >> you cannot use key pk or undefined key : ' + key);
    //   // }


    // }
    return filters;
  }

}


