export class PurchaseDetail {
    id: number;
    purchase_id: number;
    product_id: string;
    presentation_id: string;
    amount: number;
    unitary_cost: number;
    total_cost: number;

    public constructor(
        id?: number,
        purchase_id?: number,
        product_id?: number,
        presentation_id?: number,
        amount?: number,
        unitary_cost?: number,
        total_cost?: number
    ) {
        this.id = id;
        this.purchase_id = purchase_id;
        this.product_id = btoa(product_id.toString());
        this.presentation_id = btoa(presentation_id.toString());
        this.amount = amount;
        this.unitary_cost = unitary_cost;
        this.total_cost = total_cost;
    }
}
