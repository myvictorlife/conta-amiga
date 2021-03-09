import { Injectable } from '@angular/core';
import { HttpClientService } from '../../../wrappers/http-client/http-client.service';
import { AppConstants } from '../../../../constants/app.constants';
import { LoadingService } from '../../../wrappers/loading/loading.service';
import { ErrorHandlingService } from '../../error/error-handling/error-handling.service';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TravelService {

  public appConstants = AppConstants;
  // tslint:disable-next-line:member-ordering
  public handleError: any;
  constructor(
    public http: HttpClientService,
    public loading: LoadingService,
    private error: ErrorHandlingService,
  ) {
    this.handleError = error.handleErrorCallback;
  }

  async createTravel(params: { travel: any, loader?: any }) {
    await this.loading.showLoading(params.loader[0], params.loader[1]);
    let data: any = null;
    try {
      const body = params.travel;
      const token = localStorage.getItem(this.appConstants.STORAGE_NAMES.USER_TOKEN);
      data = await this.http.post(AppConstants.API_ENDPOINTS.TRAVELS, body, { headers: new HttpHeaders({ 'x-token': token }) });
    } catch (error) {
        console.warn('TravelService - createTravel: ', error);
        data = await this.handleError(error, params.loader[0]);
        await this.loading.showLoading(false);
    } finally {
      await this.loading.showLoading(false);
    }
    return data;
  }
}
