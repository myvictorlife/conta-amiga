import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuController, ToastController } from '@ionic/angular';
import { AccountService } from 'src/app/services/http-requests/api/account/account.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {

  forgotPasswordForm: FormGroup;

  validation_messages = {
    'email': [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Enter a valid email.' }
    ]
  };

  constructor(
    public router: Router,
    public menu: MenuController,
    private readonly accountService: AccountService,
    public toastController: ToastController
  ) {
    this.forgotPasswordForm = new FormGroup({
      'email': new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ]))
    });
  }

  ngOnInit(): void {
    this.menu.enable(false);
  }

  async recoverPassword() {
    const email = this.forgotPasswordForm.value;
    const response = await this.accountService.recoverPassword({
      email, loader: [true]
    });
    console.log(response);
    this.presentToast();
    this.router.navigate(['']);
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Foi enviado uma nova senha para o seu email.',
      duration: 2000
    });
    toast.present();
  }

}
