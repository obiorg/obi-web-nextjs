/**
 * Analyse Data Model
 */

import { Model } from '../model'




export class UsersAccountRoleModel extends Model {


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

            user: 0,
            role: 0,

            user_roles: {},
            user_account: {},
        };
    }




    init() {
        this.map = new Map();
        this.map.set('pk', 'id');
        this.map.set('id', 'numeric');
        this.map.set('deleted', 'boolean');
        this.map.set('created', 'datetime');
        this.map.set('changed', 'datetime');

        this.map.set('user', 'numeric');
        this.map.set('role', 'numeric');

    }

    get type() {
        return {
            id: Number,
            deleted: Boolean,
            created: Date,
            changed: Date,

            user: Number,
            role: Number,
        };
    }
}




