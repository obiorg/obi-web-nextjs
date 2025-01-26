


export const ZodHelper = {




    issuesFlatten(unionErrors: any[], index: number): any {

        // console.log('zodHelper >> issuesFlatten >> Errors ', unionErrors);
        // console.log('zodHelper >> issuesFlatten >> Errors ', unionErrors[index].issues);
        // console.log('zodHelper >> issuesFlatten >> Errors >> issues index ' + index + ' ' , unionErrors[index].issues[0]);
        // console.log('zodHelper >> issuesFlatten >> Errors >> issues index ' + index + ' ' , unionErrors[index].issues[1]);

        let errors:any = {};

        unionErrors[index].issues.forEach((err: any, index:number) => {
            // console.log('zodHelper >> issuesFlatten >> Errors >> issues index ' + index +'>>'+ err.path[0] +'>>'+ err.message);
            errors[err.path[0]] = [err.message]; // + ' ' + err.code];
        });


        // console.log('zodHelper >> errors', errors);
        return errors;
    }

};
