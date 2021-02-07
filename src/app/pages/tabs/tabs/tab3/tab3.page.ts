import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

  profile: any;
  constructor() {}

  ngOnInit(): void {
    this.profile = {
      id: 1,
      image: '',
      name: 'Victor César',
      phone: '3434242'
    }
  }

}
