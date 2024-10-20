/**
 * Analyse Data Model
 */

import { Model } from '../model'




export class AnalysesAllowedModel extends Model {


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
            point: 0,
            type: 0,
            designation: '',
            enable: false,

            tag: 0,
            description: '',


            companies: {},
            analyse_points: {},
            tags: {},
            analyse_types: {},
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
        this.map.set('point', 'numeric');
        this.map.set('type', 'numeric');
        this.map.set('designation', 'text');
        this.map.set('enable', 'boolean');

        this.map.set('tag', 'numeric');
        this.map.set('description', 'text');
    }

    get type() {
        return {
            id: Number,
            deleted: Boolean,
            created: Date,
            changed: Date,

            company: Number,
            point: Number,
            type: Number,
            designation: String,
            enable: Boolean,

            tag: Number,
            description: String,

        };
    }
}




