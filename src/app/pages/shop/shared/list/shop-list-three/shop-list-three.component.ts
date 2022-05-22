import { Component, OnInit, Input } from '@angular/core';

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

	constructor() {
	}

	ngOnInit(): void {
		setTimeout(() => {
			console.log("propppppp", this.products)
		}, 500);
		// console.log("products", this.products);
	}
}