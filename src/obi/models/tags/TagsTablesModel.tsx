/**
 * Analyse Data Model
 */

import { Model } from '../model'




export class TagsTablesModel extends Model {


    constructor(attributes = {}) {
        super(attributes);
        this.init();
    }

    get defaults() {
        return {
            id: undefined,
            deleted: false,
            created: 0,
            changed: 0,

            company: undefined,
            table: undefined,
            designation: undefined,
            comment: undefined,
            
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
        
        this.map.set('company', 'numeric');
        this.map.set('table', 'text');
        this.map.set('designation', 'text');
        this.map.set('comment', 'text');

    }

    get type() {
        return {
            id: Number,
            deleted: Boolean,
            created: Date,
            changed: Date,
            
            company: Number,
            table: String,
            designation: String,
            comment: String,
        };
    }

    
}




