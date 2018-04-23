import { util } from '../../../class/util';

export class ThirdParty {
    id: number;
    document_type: string;
    document_number: string;
    names: string;
    surnames: string;
    third_type: number;
    born_date: Date;
    marita_status: string;
    start_date: any;

    public constructor(
        id?: number,
        document_type?: string,
        document_number?: string,
        names?: string,
        surnames?: string,
        third_type?: number,
        born_date?: number,
        marita_status?: string,
        start_date?: any
    ) {
        this.id = id;
        this.document_type = document_type;
        this.document_number = document_number;
        this.names = names;
        this.surnames = surnames;
        this.third_type = third_type;
        this.born_date = util.get_date(born_date);
        this.marita_status = marita_status;
        this.start_date = start_date;
    }
}
