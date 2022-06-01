import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'molla-promotion',
  templateUrl: './promotion.component.html',
  styleUrls: ['./promotion.component.scss']
})
export class PromotionComponent implements OnInit {
  pourcentage : number;
  startDate : any ;
  endDate : any;
  sentence : String;
  constructor(private promotionService : ApiService ) { }

  async ngOnInit() {
  const res:any = await this.promotionService.getPromotion().toPromise();
      if(res.length>0){
         this.sentence = "votre dernière promotion commence à "+res[0].startDate.substring(0,10) + " et se termine à "+res[0].endDate.substring(0,10) +" et de pourcentage de promotion " + res[0].Pourcentage +"%"
      }
    
  }
	closeModal() {
		let modal = document.querySelector('.login-modal') as HTMLElement;
		if (modal)
			modal.click();
	}

  createPromotion(){
    this.promotionService.createPromotion(this.pourcentage,this.startDate,this.endDate).subscribe();
  }
}
