/**
 * Analyse Data Model
 */

import { Model } from './../model'




export class PersistenceStandardModel extends Model {


    constructor(attributes = {}) {
        super(attributes);
        this.init();
    }

    get defaults() {
        return {
            id: 0,
            deleted:0,
            created: 0,
            changed: 0,
            company: 0,
            tag: 0,
            vFloat: 0.0,
            vInt: 0,
            vBool: false,
            vStr: '',
            vDateTime: 0,
            vStamp: 0,
            stampStart: 0,
            stampEnd: 0,
            tbf: 0.0,
            ttr: 0.0,
            error: false,
            errorMsg: ''
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
        this.map.set('vFloat', 'numeric');
        this.map.set('vInt', 'numeric');
        this.map.set('vBool', 'numeric');
        this.map.set('vStr', 'text');
        this.map.set('vDateTime', 'datetime');
        this.map.set('vStamp', 'datetime');
        this.map.set('stampStart', 'datetime');
        this.map.set('stampEnd', 'datetime');
        this.map.set('tbf', 'numeric');
        this.map.set('ttr', 'numeric');
        this.map.set('error', 'numeric');
        this.map.set('errorMsg', 'text');
    }

}




