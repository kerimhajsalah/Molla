import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
	selector: 'molla-shop-list-three',
	templateUrl: './shop-list-three.component.html',
	styleUrls: ['./shop-list-three.component.scss']
})

export class ShopListThreeComponent implements OnInit {

	@Input() type: string;
	@Input() products = [];
	@Input() loaded = true;
	@Input() containerClass = 'container';
	@Input() cols = "col-6 col-md-4 col-lg-4 col-xl-3";
	exist = false;
	pourcentage = 100;
	date =""
	constructor(
		private apiService : ApiService
	) {
	}

	ngOnInit(): void {
		this.apiService.getPromotion().subscribe((res : any)=>{
			const now = new Date();
			console.log("reeeeeeeeeeeees",res)
			if((new Date(res[0].startDate)).getTime()< now.getTime() && (new Date(res[0].endDate)).getTime()>now.getTime()){
				this.exist = true ;
				this.pourcentage= res[0].Pourcentage
				console.log("date String",res[0].startDate.substring(0,10)+" "+res[0].endDate.substring(0,10))
			}
			else {
			this.exist = false;
			}
			
		})
		setTimeout(() => {
			console.log("propppppp", this.products.length)
		}, 500);
		// console.log("products", this.products);
	}
}