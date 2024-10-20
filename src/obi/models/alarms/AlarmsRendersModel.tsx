/**
 * Analyse Data Model
 */

import { Model } from '../model'




export class AlarmsRendersModel extends Model {


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
            render: '',
            name: '',
            color: '',
            background: '',

            blink: false,

            colorBlink: '',
            backgroundBlink: '',
            comment: '',

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
        this.map.set('render', 'text');
        this.map.set('name', 'text');

        this.map.set('color', 'text');
        this.map.set('background', 'text');

        this.map.set('blink', 'boolean');
        
        this.map.set('colorBlink', 'text');
        this.map.set('backgroundBlink', 'text');
        this.map.set('comment', 'text');
        
    }

    get type() {
        return {
            id: Number,
            deleted: Boolean,
            created: Date,
            changed: Date,

            company: Number,
            render: String,
            name: String,

            color: String,
            background: String,

            blink: Boolean,
            
            colorBlink: String,
            backgroundBlink: String,
            comment: String,

        };
    }
}




