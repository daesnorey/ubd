import { Inventory } from './inventory';
import { util } from '../../../class/util';

export class ProductionDetail extends Inventory {
    id: number;
    production_id: number;
    inventory_id: number;
    cost: number;
    amount: number;
    date: any;

    public constructor(
        id?: number,
        production_id?: number,
        inventory_id?: number,
        cost?: number,
        amount?: number,
        date?: any,
        batch?: string,
        presentation_id?: number,
        product_id?: number,
        inventory_state_id?: string,
        start_date?: any,
        expiration_date?: any
    ) {
        super(
            inventory_id,
            batch,
            presentation_id,
            product_id,
            inventory_state_id,
            start_date,
            expiration_date
        );
        this.id = id;
        this.production_id = production_id;
        this.inventory_id = inventory_id;
        this.cost = cost;
        this.amount = amount;
        this.date = util.get_date(date);
    }
}
