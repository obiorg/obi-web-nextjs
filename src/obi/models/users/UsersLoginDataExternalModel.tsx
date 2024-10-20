/**
 * Analyse Data Model
 */

import { Model } from '../model'




export class UsersLoginDataExternalModel extends Model {


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

            externalProvider: 0,
            tokenExternalProvider: '',

            user_external_providers: {},
        };
    }




    init() {
        this.map = new Map();
        this.map.set('pk', 'id');
        this.map.set('id', 'numeric');
        this.map.set('deleted', 'boolean');
        this.map.set('created', 'datetime');
        this.map.set('changed', 'datetime');

        this.map.set('externalProvider', 'numeric');
        this.map.set('tokenExternalProvider', 'text');

    }

    get type() {
        return {
            id: Number,
            deleted: Boolean,
            created: Date,
            changed: Date,

            externalProvider: Number,
            tokenExternalProvider: String,
        };
    }
}




