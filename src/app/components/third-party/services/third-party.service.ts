import { Injectable } from '@angular/core';
import { ThirdParty } from '../class/third-party';

@Injectable()
export class ThirdPartyService {

  constructor() { }

  public basic_search(query: string): any[] {
    return null;
  }

  public advance_search(query: string, options: RegExpExecArray): any[] {
    return null;
  }

  public search_by_page(page: number): any[] {
    return null;
  }

  public get_third_party(): ThirdParty[] {

    return [
      {
      id: 1,
      document_type: 'C',
      document_number: '1010189102',
      names: 'Laura',
      surnames: 'Corredor',
      third_type: 1,
      born_date: 19900203,
      marita_status: 'S',
      start_date: 20180405
    },
    {
      id: 2,
      document_type: 'C',
      document_number: '1013644408',
      names: 'Daniel',
      surnames: 'Novoa',
      third_type: 2,
      born_date: 19931030,
      marita_status: 'V',
      start_date: 20180405
    }];
  }

}
