import { util } from '../../../class/util';

export class Inventory {
    id: number;
    batch: string;
    presentation_id: string;
    product_id: string;
    inventory_state_id: string;
    start_date: Date;
    expiration_date: Date;

    public constructor(
        id?: number,
        batch?: string,
        presentation_id?: number,
        product_id?: number,
        inventory_state_id?: string,
        start_date?: any,
        expiration_date?: any
    ) {
        this.id = id;
        this.batch = batch;
        this.presentation_id = !!presentation_id ? btoa(presentation_id.toString()) : undefined;
        this.product_id = !!product_id ? btoa(product_id.toString()) : undefined;
        this.inventory_state_id = inventory_state_id;
        this.start_date = util.get_date(start_date);
        this.expiration_date = util.get_date(expiration_date);
    }


}
