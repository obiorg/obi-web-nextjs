export const JsonHelper = {
    /**
     * Allow to manage big int
     * @param param Json containing big int
     */
    mngBigInt(param: any): any {
        return JSON.stringify(
            param,
            (key, value) => (typeof value === 'bigint' ? value.toString() : value) // return everything else unchanged
        );
    }
};
