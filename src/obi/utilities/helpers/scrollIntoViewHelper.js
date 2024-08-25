export const scrollIntoViewHelper = (errors) => {
    const reqErrors = Object.keys(errors).reduce((array, key) => {
        if (errors[key].error) {
            const keyError = {...errors[key], name: key};//.map(el => ({ ...el, name : key}));
            array.push(keyError);
        }
        return array;
    }, []);
    const firstError = reqErrors[0];
    const selector = '[name="' + firstError.name + '"]';
    // console.log(reqErrors, firstError, selector);
    let el = document.querySelector(selector);
    // console.log('el', el)
    if (el) {
        el.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
            // inline: 'nearest'
        });
    }else{

    }
};
