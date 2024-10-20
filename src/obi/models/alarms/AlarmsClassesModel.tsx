/**
 * Analyse Data Model
 */

import { Model } from '../model'




export class AlarmsClassesModel extends Model {


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
            class: '',
            name: '',
            render: 0,
            comment: '',

            alarm_render: {},
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
        this.map.set('class', 'text');
        this.map.set('name', 'text');
        this.map.set('render', 'numeric');

        this.map.set('comment', 'text');

    }

    get type() {
        return {
            id: Number,
            deleted: Boolean,
            created: Date,
            changed: Date,

            company: Number,
            class: String,
            name: String,

            render: Number,

            comment: String,
        };
    }
}




