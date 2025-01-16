/**
 * Analyse Data Model
 */

import { Model } from '../model'




export class TagsListContentsModel extends Model {


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
            list: undefined,
            content: 0,
            value: '',
            default: false,
            width: 0.0,
            height: 0.0,
            comment: '',

            companies: {},
            tags_lists: {},
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
        this.map.set('list', 'numeric');
        this.map.set('content', 'numeric');
        this.map.set('value', 'text');
        this.map.set('default', 'boolean');
        this.map.set('width', 'numeric');
        this.map.set('height', 'numeric');
        this.map.set('comment', 'text');


    }

    get type() {
        return {
            id: Number,
            deleted: Boolean,
            created: Date,
            changed: Date,
            
            company: Number,
            list: Number,
            content: Number,
            value: String,
            default: Boolean,
            width: Number,
            height: Number,
            comment: String,

        };
    }
}




