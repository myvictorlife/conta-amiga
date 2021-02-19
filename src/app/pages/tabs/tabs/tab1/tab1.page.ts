import { Component } from '@angular/core';
import { ExpensesService } from 'src/app/services/http-requests/api/expenses/expenses.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  travels: any;
  myUser: any;
  hideSelectTravel = false;
  travelSelected: any;
  constructor(public expensesService: ExpensesService) { }

  async ngOnInit() {
    const result = await this.expensesService.getUserInfo({ loader: [true] });
    debugger;
    // this.travels = result.data.travels;
    // this.myUser = result.data.user;
  }

  selectTravel(travel) {
    this.travelSelected = travel;
    this.hideSelectTravel = true;
  }

  cleanTravelSelected() {
    this.travelSelected = undefined;
    this.hideSelectTravel = false;
  }

}
