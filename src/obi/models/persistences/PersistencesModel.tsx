/**
 * Analyse Data Model
 */

import { Model } from './../model'




export class PersistencesModel extends Model {


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
            tag: 0,
            method: '',
            activate: false,
            comment: ''
        };
    }

    init() {
        this.map = new Map();
        this.map.set('pk', 'id');
        this.map.set('id', 'numeric');
        this.map.set('deleted', 'numeric');
        this.map.set('created', 'datetime');
        this.map.set('changed', 'datetime');

        this.map.set('company', 'numeric');
        this.map.set('tag', 'numeric');
        this.map.set('method', 'text');
        this.map.set('activate', 'numeric');
        this.map.set('comment', 'text');
    }

}




