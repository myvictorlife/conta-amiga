import { Injectable } from '@angular/core';
import { AlertsService } from 'src/app/services/wrappers/alerts/alerts.service';
import { LoadingService } from 'src/app/services/wrappers/loading/loading.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlingService {

  constructor(
    public alert: AlertsService,
    public loading: LoadingService,
) { }

/**
 * Comment for method ´handleError´.
 * returns an observable error.
 */
public handleErrorCallback = (error: Response, params: any, callback: any) => {
    this.loading.showLoading(false);
    if (error.status === 401) {
      const errorMessage: any = error;
      this.alert.showBasic({
        title: 'Error ' + error.status,
        subTitle: errorMessage.error.mesageError,
        button: {
            text: 'OK',
            callback: () => { },
        },
        enableBackdropDismiss: true,
        error: error,
      });
    }
    return Observable.throw(error);
  }

}
