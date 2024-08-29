/**
 * Analyse Data Model
 */

import { Model } from '../model'




export class LocationsCountriesModel extends Model {


    constructor(attributes = {}) {
        super(attributes);
        this.init();
    }

    get defaults() {
        return {
            id: 0,
            name: '',
            iso3: '',
            numeric_code: '',
            iso2: '',
            phonecode: '',
            capital: '',
            currency: '',
            currency_name: '',
            currency_symbol: '',
            tld: '',
            native: '',
            region: '',
            region_id: 0,
            subregion: '',
            subregion_id: 0,
            nationality: '',
            timezones: '',
            translations: '',
            latitude: 0,
            longitude: 0,
            emoji: '',
            emojiU: '',
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
        this.map.set('iso3', 'text');
        this.map.set('numeric_code', 'text');
        this.map.set('iso2', 'text');
        this.map.set('phonecode', 'text');
        this.map.set('capital', 'text');
        this.map.set('currency', 'text');
        this.map.set('currency_name', 'text');
        this.map.set('currency_symbol', 'text');
        this.map.set('tld', 'text');
        this.map.set('native', 'text');
        this.map.set('region', 'text');
        this.map.set('region_id', 'numeric');
        this.map.set('subregion', 'text');
        this.map.set('subregion_id', 'numeric');
        this.map.set('nationality', 'text');
        this.map.set('timezones', 'text');
        this.map.set('translations', 'text');
        this.map.set('latitude', 'numeric');
        this.map.set('longitude', 'numeric');
        this.map.set('emoji', 'text');
        this.map.set('emojiU', 'text');
        this.map.set('created_at', 'datetime');
        this.map.set('updated_at', 'datetime');
        this.map.set('flag', 'numeric');
        this.map.set('wikiDataId', 'text');
    }

    get type() {
        return {
            id: Number,
            name: String,
            iso3: String,
            numeric_code: String,
            iso2: String,
            phonecode: String,
            capital: String,
            currency: String,
            currency_name: String,
            currency_symbol: String,
            tld: String,
            native: String,
            region: String,
            region_id: Number,
            subregion: String,
            subregion_id: Number,
            nationality: String,
            timezones: String,
            translations: String,
            latitude: Number,
            longitude: Number,
            emoji: String,
            emojiU: String,
            created_at: Date,
            updated_at: Date,
            flag: Boolean,
            wikiDataId: String,
        };
    }
}




