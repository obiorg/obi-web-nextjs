/**
 * Analyse Data Model
 */

import { Model } from '../model'




export class LocationsSubRegionsModel extends Model {


    constructor(attributes = {}) {
        super(attributes);
        this.init();
    }

    get defaults() {
        return {
            id: 0,
            name: '',
            translations: '',
            
            region_id: 0,
            created_at: 0,
            updated_at: 0,
            flag: false,
            wikiDataId: '',

            loc_regions: {},
        };
    }

    init() {
        this.map = new Map();
        this.map.set('pk', 'id');
        this.map.set('id', 'numeric');

        this.map.set('name', 'text');
        this.map.set('translations', 'text');
        this.map.set('region_id', 'numeric');

        this.map.set('created_at', 'datetime');
        this.map.set('updated_at', 'datetime');
        this.map.set('flag', 'boolean');
        this.map.set('wikiDataId', 'text');

    }

    get type() {
        return {
            id: Number,
            name: String,
            translations: String,
            region_id: Number,
            created_at: Date,
            updated_at: Date,
            flag: Boolean,
            wikiDataId: String,
        };
    }
}




