import { Injectable } from '@angular/core';
import * as Expenses from '../../mocks/expenses.mock';
@Injectable({
  providedIn: 'root'
})
export class ExpensesService {

  constructor() { }

  get() {
    return Expenses.default;
  }
}
