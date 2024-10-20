/**
 * Analyse Data Model
 */

import { Model } from '../model'




export class TagsListModel extends Model {


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

            
            company: 0,
            type: 0,
            list: '',
            designation: '',
            comment: '',

            companies: {},
            tags_lists_types: {},
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
        this.map.set('type', 'numeric');
        this.map.set('list', 'text');
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
            type: Number,
            list: String,
            designation: String,
            comment: String,
        };
    }
}



