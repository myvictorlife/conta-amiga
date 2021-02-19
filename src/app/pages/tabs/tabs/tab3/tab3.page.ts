import { Component, OnInit } from '@angular/core';
import { AppConstants } from '../../../../constants/app.constants';
import { Router } from '@angular/router';
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

  public appConstants = AppConstants;
  profile: any;
  constructor(public router: Router) {}

  ngOnInit(): void {
    this.profile = {
      id: 1,
      image: '',
      name: 'Victor César',
      phone: '3434242'
    }
  }

  logout() {
    localStorage.removeItem(this.appConstants.STORAGE_NAMES.USER_TOKEN);
    this.goToLogin();
  }

  goToLogin() {
    this.router.navigate(['']);
  }

}
