/**
 * Analyse Data Model
 */

import { Model } from '../model'




export class AnalysesPointsModel extends Model {


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
            point: '',
            designation: '',
            available: false,
            picture: '',
            equipement: 0,
            description: '',


            companies: {},
            equipements: {},
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
        this.map.set('point', 'text');
        this.map.set('designation', 'text');
        this.map.set('available', 'boolean');
        this.map.set('picture', 'text');
        this.map.set('equipement', 'numeric');
        this.map.set('description', 'text');
    }

    get type() {
        return {
            id: Number,
            deleted: Boolean,
            created: Date,
            changed: Date,

            company: Number,
            point: String,
            designation: String,
            available: Boolean,
            picture: String,
            equipement: Number,
            description: String,

        };
    }
}




