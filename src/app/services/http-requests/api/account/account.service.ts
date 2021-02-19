import { Injectable } from '@angular/core';
import { HttpClientService } from '../../../wrappers/http-client/http-client.service';
import { AppConstants } from '../../../../constants/app.constants';
import { LoadingService } from '../../../wrappers/loading/loading.service';
import { ErrorHandlingService } from '../../error/error-handling/error-handling.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

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

  async createUser(params: { user: any, loader?: any }) {
    this.loading.showLoading(params.loader[0], params.loader[1]);
    let data: any = null;
    try {
        const body = params.user;
        data = await this.http.post(AppConstants.API_ENDPOINTS.CREATE_USER, body);
    } catch (error) {
        console.warn('AccountService - createUser: ', error);
        data = this.handleError(error, params.loader[0]);
        debugger;
        this.loading.showLoading(false);
    } finally {
        this.loading.showLoading(false);
    }
    return data;
  }
}