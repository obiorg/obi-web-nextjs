/**
 * Analyse Data Model
 */

import { Model } from '../model'




export class UsersPermissionsModel extends Model {


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

            name: '',
            designation: '',
            parent: 0,

            user_permissions: {},
            other_user_permissions: [],
        };
    }




    init() {
        this.map = new Map();
        this.map.set('pk', 'id');
        this.map.set('id', 'numeric');
        this.map.set('deleted', 'boolean');
        this.map.set('created', 'datetime');
        this.map.set('changed', 'datetime');

        this.map.set('name', 'text');
        this.map.set('designation', 'text');
        this.map.set('parent', 'numeric');
    }

    get type() {
        return {
            id: Number,
            deleted: Boolean,
            created: Date,
            changed: Date,

            name: String,
            designation: String,
            parent: Number,
        };
    }
}




