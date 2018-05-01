import { util } from '../../../class/util';

export class ThirdParty {
    id: number;
    document_type: string;
    document_number: string;
    names: string;
    surnames: string;
    born_date: Date;
    marital_status: string;
    start_date: any;

    public constructor(
        id?: number,
        document_type?: string,
        document_number?: string,
        names?: string,
        surnames?: string,
        born_date?: any,
        marital_status?: string,
        start_date?: any
    ) {
        this.id = id;
        this.document_type = document_type;
        this.document_number = document_number;
        this.names = names;
        this.surnames = surnames;
        this.born_date = util.get_date(born_date);
        this.marital_status = marital_status;
        this.start_date = start_date;
    }
}
