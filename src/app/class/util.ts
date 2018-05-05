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
                const date_to_return = new Date(parseInt(result[1], 10), parseInt(result[2], 10) - 1, parseInt(result[3], 10));
                return date_to_return;
            }
        }
        // return new Date();
    }

    public get_json(element) {
        const json = {};
        const keys = Object.keys(element);
        for (const key of keys) {
            const value = element[key];
            if (value instanceof Date) {
                json[key] = `${value.getFullYear()}-${value.getMonth() + 1}-${value.getDate()}`;
            } else {
                json[key] = value;
            }
        }
        return json;
    }
}

export const util = new Util();
