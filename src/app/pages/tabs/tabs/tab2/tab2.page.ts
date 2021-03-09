import { Component } from '@angular/core';
import { ExpensesService } from 'src/app/services/http-requests/api/expenses/expenses.service';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  travels: any;
  constructor(
    public expensesService: ExpensesService,
    private router: Router
  ) { }

  async ngOnInit() {
    this.travels = await this.expensesService.getTravels({
      loader: true
    });
  }

  redirectToTravelDetails(travel) {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        travel: JSON.stringify(travel)
      }
    };
    this.router.navigate(['tabs/tab2/travel-details'], navigationExtras);
  }

  createTravel() {
    this.router.navigate(['travels/add']);
  }

}
