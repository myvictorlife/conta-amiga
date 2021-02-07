import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertsService {

  public alert: any;

    constructor(
        public alertCtrl: AlertController,
    ) {
        // ionic loading, spinner is a tipe spinner (ios, dots, bubbles, circles, crescent),
    }

    /**
     * Comment for method showBasic.
     * shows a basic alert with the current body
     * @param message
     */
    async showBasic(message?: any) {
      this.alert = await this.alertCtrl.create({
          subHeader: message.title ? message.title : 'Error!',
          message: message.subTitle ? message.subTitle : 'Error as occurred',
          buttons: this.buttonsFactory(message.button),
          backdropDismiss: message.enableBackdropDismiss === null ? true : message.enableBackdropDismiss,
      });
      await this.alert.present();
    }

     /**
     * Comment for method buttonsFactory.
     * Generates the buttons based on type needed
     * @param button
     */
    buttonsFactory(button: any) {
      if (Array.isArray(button)) {
          let buttons = [];
          for (let i = 0; i < button.length; i++) {
              if (button[i].display || !button[i].hasOwnProperty('display')) {
                  buttons.push({
                      text: button[i].text || 'OK',
                      handler: () => {
                          if (button[i].callback) {
                              button[i].callback();
                          }
                      },
                  });
              }
          }
          return buttons;
      } else {
          return [{
              text: button.text || 'OK',
              handler: () => {
                  if (button.callback) {
                      button.callback();
                  }
              },
          }];
      }
  }

}
