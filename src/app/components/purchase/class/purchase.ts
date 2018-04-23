import { util } from '../../../class/util';

export class Purchase {
    id: number;
    third_party_id: number;
    date: Date;
    sub_cost: number;
    total_cost: number;
    state: number;

    public constructor(
        id?: number,
        third_party_id?: number,
        date?: any,
        sub_cost?: number,
        total_cost?: number,
        state?: number
    ) {
        this.id = id;
        this.third_party_id = third_party_id;
        this.date = util.get_date(date);
        this.sub_cost = sub_cost;
        this.total_cost = total_cost;
        this.state = state;
    }
}
