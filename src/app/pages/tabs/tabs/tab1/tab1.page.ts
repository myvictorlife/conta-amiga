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
  newExpense: Expense;
  travelSelected: any;
  participants: any;
  constructor(
    public router: Router,
    public expensesService: ExpensesService,
    public alertController: AlertController
    ) { }

  ngOnInit() {
    this.getUserInfo();
  }

  async getUserInfo() {
    this.myUser = await this.expensesService.getUserInfo({ loader: [true] });
    this.travels = this.myUser.travels;
    if (this.travels.length === 1) {
      this.selectTravel(this.travels[0]);
    }
  }

  selectTravel(travel) {
    this.newExpense = {} as Expense;
    this.newExpense.title = 'Adicionar titulo';
    this.newExpense.idTravel = travel.id;
    this.newExpense.value = '0,00';
    this.travelSelected = travel;
    this.hideSelectTravel = true;
    this.participants = travel.participants;
    this.newExpense.payingUser = this.myUser.id;
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

  addExpenseValue() {
    this.presentAlertPromptTitle('Total da despesa', 'value');
  }

  async presentAlertPromptTitle(headerName: string, fieldName: string ) {

    const alert = await this.alertController.create({
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

  addPersonToPay(person: any) {
    if (person.isParticipate) {
      delete person.isParticipate;
      delete person.value;
    } else {
      this.presentAlertPromptParticipant(`Valor que o ${person.name} deve pagar:`, person);
    }
  }

  async presentAlertPromptParticipant(headerName: string, participant: any ) {

    const alert = await this.alertController.create({
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
            participant.value = data.title;
            participant.isParticipate = true;
          }
        }
      ]
    });

    await alert.present();
  }

  async createNewExpense() {
    if (!this.newExpense.usersParticipant) {
      this.newExpense.usersParticipant = [];
    }
    this.newExpense.usersParticipant = this.getUserParticipant(this.participants);
    await this.expensesService.createExpense({
      loader: true,
      expense: this.newExpense
    });
  }

  getUserParticipant(participants: any) {
    const usersParticipant = [];
    for(const person of participants) {
      if (person.isParticipate) {
        usersParticipant.push({
          idUser: person.idUser,
          value: person.value
        });
      }
    }
    return usersParticipant;
  }

}
