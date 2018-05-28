export class ProductionProcess {
    id: number;
    production_id: number;
    product_id: any;
    presentation_id: number;
    process_id: string;
    employee_id: number;
    quantity: number;

    public constructor(
        id?: number,
        production_id?: number,
        product_id?: number,
        presentation_id?: number,
        process_id?: string,
        employee_id?: number,
        quantity?: number
    ) {
        this.id = id;
        this.production_id = production_id;
        this.product_id = product_id;
        this.presentation_id = presentation_id;
        this.process_id = process_id;
        this.employee_id = employee_id;
        this.quantity = quantity;
    }
}
