import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'molla-commande-products',
  templateUrl: './commande-products.component.html',
  styleUrls: ['./commande-products.component.scss']
})
export class CommandeProductsComponent implements OnInit {
 
  @Input() commandeId : number;
  products ;
  constructor( private apiService : ApiService) { }

  ngOnInit(): void {
    this.apiService.getProductsByCommande(this.commandeId).subscribe((res : any)=>{
    this.products=res.products;
      console.log("reeees",res);
    })
  }
	closeModal() {
		let modal = document.querySelector('.login-modal') as HTMLElement;
		if (modal)
			modal.click();
	}
}
