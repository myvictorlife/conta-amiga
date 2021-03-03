import { Component, OnInit } from '@angular/core';
import { AppConstants } from '../../../../constants/app.constants';
import { Router } from '@angular/router';
import { ExpensesService } from 'src/app/services/http-requests/api/expenses/expenses.service';
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
    public expensesService: ExpensesService
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

}
