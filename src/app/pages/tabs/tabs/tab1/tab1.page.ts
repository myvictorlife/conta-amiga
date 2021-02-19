import { Component } from '@angular/core';
import { ExpensesService } from 'src/app/services/http-requests/api/expenses/expenses.service';
import { Router } from '@angular/router';
import { Expense } from 'src/app/interfaces/expense.interface';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  travels: any;
  myUser: any;
  hideSelectTravel = false;
  newExpense = {} as Expense;
  travelSelected: any;
  constructor(
    public router: Router,
    public expensesService: ExpensesService,
    public alertController: AlertController
    ) { }

  ngOnInit() {
    const result = this.expensesService.get();
    this.travels = result.data.travels;
    this.myUser = result.data.user;
    this.getUserInfo();
  }

  async getUserInfo() {
    const user = await this.expensesService.getUserInfo({ loader: [true] });
    console.log(user);
  }

  selectTravel(travel) {
    this.newExpense.title = 'Adicionar titulo';
    this.newExpense.description = 'Adicionar descrição';
    this.newExpense.travel = {
      id: travel.id,
      name: travel.name
    }
    this.travelSelected = travel;
    this.hideSelectTravel = true;
  }

  cleanTravelSelected() {
    this.travelSelected = undefined;
    this.hideSelectTravel = false;
  }

  goToExpenses() {
    this.router.navigate(['expense']);
  }

  addExpenseTitle() {
    this.presentAlertPromptTitle('Nome da Despesa', 'title');
  }

  addExpenseDescription() {
    this.presentAlertPromptTitle('Descrição da Despesa', 'description');
  }

  addPersonToPay() {
    this.newExpense.person_to_pay = [{
      userId: '11',
      name: 'Victor Cesar',
      value: 100,
      payment_type:  "credit-card"
    },{
      userId: '44',
      name: 'Pablo Ribeir',
      value: 100,
      payment_type:  'dinheiro'
    }];
  }

  async presentAlertPromptTitle(headerName: string, fieldName: string ) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: headerName,
      inputs: [
        {
          name: 'title',
          type: 'text',
          placeholder: 'Despesa'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: (data) => {
            console.log(data);
            this.newExpense[fieldName] = data.title;
          }
        }
      ]
    });

    await alert.present();
  }

}
