import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TravelService } from 'src/app/services/http-requests/api/travel/travel.service';
import { ToastController, AlertController } from '@ionic/angular';
@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {

  newTravelForm: FormGroup;
  validation_messages = {
    'title': [
      { type: 'required', message: 'Título is required.' },
    ],
    'description': [
      { type: 'required', message: 'Descrição is required.' }
    ],
    'password': [
      { type: 'required', message: 'Password is required.' },
      { type: 'minlength', message: 'Password must be at least 5 characters long.' }
    ]
  };
  constructor(
    private travelService: TravelService,
    public toastController: ToastController,
    public alertController: AlertController
  ) { }

  ngOnInit() {
    this.newTravelForm = new FormGroup({
      'title': new FormControl('', Validators.compose([
        Validators.required
      ])),
      'description': new FormControl('', Validators.required),
      'startDate': new FormControl('', Validators.required),
      'endDate': new FormControl('', Validators.required),
      'password': new FormControl('', Validators.required),
    });
  }

  createNewTravel() {
    const newTravel = this.newTravelForm.getRawValue();
    newTravel.startDate = newTravel.startDate.slice(0, newTravel.startDate.lastIndexOf("-"));
    newTravel.endDate = newTravel.endDate.slice(0, newTravel.endDate.lastIndexOf("-"));
    this.travelService.createTravel({
      travel: newTravel,
      loader: true
    }).then(() => {
      this.newTravelForm.reset();
      this.presentToast();
    });
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Nova viagem cadastrada com sucesso.',
      duration: 2000
    });
    toast.present();
  }
}
