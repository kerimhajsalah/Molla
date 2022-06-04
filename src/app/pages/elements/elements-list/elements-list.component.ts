import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/shared/services/api.service';
import { ModalService } from 'src/app/shared/services/modal.service';

@Component({
	selector: 'elements-list-page',
	templateUrl: './elements-list.component.html',
	styleUrls: ['./elements-list.component.scss']
})

export class ElementsListPageComponent implements OnInit {
	listCommandes ; 
	constructor( private commadeService : ApiService , private modalService : ModalService) { }

	async ngOnInit() {
	 this.listCommandes = await this.commadeService.getCommandes().toPromise();
	console.log("listCommandes", this.listCommandes);
	}
	
	openModal(id){
		this.modalService.showCommandeProductsComponent(id);
	}
	validate(id){
		this.commadeService.validateCommande(id).subscribe((res)=>{
			this.ngOnInit();
		});
	}
	refuse(id){
		this.commadeService.refuseCommande(id).subscribe((res)=>{
			this.ngOnInit();
		});
	}
}
