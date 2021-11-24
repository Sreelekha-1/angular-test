import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private httpService: HttpClient) {
  }

  // tslint:disable-next-line:typedef
  findFromItunes(term: string) {
    let params = new HttpParams();
    params = params.set('term', term);
    const options = {
      params
    };
    return this.httpService.get<any>('https://itunes.apple.com/search', options);
  }

  // tslint:disable-next-line:typedef
  findFromDeezer(term: string) {
    let params = new HttpParams();
    params = params.set('q', term);
    const options = {
      params
    };
    return this.httpService.get<any>('https://itunes.apple.com/search', options);
  }
}
