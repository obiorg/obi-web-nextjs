/**
 * Analyse Data Model
 */

import { Model } from '../model'




export class PersistencesStandardsLimitsModel extends Model {


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
            tag: 0,
            pers_standard: 0,
            name: '',
            value: 0,
            comparator: 0,
            delay: 0,
            hysteresis: 0.0,
            group: 0,
            sort: 0,
            hit: false,
            reached: false,

            companies: {},
            meas_comparators: {},
            meas_limits_groups: {},
            pers_standard_pers_standard_limits_pers_standardTopers_standard: {},
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

        this.map.set('company', 'numeric');
        this.map.set('tag', 'numeric');
        this.map.set('pers_standard', 'numeric');
        this.map.set('name', 'text');
        this.map.set('value', 'numeric');
        this.map.set('comparator', 'numeric');
        this.map.set('delay', 'numeric');
        this.map.set('hysteresis', 'numeric');
        this.map.set('group', 'numeric');
        this.map.set('sort', 'numeric');
        this.map.set('hit', 'boolean');
        this.map.set('reached', 'boolean');
    }

    get type() {
        return {
            id: Number,
            deleted: Boolean,
            created: Date,
            changed: Date,
            
            company: Number,
            tag: Number,
            pers_standard: Number,
            name: String,
            value: Number,
            comparator: Number,
            delay: Number,
            hysteresis: Number,
            group: Number,
            sort: Number,
            hit: Boolean,
            reached: Boolean,
        };
    }
}




