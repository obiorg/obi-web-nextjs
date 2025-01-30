/**
 * Analyse Data Model
 */

import { Model } from './../model'




export class PersistencesModel extends Model {


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
            tag: undefined,
            method: undefined,
            activate: false,
            comment: undefined,


            companies: {},
            pers_method: {},
            tags: {},
        };
    }

    init() {
        this.map = new Map();
        this.map.set('pk', 'id');
        this.map.set('id', 'numeric');
        this.map.set('deleted', 'numeric');
        this.map.set('created', 'datetime');
        this.map.set('changed', 'datetime');

        this.map.set('company', 'numeric');
        this.map.set('tag', 'numeric');
        this.map.set('method', 'numeric');
        this.map.set('activate', 'numeric');
        this.map.set('comment', 'text');
    }

    get type() {
        return {
            id: Number,
            deleted: Boolean,
            created: Date,
            changed: Date,

            company: Number,
            tag: Number,
            method: Number,
            activate: Boolean,
            comment: String,

        };
    }

}




