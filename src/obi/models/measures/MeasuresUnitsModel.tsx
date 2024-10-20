/**
 * Analyse Data Model
 */

import { Model } from '../model'




export class MeasuresUnitsModel extends Model {


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

            entity: '',
            sizeName: '',
            sizeSymbol: '',
            unitName: '',
            unitSymbol: '',
            dimension: '',
            group: '',
            tagging: '',
            comment: '',


            entities: {},
        };
    }




    init() {
        this.map = new Map();
        this.map.set('pk', 'id');
        this.map.set('id', 'numeric');
        this.map.set('deleted', 'boolean');
        this.map.set('created', 'datetime');
        this.map.set('changed', 'datetime');

        this.map.set('entity', 'text');
        this.map.set('sizeName', 'text');
        this.map.set('sizeSymbol', 'text');
        this.map.set('unitName', 'text');
        this.map.set('unitSymbol', 'text');
        this.map.set('dimension', 'text');
        this.map.set('group', 'text');
        this.map.set('tagging', 'text');
        this.map.set('comment', 'text');
    }

    get type() {
        return {
            id: Number,
            deleted: Boolean,
            created: Date,
            changed: Date,

            entity: String,
            sizeName: String,
            sizeSymbol: String,
            unitName: String,
            unitSymbol: String,
            dimension: String,
            group: String,
            tagging: String,
            comment: String,
        };
    }
}




