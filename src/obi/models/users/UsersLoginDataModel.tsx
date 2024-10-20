/**
 * Analyse Data Model
 */

import { Model } from '../model'




export class UsersLoginDataModel extends Model {


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

            loginName: '',
            passwordHash: '',
            passwordSalt: '',
            hashAlgorithm: 0,
            email: '',
            emailVerified: 0,
            tokenConfirmation: '',
            tokenGenerationTime: 0,
            tokenPasswordRecovery: '',
            tokenTimeRecovery: 0,
            image: '',

            user_email_verified: {},
            user_hashing_algorithms: {},
        };
    }




    init() {
        this.map = new Map();
        this.map.set('pk', 'id');
        this.map.set('id', 'numeric');
        this.map.set('deleted', 'boolean');
        this.map.set('created', 'datetime');
        this.map.set('changed', 'datetime');

        this.map.set('loginName', 'text');
        this.map.set('passwordHash', 'text');
        this.map.set('passwordSalt', 'text');
        this.map.set('hashAlgorithm', 'numeric');
        this.map.set('email', 'text');
        this.map.set('emailVerified', 'boolean');
        this.map.set('tokenConfirmation', 'text');
        this.map.set('tokenGenerationTime', 'datetime');
        this.map.set('tokenPasswordRecovery', 'text');
        this.map.set('tokenTimeRecovery', 'datetime');
        this.map.set('image', 'text');

    }

    get type() {
        return {
            id: Number,
            deleted: Boolean,
            created: Date,
            changed: Date,

            loginName: String,
            passwordHash: String,
            passwordSalt: String,
            hashAlgorithm: Number,
            email: String,
            emailVerified: Boolean,
            tokenConfirmation: String,
            tokenGenerationTime: Date,
            tokenPasswordRecovery: String,
            tokenTimeRecovery: Date,
            image: String,
        };
    }
}




