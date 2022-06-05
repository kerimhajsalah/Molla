import { Component, OnInit } from '@angular/core';

import { ModalService } from 'src/app/shared/services/modal.service';
import { ApiService } from 'src/app/shared/services/api.service';
import { UtilsService } from 'src/app/shared/services/utils.service';

import { introSlider, brandSlider } from '../data';

@Component({
	selector: 'molla-index',
	templateUrl: './index.component.html',
	styleUrls: ['./index.component.scss']
})

export class IndexComponent implements OnInit {

	products = [];
	posts = [];
	loaded = false;
	introSlider = introSlider;
	brandSlider = brandSlider;

	constructor(public apiService: ApiService, public utilsService: UtilsService, private modalService: ModalService,) {
		this.apiService.getPromotion().subscribe((res : any)=>{
			const now = new Date();
			console.log("reeeeeeeeeeeees",res)
			if((new Date(res[0].startDate)).getTime()< now.getTime() && (new Date(res[0].endDate)).getTime()>now.getTime()){
				// this.exist = true ;
				// this.pourcentage= res[0].Pourcentage
				this.modalService.openNewsletter(res[0].Pourcentage,res[0].startDate.substring(0,10)+" - "+res[0].endDate.substring(0,10));

			}
			else {
			// this.exist = false;
			}
			
		})
		

		this.apiService.fetchHomeData().subscribe(result => {
			this.products = result.products;
			this.posts = result.blogs;
			this.loaded = true;
		})
	}

	ngOnInit(): void {
	}
}
