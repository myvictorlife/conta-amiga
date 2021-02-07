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

  ngOnInit() {
    const result = this.expensesService.get();
    this.travels = result.data.travels;
  }

  redirectToTravelDetails(travel) {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        travel: JSON.stringify(travel)
      }
    };
    this.router.navigate(['tabs/tab2/travel-details'], navigationExtras);
  }

}
