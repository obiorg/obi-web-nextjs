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
            id: 0,
            deleted: false,
            created: null,
            changed: null,

            company: 0,
            table: 0,
            name: null,
            machine: 0,
            type: 0,
            memory: 0,
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
            measureUnit: 0,
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
            alarm: 0,
            persistenceEnable: false,
            persOffsetEnable: false,
            persOffsetFloat: 0,
            persOffsetInt: 0,
            persOffsetBool: false,
            persOffsetDateTime: null,
            comment: null,
            list: 0,
    
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
        this.map.set('deleted', 'numeric');
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
        this.map.set('active', 'numeric');
        this.map.set('cycle', 'numeric');
        this.map.set('delta', 'numeric');
        this.map.set('deltaFloat', 'numeric');
        this.map.set('deltaInt', 'numeric');
        this.map.set('deltaBool', 'numeric');
        this.map.set('deltaDateTime', 'datetime');
        this.map.set('vFloat', 'numeric');
        this.map.set('vInt', 'numeric');
        this.map.set('vBool', 'numeric');
        this.map.set('vStr', 'text');
        this.map.set('vDateTime', 'datetime');
        this.map.set('vStamp', 'datetime');
        this.map.set('vDefault', 'numeric');
        this.map.set('vFloatDefault', 'numeric');
        this.map.set('vIntDefault', 'numeric');
        this.map.set('vBoolDefault', 'numeric');
        this.map.set('vStrDefault', 'text');
        this.map.set('vDateTimeDefault', 'datetime');
        this.map.set('vStampDefault', 'datetime');
        this.map.set('counter', 'numeric');
        this.map.set('counterType', 'numeric');
        this.map.set('mesure', 'numeric');
        this.map.set('mesureMin', 'numeric');
        this.map.set('mesureMax', 'numeric');
        this.map.set('measureUnit', 'numeric');
        this.map.set('mqtt_topic', 'text');
        this.map.set('webhook', 'text');
        this.map.set('laboratory', 'numeric');
        this.map.set('formula', 'numeric');
        this.map.set('formCalculus', 'text');
        this.map.set('formProcessing', 'numeric');
        this.map.set('error', 'numeric');
        this.map.set('errorMsg', 'text');
        this.map.set('errorStamp', 'datetime');
        this.map.set('alarmEnable', 'numeric');
        this.map.set('alarm', 'numeric');
        this.map.set('persistenceEnable', 'numeric');
        this.map.set('persOffsetEnable', 'numeric');
        this.map.set('persOffsetFloat', 'numeric');
        this.map.set('persOffsetInt', 'numeric');
        this.map.set('persOffsetBool', 'numeric');
        this.map.set('persOffsetDateTime', 'datetime');
        this.map.set('comment', 'text');
        this.map.set('list', 'numeric');

        // this.map.set('alarms', 'OBI.alarms');
        // this.map.set('companies', 'OBI.companies');
        // this.map.set('tags_lists', 'OBI.tags_lists');
        // this.map.set('machines', 'OBI.machines');
        // this.map.set('meas_units', 'OBI.meas_units');
        // this.map.set('tags_memories', 'OBI.tags_memories');
        // this.map.set('tags_tables', 'OBI.tags_tables');
        // this.map.set('tags_types', 'OBI.tags_types');
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
            deltaBool: Number,
            deltaDateTime: Number,
            vFloat: Number,
            vInt: Number,
            vBool: Boolean,
            vStr: String,
            vDateTime: Date,
            vStamp: Date,
            vDefault: Boolean,
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
            persistenceEnable: Boolean,
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




