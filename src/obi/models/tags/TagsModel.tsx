/**
 * Analyse Data Model
 */

import { Model } from '../model'




export class TagsModel extends Model {


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

            company: undefined,
            table: undefined,
            name: null,
            machine: undefined,
            type: undefined,
            memory: undefined,
            db: 0,
            byte: 0,
            bit: 0,
            active: false,
            cycle: 0,
            delta: false,
            deltaFloat: 0,
            deltaInt: 0,
            deltaBool: 0,
            deltaDateTime: null,
            vFloat: 0,
            vInt: 0,
            vBool: false,
            vStr: null,
            vDateTime: null,
            vStamp: null,
            vDefault: false,
            vFloatDefault: 0,
            vIntDefault: 0,
            vBoolDefault: false,
            vStrDefault: null,
            vDateTimeDefault: null,
            vStampDefault: null,
            counter: false,
            counterType: 0,
            mesure: false,
            mesureMin: 0,
            mesureMax: 0,
            measureUnit: undefined,
            mqtt_topic: null,
            webhook: null,
            laboratory: false,
            formula: false,
            formCalculus: null,
            formProcessing: 0,
            error: false,
            errorMsg: null,
            errorStamp: null,
            alarmEnable: false,
            alarm: undefined,
            persistenceEnable: false,
            persOffsetEnable: false,
            persOffsetFloat: 0,
            persOffsetInt: 0,
            persOffsetBool: false,
            persOffsetDateTime: null,
            comment: null,
            list: undefined,
    
            alarms: {},
            companies: {},
            tags_lists: {},
            machines: {},
            meas_units: {},
            tags_memories: {},
            tags_tables: {},
            tags_types: {}
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
        this.map.set('table', 'numeric');
        this.map.set('name', 'text');
        this.map.set('machine', 'numeric');
        this.map.set('type', 'numeric');
        this.map.set('memory', 'numeric');
        this.map.set('db', 'numeric');
        this.map.set('byte', 'numeric');
        this.map.set('bit', 'numeric');
        this.map.set('active', 'boolean');
        this.map.set('cycle', 'numeric');
        this.map.set('delta', 'boolean');
        this.map.set('deltaFloat', 'numeric');
        this.map.set('deltaInt', 'numeric');
        this.map.set('deltaBool', 'numeric');
        this.map.set('deltaDateTime', 'datetime');
        this.map.set('vFloat', 'numeric');
        this.map.set('vInt', 'numeric');
        this.map.set('vBool', 'boolean');
        this.map.set('vStr', 'text');
        this.map.set('vDateTime', 'datetime');
        this.map.set('vStamp', 'datetime');
        this.map.set('vDefault', 'numeric');
        this.map.set('vFloatDefault', 'numeric');
        this.map.set('vIntDefault', 'numeric');
        this.map.set('vBoolDefault', 'boolean');
        this.map.set('vStrDefault', 'text');
        this.map.set('vDateTimeDefault', 'datetime');
        this.map.set('vStampDefault', 'datetime');
        this.map.set('counter', 'boolean');
        this.map.set('counterType', 'numeric');
        this.map.set('mesure', 'boolean');
        this.map.set('mesureMin', 'numeric');
        this.map.set('mesureMax', 'numeric');
        this.map.set('measureUnit', 'numeric');
        this.map.set('mqtt_topic', 'text');
        this.map.set('webhook', 'text');
        this.map.set('laboratory', 'boolean');
        this.map.set('formula', 'boolean');
        this.map.set('formCalculus', 'text');
        this.map.set('formProcessing', 'numeric');
        this.map.set('error', 'boolean');
        this.map.set('errorMsg', 'text');
        this.map.set('errorStamp', 'datetime');
        this.map.set('alarmEnable', 'boolean');
        this.map.set('alarm', 'numeric');
        this.map.set('persistenceEnabled', 'boolean');
        this.map.set('persOffsetEnable', 'boolean');
        this.map.set('persOffsetFloat', 'numeric');
        this.map.set('persOffsetInt', 'numeric');
        this.map.set('persOffsetBool', 'boolean');
        this.map.set('persOffsetDateTime', 'datetime');
        this.map.set('comment', 'text');
        this.map.set('list', 'numeric');

    }


    
    get type() {
        return {
            id: Number,
            deleted: Boolean,
            created: Date,
            changed: Date,
            
            company: Number,
            table: Number,
            name: String,
            machine: Number,
            type: Number,
            memory: Number,
            db: Number,
            byte: Number,
            bit: Number,
            active: Boolean,
            cycle: Number,
            delta: Boolean,
            deltaFloat: Number,
            deltaInt: Number,
            deltaBool: Boolean,
            deltaDateTime: Date,
            vFloat: Number,
            vInt: Number,
            vBool: Boolean,
            vStr: String,
            vDateTime: Date,
            vStamp: Date,
            vDefault: Number,
            vFloatDefault: Number,
            vIntDefault: Number,
            vBoolDefault: Boolean,
            vStrDefault: String,
            vDateTimeDefault: Date,
            vStampDefault: Date,
            counter: Boolean,
            counterType: Number,
            mesure: Boolean,
            mesureMin: Number,
            mesureMax: Number,
            measureUnit: Number,
            mqtt_topic: String,
            webhook: String,
            laboratory: Boolean,
            formula: Boolean,
            formCalculus: String,
            formProcessing: Number,
            error: Boolean,
            errorMsg: String,
            errorStamp: Date,
            alarmEnable: Boolean,
            alarm: Number,
            persistenceEnabled: Boolean,
            persOffsetEnable: Boolean,
            persOffsetFloat: Number,
            persOffsetInt: Number,
            persOffsetBool: Boolean,
            persOffsetDateTime: Date,
            comment: String,
            list: Number,
            
        };
    }
}




