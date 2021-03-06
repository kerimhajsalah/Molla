import { Component, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { matchSorter } from 'match-sorter';
import { ApiService } from 'src/app/shared/services/api.service';
import { UtilsService } from 'src/app/shared/services/utils.service';

@Component({
	selector: 'shop-sidebar-page',
	templateUrl: './sidebar.component.html',
	styleUrls: ['./sidebar.component.scss'],
})

export class SidebarPageComponent implements OnInit {
	products = [];
	products2 = [];
	perPage = 12;
	type = 'list';
	totalCount = 0;
	orderBy = 'default';
	pageTitle = 'List';
	toggle = false;
	searchTerm = '';
	loaded = false;
	firstLoad = false;
	allProducts=[];
	searchInput="";
	constructor(public activeRoute: ActivatedRoute, public router: Router, public utilsService: UtilsService, public apiService: ApiService) {
		this.activeRoute.params.subscribe(params => {
			this.type = params['type'];
console.log("tyyyyy",this.type)
			if (this.type == 'list') {
				this.pageTitle = 'List';
			} else if (this.type == '2cols') {
				this.pageTitle = 'Grid 2 Columns';
			} else if (this.type == '3cols') {
				this.pageTitle = 'Grid 3 Columns';
			} else if (this.type == '4cols') {
				this.pageTitle = 'Grid 4 Columns';
			}
		});
		
		this.activeRoute.queryParams.subscribe(params => {
			this.loaded = false;

			if (params['searchTerm']) {
				this.searchTerm = params['searchTerm'];
			} else {
				this.searchTerm = '';
			}

			if (params['orderBy']) {
				this.orderBy = params['orderBy'];
			} else {
				this.orderBy = 'default';
			}
			console.log("this.products",this.products)
			this.apiService.fetchShopData(params, this.perPage).subscribe(result => {
				console.log("pppp",this.products)
				console.log("result",result)
			
				this.products = result;
				this.allProducts = result;
				this.totalCount = 5000;

				this.loaded = true;
				if (!this.firstLoad) {
					this.firstLoad = true;
				}

				this.utilsService.scrollToPageContent();
			})
		})
	}

	ngOnInit(): void {
		if (window.innerWidth > 991) this.toggle = false
		else this.toggle = true;
	}

	@HostListener('window: resize', ['$event'])
	onResize(event: Event) {
		if (window.innerWidth > 991) this.toggle = false;
		else this.toggle = true;
	}
	updateProducts($event){
		console.log("eventhhhhhhhhhhh", $event)
		/*  =[this.products[1]]; */
		this.products.map((res)=>{
			if(res.categorie==$event||res.SC==$event){
				this.products2.push(res)
	}
		})
		this.products=this.products2
	}
	changeOrderBy(event: any) {
		console.log('eeee',event)
		this.router.navigate([], { queryParams: { orderBy: event.currentTarget.value, page: 1 }, queryParamsHandling: 'merge' });
	}

	toggleSidebar() {
		if (document.querySelector('body').classList.contains('sidebar-filter-active'))
			document.querySelector('body').classList.remove('sidebar-filter-active');
		else
			document.querySelector('body').classList.add('sidebar-filter-active');
	}

	hideSidebar() {
		document.querySelector('body').classList.remove('sidebar-filter-active');
	}
	search($event){
		// console.log("hahahaah", this.searchInput);
		if(this.searchInput !=""){
			const found=  matchSorter(this.products, this.searchInput, {keys: ['name']})
			console.log("eventttt",found)
		
			  if(found.length>0){
				this.products= found;
			  }
			  else{
				this.products=this.allProducts
			  }
		  }
		  else{
			this.products=this.allProducts
		  }
	}
}