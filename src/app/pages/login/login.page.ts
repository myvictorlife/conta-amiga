import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { AuthService } from 'src/app/services/http-requests/api/auth/auth.service';
import { AppConstants } from '../../constants/app.constants';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  
  public appConstants = AppConstants;
  loginForm: FormGroup;

  validation_messages = {
    'email': [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Enter a valid email.' }
    ],
    'password': [
      { type: 'required', message: 'Password is required.' },
      { type: 'minlength', message: 'Password must be at least 5 characters long.' }
    ]
  };

  constructor(
    public router: Router,
    public menu: MenuController,
    private authService: AuthService
  ) {
    this.loginForm = new FormGroup({
      'email': new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      'password': new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required
      ]))
    });
  }

  ngOnInit(): void {
    this.menu.enable(false);
    const token = localStorage.getItem(this.appConstants.STORAGE_NAMES.USER_TOKEN);
    if (token) {
      this.goToHome();
    }
  }

  async doLogin() {
    const user = this.loginForm.getRawValue();
    try {
      const response = await this.authService.postLogin({
        loader: [true],
        user
      });
      localStorage.setItem(this.appConstants.STORAGE_NAMES.USER_TOKEN, response.data.dsToken);
      this.goToHome();
    } catch (e) {
      console.warn('LoginPage (login): ', e);
    }
  }

  goToHome() {
    this.router.navigate(['tabs']);
  }

  goToForgotPassword(): void {
    console.log('redirect to forgot-password page');
    this.router.navigate(['forgot-password']);
  }

}
