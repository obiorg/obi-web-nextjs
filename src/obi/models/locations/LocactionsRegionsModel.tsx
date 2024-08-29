/**
 * Analyse Data Model
 */

import { Model } from '../model'




export class LocationsRegionsModel extends Model {


    constructor(attributes = {}) {
        super(attributes);
        this.init();
    }

    get defaults() {
        return {
            id: 0,
            name: '',
            translations: '',
            created_at: 0,
            updated_at: 0,
            flag: false,
            wikiDataId: '',
        };
    }

    init() {
        this.map = new Map();
        this.map.set('pk', 'id');        
        this.map.set('id', 'numeric');

        this.map.set('name', 'text');
        this.map.set('translations', 'text');
        this.map.set('created_at', 'datetime');
        this.map.set('updated_at', 'datetime');
        this.map.set('flag', 'numeric');
        this.map.set('wikiDataId', 'text');
    }

    get type() {
        return {            
            id: Number,
            name: String,
            translations: String,
            created_at: Date,
            updated_at: Date,
            flag: Boolean,
            wikiDataId: String,
        };
    }
}




