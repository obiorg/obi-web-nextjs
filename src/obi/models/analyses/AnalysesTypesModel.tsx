/**
 * Analyse Data Model
 */

import { Model } from '../model'




export class AnalysesTypesModel extends Model {


    constructor(attributes = {}) {
        super(attributes);
        this.init();
    }

    get defaults() {
        return {
            id: 0,
            deleted: 0,
            created: 0,
            changed: 0,


            business: 0,
            company: 0,
            type: '',
            designation: '',

            unit: 0,
            method: 0,
            category: 0,
            description: '',


            businesses: {},
            companies: {},
            analyse_categories: {},
            analyse_methods: {},
            meas_units: {},
        };
    }




    init() {
        this.map = new Map();
        this.map.set('pk', 'id');
        this.map.set('id', 'numeric');
        this.map.set('deleted', 'boolean');
        this.map.set('created', 'datetime');
        this.map.set('changed', 'datetime');


        this.map.set('business', 'numeric');
        this.map.set('company', 'numeric');
        this.map.set('type', 'text');
        this.map.set('designation', 'text');

        this.map.set('unit', 'numeric');
        this.map.set('method', 'numeric');
        this.map.set('category', 'numeric');
        this.map.set('description', 'text');
    }

    get type() {
        return {
            id: Number,
            deleted: Boolean,
            created: Date,
            changed: Date,

            business: Number,
            company: Number,
            type: String,
            designation: String,

            unit: Number,
            method: Number,
            category: Number,
            description: String,
        };
    }
}




