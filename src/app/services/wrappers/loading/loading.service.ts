import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';
@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  public loading: any = {};
  public timeout: any = {};

  constructor(
      public loadingCtrl: LoadingController,
  ) {
      // ionic loading, spinner is a type spinner (ios, dots, bubbles, circles, crescent),
      /* tslint:disable:no-string-literal */
      this.loading['loading'] = false;
  }

  /**
   * Comment for method showLoading.
   * show/hide spinner according to the flag
   * shows a message if available
   */
  public async showLoading(flag: boolean, data?: any) {
      data = data || {};
      clearTimeout(this.timeout[data.loadingName || 'loading']);
      // content is a message for show in loading element
      if (flag) {
          if (!this.loading[data.loadingName || 'loading']) {
              this.loading[data.loadingName || 'loading'] = await this.loadingCtrl.create({
                  spinner: 'lines',
                  message: data.message ? data.message : '',
                  cssClass: 'custom-loading'
              });
              await this.loading[data.loadingName || 'loading'].present();
          }
          this.checkLabels(true);
      } else {
          if (this.loading[data.loadingName || 'loading']) {
              // this.timeout[data.loadingName || 'loading'] = setTimeout(async () => {
                  this.checkLabels(false);
                  await this.loading[data.loadingName || 'loading'].dismiss();
                  this.loading[data.loadingName || 'loading'] = false;
              // }, 5);
          }
      }
  }

  public checkLabels(type: boolean) {
      setTimeout(() => {
          const labels = document.querySelectorAll('.empty-label');
          // tslint:disable-next-line:prefer-for-of
          for (let i = 0; i < labels.length; i++) {
              const label: any = labels[i];
              label.hidden = type;
          }
      }, 10);
  }
}
