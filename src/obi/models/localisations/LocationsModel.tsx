/**
 * Analyse Data Model
 */

import { Model } from '../model'




export class LocationsModel extends Model {


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

            location: '',
            designation: '',
            group: '',
            country: 0,
            state: 0,
            city: 0,
            address: '',
            address1: '',
            address3: '',
            bloc: '',
            floor: 0,
            number: '',

            loc_cities: {},
            loc_countries: {},
            loc_states: {},
        };
    }




    init() {
        this.map = new Map();
        this.map.set('pk', 'id');
        this.map.set('id', 'numeric');
        this.map.set('deleted', 'boolean');
        this.map.set('created', 'datetime');
        this.map.set('changed', 'datetime');

        this.map.set('location', 'text');
        this.map.set('designation', 'text');
        this.map.set('group', 'text');
        this.map.set('country', 'numeric');
        this.map.set('state', 'numeric');
        this.map.set('city', 'numeric');
        this.map.set('address', 'text');
        this.map.set('address1', 'text');
        this.map.set('address3', 'text');
        this.map.set('bloc', 'text');
        this.map.set('floor', 'numeric');
    }

    get type() {
        return {
            id: Number,
            deleted: Boolean,
            created: Date,
            changed: Date,

            location: String,
            designation: String,
            group: String,
            country: Number,
            state: Number,
            city: Number,
            address: String,
            address1: String,
            address3: String,
            bloc: String,
            floor: Number,
            number: String,
        };
    }
}




