class Util {

    public get_date(date: any) {
        let result = null;
        if (date instanceof Date) {
            result = date;
        } else if (typeof date === 'string' || typeof date === 'number') {
            const regDate = [/^((?:19|20){1}[0-9]{2}){1}([0-9]{2}){1}([0-9]{2}){1}$/,
                             /^([0-9]{4}){1}\-{1}([0-9]{2}){1}\-{1}([0-9]{2}){1}/];
            let groups = null;
            if (regDate[0].test(date.toString())) {
                groups = regDate[0].exec(date.toString());
            } else if (regDate[1].test(date.toString())) {
                groups = regDate[1].exec(date.toString());
            }
            if (groups !== null) {
              result = new Date(parseInt(groups[1], 10), parseInt(groups[2], 10) - 1, parseInt(groups[3], 10));
            }
        }
        if (result !== null) {
            return result;
        }
    }

    public get_json(element) {
        const json = {};
        const keys = Object.keys(element);
        for (const key of keys) {
            const value = element[key];
            if (value instanceof Date) {
                json[key] = `${value.getFullYear()}-${value.getMonth() + 1}-${value.getDate()}`;
            } else if (value !== undefined) {
                json[key] = value;
            }
        }
        return json;
    }

    public extract_response(res: any): any {
      if (res === null || res === undefined) {
        return false;
      }
      const response: any = {};
      response.code = res.code;
      response.error = res.text || res.error;
      if (!response.code && response.code === 0) {
        delete res.code;
        res = Object.keys(res).map(i => res[i]);
        response.data = res;
      }
      return response;
    }
}

export const util = new Util();
