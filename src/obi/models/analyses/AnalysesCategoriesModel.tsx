/**
 * Analyse Data Model
 */

import { Model } from '../model'




export class AnalysesCategoriesModel extends Model {


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
            category: '',
            designation: '',
            description: '',


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
        this.map.set('category', 'text');
        this.map.set('designation', 'text');
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
            category: String,
            designation: String,
            description: String,
        };
    }
}




