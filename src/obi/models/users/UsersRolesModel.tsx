/**
 * Analyse Data Model
 */

import { Model } from '../model'




export class UsersRolesModel extends Model {


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
            business: 0,
            comapny: 0,
            name: '',
            description: '',

            businesses: {},
            companies: {},
            entities: {},
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
        this.map.set('business', 'numeric');
        this.map.set('company', 'numeric');
        this.map.set('name', 'text');
        this.map.set('description', 'text');

    }

    get type() {
        return {
            id: Number,
            deleted: Boolean,
            created: Date,
            changed: Date,

            entity: String,
            business: Number,
            company: Number,
            name: String,
            description: String,
        };
    }
}




