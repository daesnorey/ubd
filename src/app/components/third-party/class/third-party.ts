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
        this.born_date = this.get_date(born_date);
        this.marita_status = marita_status;
        this.start_date = start_date;
    }

    private get_date(date: any) {
        if (typeof date === 'string' || typeof date === 'number') {
            const regDate = /^((?:19|20){1}[0-9]{2}){1}([0-9]{2}){1}([0-9]{2}){1}$/;
            const result = regDate.exec(date.toString());
            return new Date(parseInt(result[1], 10), parseInt(result[2], 10) - 1, parseInt(result[3], 10));
        }
        return new Date();
    }
}
