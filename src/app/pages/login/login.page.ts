import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { AuthService } from 'src/app/services/http-requests/api/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

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
      'email': new FormControl('test@test.com', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      'password': new FormControl('123456', Validators.compose([
        Validators.minLength(5),
        Validators.required
      ]))
    });
  }

  ngOnInit(): void {
    this.menu.enable(false);
  }

  async doLogin() {
    const user = this.loginForm.getRawValue();
    try {
      const response = await this.authService.postLogin({
        loader: [true],
        user
      });
      console.log(response);
      this.router.navigate(['tabs']);
      // this.tokenStorageService.set(token);
    } catch (e) {
      console.warn('LoginPage (login): ', e);
    }
  }

  goToForgotPassword(): void {
    console.log('redirect to forgot-password page');
    this.router.navigate(['forgot-password']);
  }

}
