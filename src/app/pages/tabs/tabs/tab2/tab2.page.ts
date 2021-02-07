import { Component } from '@angular/core';
import { ExpensesService } from 'src/app/services/http-requests/api/expenses/expenses.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  travels: any;
  constructor(public expensesService: ExpensesService) { }

  ngOnInit() {
    const result = this.expensesService.get();
    this.travels = result.data.travels;
  }

}
