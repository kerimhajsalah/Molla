import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { Product } from 'src/app/shared/classes/product';

import { ModalService } from 'src/app/shared/services/modal.service';
import { CartService } from 'src/app/shared/services/cart.service';
import { WishlistService } from 'src/app/shared/services/wishlist.service';
import { CompareService } from 'src/app/shared/services/compare.service';

import { environment } from 'src/environments/environment';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
	selector: 'molla-product-ten',
	templateUrl: './product-ten.component.html',
	styleUrls: ['./product-ten.component.scss']
})

export class ProductTenComponent implements OnInit {

	@Input() product: Product;
	@Input() exist: Boolean;
	@Input() pourcentage: number;
	@Input() date : string;
	maxPrice = 0;
	minPrice = 99999;
	role = false ;
	SERVER_URL = environment.SERVER_URL;
	constructor(
		private router: Router,
		private modalService: ModalService,
		private cartService: CartService,
		private wishlistService: WishlistService,
		private compareService: CompareService,
		private apiService : ApiService
	) { }

	ngOnInit(): void {
		this.role = localStorage.getItem('role') =="admin";
		let min = this.minPrice;
		let max = this.maxPrice;

		// this.product.variants.map(item => {
		// 	if (min > item.price) min = item.price;
		// 	if (max < item.price) max = item.price;
		// }, []);

		// if (this.product.variants.length == 0) {
		// 	min = this.product.sale_price
		// 		? this.product.sale_price
		// 		: this.product.price;
		// 	max = this.product.price;
		// }

		// this.minPrice = min;
		// this.maxPrice = max;
	}

	addToCart(event: Event) {
		event.preventDefault();
		console.log("exist", this.exist , this.pourcentage)
		this.cartService.addToCart(this.product , this.exist , this.pourcentage);
	}

	addToWishlist(event: Event) {
		event.preventDefault();

		if (this.isInWishlist()) {
			this.router.navigate(['/shop/wishlist']);
		} else {
			this.wishlistService.addToWishList(this.product);
		}
	}

	addToCompare(event: Event) {
		event.preventDefault();
		if (this.isInCompare()) return;
		this.compareService.addToCompare(this.product);
	}
	openUpdateProduct(event: Event){
		event.preventDefault();
		this.modalService.showLoginModalAddProduct(this.product);
	}

	quickView(event: Event) {
		event.preventDefault();
		this.modalService.showQuickView(this.product);
	}

	isInCompare() {
		return this.compareService.isInCompare(this.product);
	}

	isInWishlist() {
		return this.wishlistService.isInWishlist(this.product);
	}
}