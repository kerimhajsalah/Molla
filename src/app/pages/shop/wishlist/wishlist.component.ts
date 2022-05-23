import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { WishlistService } from 'src/app/shared/services/wishlist.service';

import { environment } from 'src/environments/environment';

@Component({
	selector: 'shop-wishlist-page',
	templateUrl: './wishlist.component.html',
	styleUrls: ['./wishlist.component.scss']
})

export class WishlistComponent implements OnInit, OnDestroy {

	wishItems = [];
	SERVER_URL = environment.SERVER_URL;

	private subscr: Subscription;

	constructor(public wishlistService: WishlistService) {
	}

	ngOnInit(): void {
		this.subscr = this.wishlistService.wishlistStream.subscribe(items => {
			console.log(items)
			this.wishItems = items.reduce((acc, product) => {
				let max = 0;
				let min = 999999;
				console.log(product)
				items.map(item => {
					if (min > item.price) min = item.price;
					if (max < item.price) max = item.price;
				}, []);
				console.log(product)
			/* 	if (product.variants.length == 0) {
					min = product.sale_price
						? product.sale_price
						: product.price;
					max = product.price;
				} */

				return [
					...acc,
					{
						...product,
						minPrice: min,
						maxPrice: max
					}
				];
			}, []);
		});
		console.log("wedeeishh",this.wishItems)
		setTimeout(() => {
			console.log("wishh",this.wishItems)
		}, 500);
	}

	ngOnDestroy(): void {
		this.subscr.unsubscribe();
	}
}
