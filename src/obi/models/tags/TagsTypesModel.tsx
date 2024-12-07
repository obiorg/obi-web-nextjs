/**
 * Analyse Data Model
 */

import { Model } from '../model'




export class TagsTypesModel extends Model {



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

            type: '',
            designation: '',
            bit: 0,
            byte: 0,
            word: 0,
            group: '',
        }
    }




    init() {
        this.map = new Map();
        this.map.set('pk', 'id');
        this.map.set('id', 'numeric');
        this.map.set('deleted', 'boolean');
        this.map.set('created', 'datetime');
        this.map.set('changed', 'datetime');

        this.map.set('type', 'text');
        this.map.set('designation', 'text');
        this.map.set('bit', 'numeric');
        this.map.set('byte', 'numeric');
        this.map.set('word', 'numeric');
        this.map.set('group', 'text');

    }

    get type() {
        return {
            id: Number,
            deleted: Boolean,
            created: Date,
            changed: Date,

            type: String,
            designation: String,
            bit: Number,
            byte: Number,
            word: Number,
            group: String,
        };
    }
}




