import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TravelService } from 'src/app/services/http-requests/api/travel/travel.service';

@Component({
  selector: 'app-travel-details',
  templateUrl: './travel-details.page.html',
  styleUrls: ['./travel-details.page.scss'],
})
export class TravelDetailsPage implements OnInit {

  travel: any;
  constructor(
    private route: ActivatedRoute,
    private travelService: TravelService
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params && params.travelId) {
        const travelId = params.travelId;
        this.getTravelById(travelId);
      }
    });
  }

  async getTravelById(travelId: string) {
    this.travel = await this.travelService.getTravelById({
      loader: true,
      travelId
    });
  }

}
