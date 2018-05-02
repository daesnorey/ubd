export class Client {
    id: number;
    third_id: number;
    factor: number;
    phone: number;
    address: string;
    start_date: any;

    public constructor(
        id?: number,
        third_id?: number,
        factor?: number,
        phone?: number,
        address?: string,
        start_date?: any
    ) {
        this.id = id;
        this.third_id = third_id;
        this.factor = factor;
        this.phone = phone;
        this.address = address;
        this.start_date = start_date;
    }
}
