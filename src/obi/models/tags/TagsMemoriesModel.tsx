/**
 * Analyse Data Model
 */

import { Model } from '../model'




export class TagsMemoriesModel extends Model {


    constructor(attributes = {}) {
        super(attributes);
        this.init();
    }

    get defaults() {
        return {
            id: undefined,
            deleted: false,
            created: 0,
            changed: 0,

            name: '',
            comment: '',

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
        this.map.set('comment', 'text');

    }

    get type() {
        return {
            id: Number,
            deleted: Boolean,
            created: Date,
            changed: Date,

            name: String,
            comment: String,
        };
    }
}




