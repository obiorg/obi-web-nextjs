/**
 * Analyse Data Model
 */

import { Model } from '../model'




export class EntitiesModel extends Model {


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

            entity: '',
            designation: '',
            builded: 0,
            main: false,
            activated: false,
            logoPath: '',
            location: 0,
            locations: {},
        };
    }

    init() {
        this.map = new Map();
        this.map.set('pk', 'id');
        this.map.set('id', 'numeric');
        this.map.set('deleted', 'boolean');
        this.map.set('created', 'datetime');
        this.map.set('changed', 'datetime');

        this.map.set('entity', 'text');
        this.map.set('designation', 'text');
        this.map.set('builded', 'numeric');
        this.map.set('main', 'boolean');
        this.map.set('activated', 'boolean');
        this.map.set('logoPath', 'text');
        this.map.set('location', 'numeric');
    }

    get type() {
        return {
            id: Number,
            deleted: Boolean,
            created: Date,
            changed: Date,

            entity: String,
            designation: String,
            builded: Number,
            main: Boolean,
            activated: Boolean,
            logoPath: String,
            location: Number,
        };
    }
}




