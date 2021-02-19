import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController, MenuController } from '@ionic/angular';
import { PasswordValidator } from '../validators/password.validator';
import { AccountService } from 'src/app/services/http-requests/api/account/account.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  signupForm: FormGroup;
  matching_passwords_group: FormGroup;

  validation_messages = {
    'email': [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Enter a valid email.' }
    ],
    'name': [
      { type: 'required', message: 'Name is required.' }
    ],
    'phone': [
      { type: 'required', message: 'Phone is required.' }
    ],
    'password': [
      { type: 'required', message: 'Password is required.' },
      { type: 'minlength', message: 'Password must be at least 5 characters long.' }
    ],
    'confirm_password': [
      { type: 'required', message: 'Confirm password is required' }
    ],
    'matching_passwords': [
      { type: 'areNotEqual', message: 'Password mismatch' }
    ]
  };

  constructor(
    public router: Router,
    public modalController: ModalController,
    public menu: MenuController,
    private accountService: AccountService
  ) {
    this.matching_passwords_group = new FormGroup({
      'password': new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required
      ])),
      'confirm_password': new FormControl('', Validators.required)
    }, (formGroup: FormGroup) => {
      return PasswordValidator.areNotEqual(formGroup);
    });

    this.signupForm = new FormGroup({
      'email': new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      'name': new FormControl('', Validators.required),
      'phone': new FormControl('', Validators.required),
      'matching_passwords': this.matching_passwords_group
    });
  }

  ngOnInit(): void {
    this.menu.enable(false);
  }

  async doSignup() {
    const user = this.signupForm.getRawValue();
    user.password = user.matching_passwords.password;
    delete user.matching_passwords;
    try {
      const response = await this.accountService.createUser({
        loader: [true],
        user
      });
      this.goToLogin();
    } catch (e) {
      console.warn('LoginPage (login): ', e);
    }
  }

  goToLogin() {
    this.router.navigate(['']);
  }

}
