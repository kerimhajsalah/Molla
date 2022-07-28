import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from 'src/app/shared/services/api.service';
import { ModalService } from 'src/app/shared/services/modal.service';

@Component({
	selector: 'molla-shop-list-one',
	templateUrl: './shop-list-one.component.html',
	styleUrls: ['./shop-list-one.component.scss']
})

export class ShopListOneComponent implements OnInit {

	@Input() type: string;
	@Input() products = [];
	@Input() loaded = false;
	role : string;

	grid = {
		"2cols": "col-6",
		"3cols": "col-6 col-md-4 col-lg-4",
		"4cols": "col-6 col-md-4 col-lg-4 col-xl-3"
	};
	fakeArray = {
		"list": [1, 2, 3, 4, 5],
		"2cols": [1, 2, 3, 4, 5, 6],
		"3cols": [1, 2, 3, 4, 5, 6, 7, 8, 9],
		"4cols": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
	}
	exist = false;
	pourcentage = 100;
	date='';
	constructor(public modalService: ModalService , private apiService : ApiService) {
	}

	ngOnInit(): void {
		this.apiService.getPromotion().subscribe((res : any)=>{
			const now = new Date();
		
			if((new Date(res[0].startDate)).getTime()< now.getTime() && (new Date(res[0].endDate)).getTime()>now.getTime()){
				this.exist = true ;
				this.pourcentage= res[0].Pourcentage
				this.date="Promotion : "+res[0].startDate.substring(0,10)+" - "+res[0].endDate.substring(0,10);
				console.log("date String",res[0].startDate.substring(0,10)+" - "+res[0].endDate.substring(0,10))
			}
			else {
			this.exist = false;
			}
			
		})
		this.role = localStorage.getItem('role');
		console.log("reeeeeeeeeeeees",this.role)
		console.log("tloadedype",this.loaded)
	}

	showAddProductModal(event: Event): void {
		event.preventDefault();
		this.modalService.showLoginModalAddProduct();
		
	}
	showPromotionModal(event: Event): void {
		event.preventDefault();
		this.modalService.showLoginModalPromotion();
	}
}