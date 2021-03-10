import { Component, OnInit } from '@angular/core';
import { AppConstants } from '../../../../constants/app.constants';
import { Router } from '@angular/router';
import { ExpensesService } from 'src/app/services/http-requests/api/expenses/expenses.service';
import { AlertController, ToastController } from '@ionic/angular';
import { TravelService } from 'src/app/services/http-requests/api/travel/travel.service';
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

  public appConstants = AppConstants;
  profile: any;
  constructor(
    public router: Router,
    public expensesService: ExpensesService,
    public alertController: AlertController,
    private travelService: TravelService,
    public toastController: ToastController
  ) {}

  async ngOnInit() {
    this.profile = await this.expensesService.getUserInfo({ loader: [true] });
  }

  logout() {
    localStorage.removeItem(this.appConstants.STORAGE_NAMES.USER_TOKEN);
    this.goToLogin();
  }

  goToLogin() {
    this.router.navigate(['']);
  }

  linkUserATravel() {
    this.presentAlertPrompt();
  }

  async presentAlertPrompt() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Link user a nova viagem',
      inputs: [
        {
          name: 'idTravel',
          type: 'text',
          placeholder: 'Código de Viagem'
        },
        {
          name: 'password',
          type: 'text',
          placeholder: 'Senha da viagem'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: async (data: any) => {
            data.idUser = this.profile.id;
            this.travelService.linkUserATravel({
              loader: true,
              travel: data
            }).then((data: any) => {
              this.presentToast(data.message);
            });
          }
        }
      ]
    });

    await alert.present();
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
    });
    toast.present();
  }

}
