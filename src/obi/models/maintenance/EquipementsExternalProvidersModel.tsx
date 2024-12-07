/**
 * Analyse Data Model
 */

import { Model } from '../model'




export class EquipementsExternalProvidersModel extends Model {


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

            company: 0,
            provider: '',
            name: '',

            type: 0,
            sourceType: 0,
            link: 0,
            source: '',
            bddServer: '',
            bddUser: '',
            bddPassword: '',
            bddPort: 0,

            paramBool1: false,
            paramBool2: false,
            paramBool3: false,
            paramBool4: false,
            paramBool5: false,

            paramInt1: 0,
            paramInt2: 0,
            paramInt3: 0,
            paramInt4: 0,
            paramInt5: 0,


            paramStr1: '',
            paramStr2: '',
            paramStr3: '',
            paramStr4: '',
            paramStr5: '',

            companies: {},
        };
    }




    init() {
        this.map = new Map();
        this.map.set('pk', 'id');
        this.map.set('id', 'numeric');
        this.map.set('deleted', 'boolean');
        this.map.set('created', 'datetime');
        this.map.set('changed', 'datetime');

        this.map.set('company', 'numeric');
        this.map.set('provider', 'text');
        this.map.set('name', 'text');

        this.map.set('type', 'numeric');
        this.map.set('sourceType', 'numeric');
        this.map.set('link', 'numeric');
        this.map.set('source', 'text');
        this.map.set('bddServer', 'text');
        this.map.set('bddUser', 'text');
        this.map.set('bddPassword', 'text');
        this.map.set('bddPort', 'numeric');

        this.map.set('paramBool1', 'boolean');
        this.map.set('paramBool2', 'boolean');
        this.map.set('paramBool3', 'boolean');
        this.map.set('paramBool4', 'boolean');
        this.map.set('paramBool5', 'boolean');

        this.map.set('paramInt1', 'numeric');
        this.map.set('paramInt2', 'numeric');
        this.map.set('paramInt3', 'numeric');
        this.map.set('paramInt4', 'numeric');
        this.map.set('paramInt5', 'numeric');

        this.map.set('paramStr1', 'text');
        this.map.set('paramStr2', 'text');
        this.map.set('paramStr3', 'text');
        this.map.set('paramStr4', 'text');
        this.map.set('paramStr5', 'text');



    }

    get type() {
        return {
            id: Number,
            deleted: Boolean,
            created: Date,
            changed: Date,
            company: Number,
            provider: String,
            name: String,
            type: Number,
            sourceType: Number,
            link: Number,
            source: String,
            bddServer: String,
            bddUser: String,
            bddPassword: String,
            bddPort: Number,
            paramBool1: Boolean,
            paramBool2: Boolean,
            paramBool3: Boolean,
            paramBool4: Boolean,
            paramBool5: Boolean,
            paramInt1: Number,
            paramInt2: Number,
            paramInt3: Number,
            paramInt4: Number,
            paramInt5: Number,
            paramStr1: String,
            paramStr2: String,
            paramStr3: String,
            paramStr4: String,
            paramStr5: String
        };
    }
}




