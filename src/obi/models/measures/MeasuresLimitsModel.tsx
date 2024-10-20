/**
 * Analyse Data Model
 */

import { Model } from '../model'




export class MeasuresLimitsModel extends Model {


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
            tag: 0,
            name: '',
            value: 0.0,
            comparator: 0,
            delay: 0,
            hysteresis: 0.0,

            target: false,
            enable: false,

            group: 0,
            sort: 0,

            description: '',


            businesses: {},
            companies: {},
            meas_comparators: {},
            meas_limits_groups: {},
            tags: {},
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
        this.map.set('tag', 'numeric');
        this.map.set('name', 'text');
        this.map.set('value', 'numeric');
        this.map.set('comparator', 'numeric');
        this.map.set('delay', 'numeric');
        this.map.set('hysteresis', 'numeric');

        this.map.set('target', 'boolean');
        this.map.set('enable', 'boolean');
        this.map.set('group', 'numeric');
        this.map.set('sort', 'numeric');
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
            tag: Number,
            name: String,
            value: Number,
            comparator: Number,
            delay: Number,
            hysteresis: Number,
            target: Boolean,
            enable: Boolean,
            group: Number,
            sort: Number,
            description: String,

        };
    }
}




