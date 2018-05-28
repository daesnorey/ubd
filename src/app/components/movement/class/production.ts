import { util } from '../../../class/util';

export class Production {
    id: number;
    date: any;
    cost: number;

    public constructor(
        id?: number,
        date?: any,
        cost?: number
    ) {
        this.id = id;
        this.date = util.get_date(date);
        this.cost = cost;
    }
}
