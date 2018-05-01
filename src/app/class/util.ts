class Util {

    public get_date(date: any) {
        if (typeof date === 'string' || typeof date === 'number') {
            const regDate = [/^((?:19|20){1}[0-9]{2}){1}([0-9]{2}){1}([0-9]{2}){1}$/,
                             /^([0-9]{4}){1}\-{1}([0-9]{2}){1}\-{1}([0-9]{2}){1}/];
            let result = null;
            if (regDate[0].test(date.toString())) {
                result = regDate[0].exec(date.toString());
            } else if (regDate[1].test(date.toString())) {
                result = regDate[1].exec(date.toString());
            }
            if (result !== null) {
                return new Date(parseInt(result[1], 10), parseInt(result[2], 10) - 1, parseInt(result[3], 10));
            }
        }
        //return new Date();
    }
}

export const util = new Util();
