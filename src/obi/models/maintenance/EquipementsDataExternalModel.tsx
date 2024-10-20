/**
 * Analyse Data Model
 */

import { Model } from '../model'




export class EquipementsDataExternalModel extends Model {


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
            equipement: 0,
            provider: 0,
            
            companies: {},
            equipements: {},
            equipements_external_providers: {},
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
        this.map.set('equipement', 'numeric');
        this.map.set('provider', 'numeric');
    }

    get type() {
        return {
            id: Number,
            deleted: Boolean,
            created: Date,
            changed: Date,
            
            company: Number,
            equipement: Number,
            provider: Number,
        };
    }
}




