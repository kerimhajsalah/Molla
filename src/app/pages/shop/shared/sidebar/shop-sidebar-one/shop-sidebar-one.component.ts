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
	visageSC = ["Lait","Lotion","Gel lavant","Eau micellaire","Eaux thermalese","Mousse nettoyant","Masque visage","Gommage visage"];
	cheveuxSC = ["Masque visage hydratant",
	"Hydratant peaux sèches",
	"Hydratant peaux normale a mixte",
	"Hydratant peaux grasse",
   "Hydratant peaux intolérant",
	"Hydratant peaux atopiques"];
	corpsSC = ["Soin anti rides",
	"Premières rides",
	"Rides installées",
	"Rides marquées, perte de fermeté",
	"Soins anti rides peau sèche",
	"Soin anti rides peau grasse",
	"Soin liftant"];
	bbmmSC = ["Nettoyage et purifiant",
	"Lotion",
   "Crèmes et soin traitant",
	 "Traitant matin et soir",
	 "Soins specifique",
	  "Soin teinte",
	 "Soin a imperfections"];
	compAlimSC=["Nettoyant pour peau sensible",
	"Masques apaisants",
	"Lotion apaisante",
	"Crèmes peau sensibles, anti rougeurs"];
	HygSC = ["Eclat du teint",
	"BB crème",
	"CC crème",
	"Eclat du teint et anti fatigue"];
	SolaireSC = ["Soin anti poches et cernes",
	"Contour des yeux",
	"Démaquillant yeux",
	"Anti âge yeux"];
	bioNatSC = ["Hydratation et réparation lèvres",
	"Stick solaire"];
	MatMediSC = ["Hydratation et fermete corps",
	"Vergeture",
	"Massage et bien etre",
	"Soins des pieds",
	"Soins des mains Soins des ongles"];
	HommeSC = ["Le bain",
	"Le change",
	"La toilette",
	"Le bienêtre",
	"Soins troubles cutanées"];
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
		console.log("eventEmetted",item);
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