import { Component, OnInit, Input, Output , EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { UtilsService } from 'src/app/shared/services/utils.service';
import { ModalService } from 'src/app/shared/services/modal.service';

@Component({
	selector: 'molla-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {

	@Input() containerClass = "container";
	searchInput;
	wishCount = 0;
    roleUser :String="";
	roleBoolean:Boolean=false;
	constructor(public activeRoute: ActivatedRoute, public utilsService: UtilsService, public modalService: ModalService) {
	}

	ngOnInit(): void {
		this.roleUser=localStorage.getItem('role')
		if(this.roleUser!=null){
			this.roleBoolean=true
		}
		console.log("localStorage.getItem('role')",this.roleUser)
	}

	showLoginModal(event: Event): void {
		event.preventDefault();
		this.modalService.showLoginModal();
	}
	logout(){
		localStorage.removeItem("token");
		localStorage.removeItem("role");
		localStorage.removeItem("user");
		setTimeout(() => {
			location.reload();
		}, 300);	
	}

}
