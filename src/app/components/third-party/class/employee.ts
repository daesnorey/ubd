import { ThirdParty } from './third-party';
import { util } from '../../../class/util';

export class Employee extends ThirdParty {
    id: number;
    third_id: number;
    factor: number;
    phone: number;
    start_date: Date;
    end_date: Date;

    public constructor(
        id?: number,
        third_id?: number,
        factor?: number,
        phone?: number,
        start_date?: any,
        end_date?: any,
        document_type?: string,
        document_number?: string,
        names?: string,
        surnames?: string,
        born_date?: any,
        marital_status?: string
    ) {
        super(
            third_id,
            document_type,
            document_number,
            names,
            surnames,
            born_date,
            marital_status,
            start_date
        );
        this.id = id;
        this.third_id = third_id;
        this.factor = factor;
        this.phone = phone;
        this.start_date = util.get_date(start_date);
        this.end_date = util.get_date(end_date);
    }
}
