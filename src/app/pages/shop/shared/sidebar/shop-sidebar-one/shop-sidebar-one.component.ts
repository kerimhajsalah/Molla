import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';

import { shopData } from '../../data';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
	selector: 'molla-shop-sidebar-one',
	templateUrl: './shop-sidebar-one.component.html',
	styleUrls: ['./shop-sidebar-one.component.scss']
})

export class ShopSidebarOneComponent implements OnInit {

	@Input() toggle = false;
	shopData = shopData;
	params = {};
	priceRange: any = [0, 100];
	visageSC = ["Soins hydratants et nourrissants","Soins anti-âge et anti-rides","Maquillage","Yeux et lèvres",
    "Démaquillants, nettoyants visage","Soins peau grasse, mixte et acné"];
	cheveuxSC = ["Shampoing","Après-shampooing, soin des cheveux","Soins anti-chute","Kératine",
	"Produits coiffants" ,"Compléments cheveux et ongles"];
	corpsSC = ["Hydratation et nutrition corps","Epilation, dépilation, décoloration","Soins spécifiques","Soins des pieds",
	"Parfum"];
	bbmmSC = ["Puériculture","Toilette & soins bébé","Change de bébé"];
	compAlimSC=["Hydratation et nutrition corps","Epilation, dépilation, décoloration","Soins spécifiques","Soins des pieds",
	"Parfum"];
	HygSC = ["Puériculture","Toilette & soins bébé","Change de bébé"];
	SolaireSC = ["Shampoing","Après-shampooing, soin des cheveux","Soins anti-chute","Kératine",
	"Produits coiffants" ,"Compléments cheveux et ongles"];
	bioNatSC = ["Puériculture","Toilette & soins bébé","Change de bébé"];
	MatMediSC = ["Shampoing","Après-shampooing, soin des cheveux","Soins anti-chute","Kératine",
	"Produits coiffants" ,"Compléments cheveux et ongles"];
	HommeSC = ["Puériculture","Toilette & soins bébé","Change de bébé"];
	@Output() newCategorieEvent = new EventEmitter();
	@ViewChild('priceSlider') priceSlider: any;
	constructor(public activeRoute: ActivatedRoute, public router: Router ) {
		activeRoute.queryParams.subscribe(params => {
			this.params = params;
			if (params['minPrice'] && params['maxPrice']) {
				this.priceRange = [
					params['minPrice'] / 10,
					params['maxPrice'] / 10
				]
			} else {
				this.priceRange = [0, 100];
				
				if(this.priceSlider) {
					this.priceSlider.slider.reset({min: 0, max: 100});
				}
			}
		})
	}

	ngOnInit(): void {
	}

	containsAttrInUrl(type: string, value: string) {
		const currentQueries = this.params[type] ? this.params[type].split(',') : [];
		return currentQueries && currentQueries.includes(value);
	}
	filterBySC(item){
		console.log("eventEmetted");
		this.newCategorieEvent.emit(item);
	}
	getUrlForAttrs(type: string, value: string) {
		let currentQueries = this.params[type] ? this.params[type].split(',') : [];
		currentQueries = this.containsAttrInUrl(type, value) ? currentQueries.filter(item => item !== value) : [...currentQueries, value];
		return currentQueries.join(',');
	}

	onAttrClick(attr: string, value: string) {
		let url = this.getUrlForAttrs(attr, value);
		this.router.navigate([], { queryParams: { [attr]: this.getUrlForAttrs(attr, value), page: 1 }, queryParamsHandling: 'merge' });
	}

	filterPrice() {
		this.router.navigate([], { queryParams: { minPrice: this.priceRange[0] * 10, maxPrice: this.priceRange[1] * 10, page: 1 }, queryParamsHandling: 'merge' });
	}

	changeFilterPrice(value: any) {
		this.priceRange = [value[0], value[1]];
	}
}