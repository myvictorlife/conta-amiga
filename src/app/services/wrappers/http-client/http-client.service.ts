import { Injectable } from '@angular/core';
import { AppConstants } from '../../../constants/app.constants';
import { HttpClient, HttpParams } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  public appConstants = AppConstants;
  public url: string = this.appConstants.ENV.API_URL;

  constructor(public http: HttpClient) {
  }

  public get(endpoint: string, params?: any, reqOpts?: any) {
    if (!reqOpts) {
      reqOpts = {
        params: new HttpParams()
      };
    }

    // Support easy query params for GET requests
    if (params) {
      reqOpts.params = new HttpParams();
      // tslint:disable-next-line:forin
      for (const k in params) {
        reqOpts.params = reqOpts.params.append(k, params[k]);
      }
    }
    return new Promise((resolve, reject) => {
      setTimeout(() => { reject({ status: 0 }); }, AppConstants.API_CONFIGS.TIMEOUT);
      return this.http.get(this.url + '/' + endpoint, reqOpts)
        .subscribe(
        (res: any) => resolve(res),
        (err) => reject(err),
      );
    });
  }

  public post(endpoint: string, body: any, reqOpts?: any) {
    return new Promise((resolve, reject) => {
      setTimeout(() => { reject({ status: 0 }); }, AppConstants.API_CONFIGS.TIMEOUT);
      return this.http.post(this.url + '/' + endpoint, body, reqOpts)
        .subscribe(
        (res: any) => resolve(res),
        (err) => reject(err),
      );
    });
  }

  public put(endpoint: string, body: any, reqOpts?: any) {
    return new Promise((resolve, reject) => {
      setTimeout(() => { reject({ status: 0 }); }, AppConstants.API_CONFIGS.TIMEOUT);
      return this.http.put(this.url + '/' + endpoint, body, reqOpts)
        .subscribe(
        (res: any) => resolve(res),
        (err) => reject(err),
      );
    });
  }

  public delete(endpoint: string, params?: any, reqOpts?: any) {
    if (!reqOpts) {
      reqOpts = {
        params: new HttpParams()
      };
    }

    // Support easy query params for GET requests
    if (params) {
      reqOpts.params = new HttpParams();
      // tslint:disable-next-line:forin
      for (const k in params) {
        reqOpts.params = reqOpts.params.append(k, params[k]);
      }
    }

    return new Promise((resolve, reject) => {
      setTimeout(() => { reject({ status: 0 }); }, AppConstants.API_CONFIGS.TIMEOUT);
      return this.http.delete(this.url + '/' + endpoint, reqOpts)
        .subscribe(
        (res: any) => resolve(res),
        (err) => reject(err),
      );
    });
  }

  public patch(endpoint: string, body: any, reqOpts?: any) {
    return new Promise((resolve, reject) => {
      setTimeout(() => { reject({ status: 0 }); }, AppConstants.API_CONFIGS.TIMEOUT);
      return this.http.put(this.url + '/' + endpoint, body, reqOpts)
        .subscribe(
        (res: any) => resolve(res),
        (err) => reject(err),
      );
    });
  }

  public createParams(object: any) {
    let params = new HttpParams();
    for (const key in object) {
      if (object.hasOwnProperty(key)) {
        params = params.append(key, object[key]);
      }
    }
    return params;
  }

  public sanitizeParams(object: any) {
    for (const key in object) {
      if (object.hasOwnProperty(key) && !object[key]) {
        if (!( (object[key] === false) || (object[key] === 0) )) {
          delete(object[key]);
        }
      }
    }
    return object;
  }
}
