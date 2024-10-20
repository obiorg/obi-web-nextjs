/**
 * Analyse Data Model
 */

import { Model } from '../model'




export class UsersAccountModel extends Model {


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

            firstName: '',
            lastName: '',
            middleName: '',
            initialLetter: '',
            genre: '',
            dateOfBirth: 0,

        };
    }




    init() {
        this.map = new Map();
        this.map.set('pk', 'id');
        this.map.set('id', 'numeric');
        this.map.set('deleted', 'boolean');
        this.map.set('created', 'datetime');
        this.map.set('changed', 'datetime');
        
        this.map.set('firstName', 'text');
        this.map.set('lastName', 'text');
        this.map.set('middleName', 'text');
        this.map.set('initialLetter', 'text');
        this.map.set('genre', 'text');
        this.map.set('dateOfBirth', 'datetime');

    }

    get type() {
        return {
            id: Number,
            deleted: Boolean,
            created: Date,
            changed: Date,
            
            firstName: String,
            lastName: String,
            middleName: String,
            initialLetter: String,
            genre: String,
            dateOfBirth: Date,
        };
    }
}




