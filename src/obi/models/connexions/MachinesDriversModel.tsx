/**
 * Analyse Data Model
 */

import { Model } from "../model";






export class MachinesDriversModel extends Model {


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
            driver: '',
            description: ''
        };
    }

    init() {
        this.map = new Map();
        this.map.set('pk', 'id');
        this.map.set('id', 'numeric');
        this.map.set('deleted', 'numeric');
        this.map.set('created', 'datetime');
        this.map.set('changed', 'datetime');

        this.map.set('driver', 'text');
        this.map.set('description', 'text');
    }

}




