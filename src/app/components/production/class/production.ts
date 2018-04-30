import { util } from '../../../class/util';

export class Production {
    id: number;
    employee_id: number;
    date: any;
    cost: number;

    public constructor(
        id?: number,
        employee_id?: number,
        date?: any,
        cost?: number
    ) {
        this.id = id;
        this.employee_id = employee_id;
        this.date = util.get_date(date);
        this.cost = cost;
    }
}
