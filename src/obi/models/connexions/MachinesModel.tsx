/**
 * Analyse Data Model
 */

import { isNullishCoalesce } from "typescript";
import { Model } from "../model";






export class MachinesModel extends Model {


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
            company: null,
            address: '',
            mask: '',
            dns: '',
            ipv6: '',
            port: null,
            name: '',
            rack: null,
            slot: null,
            driver: null,
            mqtt: false,
            mqtt_user: '',
            mqtt_password: '',
            webhook: false,
            webhook_secret: '',
            bus: null,
            description: '',

            companies: null,
            drivers: null
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
        this.map.set('address', 'text');
        this.map.set('mask', 'text');
        this.map.set('dns', 'text');
        this.map.set('ipv6', 'text');
        this.map.set('port', 'numeric');
        this.map.set('name', 'text');
        this.map.set('rack', 'numeric');
        this.map.set('slot', 'numeric');
        this.map.set('mqtt', 'numeric');
        this.map.set('mqtt_user', 'text');
        this.map.set('mqtt_password', 'text');
        this.map.set('webhook', 'numeric');
        this.map.set('webhook_secret', 'text');
        this.map.set('bus', 'numeric');
        this.map.set('description', 'text');
    }

}




