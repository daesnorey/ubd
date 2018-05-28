import { util } from '../../../class/util';

export class Inventory {
    id: number;
    batch: string;
    presentation_id: string | number;
    product_id: string | number;
    inventory_state_id: string;
    start_date: Date;
    expiration_date: Date;
    quantity: number;

    public constructor(
        id?: number,
        batch?: string,
        presentation_id?: number | string,
        product_id?: number | string,
        inventory_state_id?: string,
        start_date?: any,
        expiration_date?: any,
        quantity?: number,
        enc= true
    ) {
        this.id = id;
        this.batch = batch;
        this.presentation_id = !!presentation_id && enc ? btoa(presentation_id.toString()) : presentation_id;
        this.product_id = !!product_id && enc ? btoa(product_id.toString()) : product_id;
        this.inventory_state_id = inventory_state_id;
        this.start_date = util.get_date(start_date);
        this.expiration_date = util.get_date(expiration_date);
        this.quantity = quantity;
    }


}
