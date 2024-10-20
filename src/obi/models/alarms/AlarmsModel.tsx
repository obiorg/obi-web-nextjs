/**
 * Analyse Data Model
 */

import { Model } from '../model'




export class AlarmsModel extends Model {


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
            alarm: '',
            name: '',

            group: 0,
            class: 0,
            language: 0,
            comment: '',
            
            alarm_classes: {},
            alarm_groups: {},
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
        this.map.set('alarm', 'text');
        this.map.set('name', 'text');

        this.map.set('group', 'numeric');
        this.map.set('class', 'numeric');
        this.map.set('language', 'numeric');
        this.map.set('comment', 'text');
    }

    get type() {
        return {
            id: Number,
            deleted: Boolean,
            created: Date,
            changed: Date,

            company: Number,
            alarm: String,
            name: String,

            group: Number,
            class: Number,
            language: Number,
            comment: String,
        };
    }
}




