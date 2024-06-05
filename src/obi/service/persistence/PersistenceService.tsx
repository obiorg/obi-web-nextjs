import { OBI } from '@/src/types/obi';





export const PersistenceService = {

    /**
     * 
     * @returns data of storage tank 4
     */
    count() {
        return fetch( process.env.httpPath + '/persistence/count', { headers: { 'Cache-Control': 'no-cache' } })
            .then((res) => res.json());
    },

    /**
     * Fin all presistence with no filters
     * @returns all 
     */
    async findAll() {
        return await fetch( process.env.httpPath + '/persistence/'
            , { headers: { 'Cache-Control': 'no-cache' } })
            .then((res) => {return res.json()})
            .then((persistence) => { return persistence as OBI.persistence[]})
    },


    async findByPage(offset: number, limit: number, sort: string) {
        return await fetch( 
            process.env.httpPath 
            + '/persistence/offset/' + offset + '/limit/' + limit + '/sort/' + sort
            , { headers: { 'Cache-Control': 'no-cache' } })
            .then((res) => {return res.json()})
            // .then(persistence => { console.log(persistence); return persistence})
            .then((persistence) => { return persistence as OBI.persistence[]})
    },

    async findByPageOld(offset: number, limit: number, sort: string)  {
        const res =
            await await fetch( process.env.httpPath + '/persistence/offset/' + offset + '/limit/' + limit + '/sort/' + sort
                , { headers: { 'Cache-Control': 'no-cache' } });

        return await res.json(); 
    }
};
