/**
 * Analyse Data Model
 */

import { Model } from '../model'




export class CompaniesModel extends Model {


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
            designation: '',
            builded: 0,
            main: false,
            activated: false,
            logoPath: '',
            location: 0,
            business: 0,
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

        this.map.set('designation', 'text');
        this.map.set('builded', 'numeric');
        this.map.set('main', 'numeric');
        this.map.set('activated', 'numeric');
        this.map.set('logoPath', 'text');
        this.map.set('location', 'numeric');
        this.map.set('business', 'numeric');

    }

}




