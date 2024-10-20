/**
 * Analyse Data Model
 */

import { Model } from '../model'




export class BusinessesModel extends Model {


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
            business: '',
            designation: '',
            builded: 0,
            main: false,
            activated: false,
            logoPath: '',
            location: 0,
            entity: '',

            locations: {},
            entities: {},
        };
    }

    init() {
        this.map = new Map();
        this.map.set('pk', 'id');
        this.map.set('id', 'numeric');
        this.map.set('deleted', 'numeric');
        this.map.set('created', 'datetime');
        this.map.set('changed', 'datetime');

        this.map.set('business', 'text');
        this.map.set('designation', 'text');
        this.map.set('builded', 'numeric');
        this.map.set('main', 'boolean');
        this.map.set('activated', 'boolean');
        this.map.set('logoPath', 'text');
        this.map.set('location', 'numeric');
        this.map.set('entity', 'text');
    }

    get type() {
        return {
            id: Number,
            deleted: Boolean,
            created: Date,
            changed: Date,

            business: String,
            designation: String,
            builded: Number,
            main: Boolean,
            activated: Boolean,
            logoPath: String,
            location: Number,
            entity: String,
        };
    }
}




