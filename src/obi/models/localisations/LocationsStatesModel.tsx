/**
 * Analyse Data Model
 */

import { Model } from '../model';




export class LocationsStatesModel extends Model {


    constructor(attributes = {}) {
        super(attributes);
        this.init();
    }

    get defaults() {
        return {
            id: 0,
            name: '',
            country_id: 0,
            country_code: '',
            fips_code: '',
            iso2: '',
            type: '',
            latitude: 0.0,
            longitude: 0.0,
            created_at: 0,
            updated_at: 0,
            flag: false,
            wikiDataId: '',

            loc_countries: {},
        };
    }

    init() {
        this.map = new Map();
        this.map.set('pk', 'id');
        this.map.set('id', 'numeric');
        this.map.set('name', 'text');
        this.map.set('country_id', 'numeric');
        this.map.set('country_code', 'text');
        this.map.set('fips_code', 'text');
        this.map.set('iso2', 'text');
        this.map.set('type', 'text');
        this.map.set('latitude', 'numeric');
        this.map.set('longitude', 'numeric');
        this.map.set('created_at', 'datetime');
        this.map.set('updated_at', 'datetime');
        this.map.set('flag', 'boolean');
        this.map.set('wikiDataId', 'text');
    }

    get type() {
        return {            
            id: Number,
            name: String,
            country_id: Number,
            country_code: String,
            fips_code: String,
            iso2: String,
            type: String,
            latitude: Number,
            longitude: Number,
            created_at: Date,
            updated_at: Date,
            flag: Boolean,
            wikiDataId: String,
        };
    }
}




