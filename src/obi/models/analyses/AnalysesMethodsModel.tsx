/**
 * Analyse Data Model
 */

import { Model } from '../model'




export class AnalysesMethodsModel extends Model {


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
            method: '',
            designation: '',
            description: '',
            filepath: '',


            businesses: {},
            companies: {},
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
        this.map.set('method', 'text');
        this.map.set('designation', 'text');
        this.map.set('description', 'text');
        this.map.set('filepath', 'text');
    }

    get type() {
        return {
            id: Number,
            deleted: Boolean,
            created: Date,
            changed: Date,

            business: Number,
            company: Number,
            method: String,
            designation: String,
            description: String,
            filepath: String,
        };
    }
}




