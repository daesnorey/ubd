import { Injectable } from '@angular/core';

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

}
