import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { Product } from 'src/app/shared/classes/product';

import { ModalService } from 'src/app/shared/services/modal.service';
import { CartService } from 'src/app/shared/services/cart.service';
import { WishlistService } from 'src/app/shared/services/wishlist.service';
import { CompareService } from 'src/app/shared/services/compare.service';

import { environment } from 'src/environments/environment';

@Component({
	selector: 'molla-product-nine',
	templateUrl: './product-nine.component.html',
	styleUrls: ['./product-nine.component.scss']
})

export class ProductNineComponent implements OnInit {

	@Input() product: Product;

	maxPrice = 0;
	minPrice = 99999;

	SERVER_URL = environment.SERVER_URL;

	constructor(
		private router: Router,
		private modalService: ModalService,
		private cartService: CartService,
		private wishlistService: WishlistService,
		private compareService: CompareService
	) { }

	ngOnInit(): void {
		let min = this.minPrice;
		let max = this.maxPrice;
console.log("tttdttdd",this.product)
		this.product
			if (min > this.product.price) min = this.product.price;
			if (max < this.product.price) max = this.product.price;
		

		if (this.product) {
			min = this.product.price
				? this.product.price
				: this.product.price;
			max = this.product.price;
		}

		this.minPrice = min;
		this.maxPrice = max;
	}

	addToCart(event: Event) {
		event.preventDefault();
		this.cartService.addToCart(this.product);
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