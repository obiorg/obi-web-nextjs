export const creatorServiceHelper = (entity) => {
    let i = 0;
    var obj = {};
    const creatorEntity = Object.keys(entity).reduce((array, key) => {
        if (key !== 'id' && key !== 'created' && key !== 'changed') {
            if (entity[key] !== null) {
                // const keyError = {...errors[key], name: key};//.map(el => ({ ...el, name : key}));
                // console.log(i, ':', key, entity[key]);
                const keyVal = { key: key, value: entity[key] };

                i++;
                var o = new Object();
                o[key] = entity[key];
                obj[key] = entity[key];
                array.push(o);
            }
        }
        return array;
    }, []);


    // console.log(creatorEntity);
    return obj; 
};
