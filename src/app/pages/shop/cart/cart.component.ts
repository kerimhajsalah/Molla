import { Store } from '@ngrx/store';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { CartService } from 'src/app/shared/services/cart.service';

import { environment } from 'src/environments/environment';
import { ApiService } from 'src/app/shared/services/api.service';
import { ModalService } from 'src/app/shared/services/modal.service';

@Component({
	selector: 'shop-cart-page',
	templateUrl: './cart.component.html',
	styleUrls: ['./cart.component.scss']
})

export class CartComponent implements OnInit, OnDestroy {

	cartItems = [];
	SERVER_URL = environment.SERVER_URL;
	shippingCost = 0;
	commande = {
		firstName :"",
		lastName :"",
		phone : "",
		address:""
	}

	private subscr: Subscription;
	exist = false;
	pourcentage;
	constructor(private store: Store<any>,public modalService: ModalService, public cartService: CartService , private apiService : ApiService) {
	}

	ngOnInit() {
		this.subscr = this.cartService.cartStream.subscribe(items => {
			this.cartItems = items;
		});
		this.apiService.getPromotion().subscribe((res : any)=>{
			const now = new Date();
			if((new Date(res[0].startDate)).getTime()< now.getTime() && (new Date(res[0].endDate)).getTime()>now.getTime()){
				this.exist = true ;
				this.pourcentage= res[0].Pourcentage

			}
			else {
			// this.exist = false;
			}
			
		})
		console.log("eee",this.cartItems)
	}

	ngOnDestroy() {
		this.subscr.unsubscribe();
	}

	trackByFn(index: number, item: any) {
		if (!item) return null;
		return item.slug;
	}

	updateCart(event: any) {
		// event.preventDefault();
		// event.target.parentElement.querySelector('.icon-refresh').classList.add('load-more-rotating');

		setTimeout(() => {
			this.cartService.updateCart(this.cartItems);
			// event.target.parentElement.querySelector('.icon-refresh').classList.remove('load-more-rotating');
			// document.querySelector('.btn-cart-update:not(.diabled)') && document.querySelector('.btn-cart-update').classList.add('disabled');
		}, 400);
	}

	changeShipping(value: number) {
		this.shippingCost = value;
	}
	validateCommande(event: Event){

		console.log("commande created", this.commande , this.cartItems);
		this.apiService.createCommande(this.commande,this.cartItems).subscribe((res=>{
			this.showPromotionModal(event);
		}));
	}

	onChangeQty(event: number, product: any) {
		document.querySelector('.btn-cart-update.disabled') && document.querySelector('.btn-cart-update.disabled').classList.remove('disabled');

		this.cartItems = this.cartItems.reduce((acc, cur) => {
			if (cur.name === product.name) {
				acc.push({
					...cur,
					qty: event,
					sum: (this.exist ? cur.price - cur.price*this.pourcentage/100 : cur.price) * event
				});
			}
			else acc.push(cur);

			return acc;
		}, [])
		this.updateCart(event)
	}
	showPromotionModal(event: Event): void {
		event.preventDefault();
		this.modalService.showModalFacture(this.cartItems , this.commande , this.exist , this.pourcentage);
	}
}