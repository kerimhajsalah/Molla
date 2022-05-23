import { Component, OnInit, ElementRef, Renderer2 } from '@angular/core';
import { ApiService } from 'src/app/shared/services/api.service';
@Component({
	selector: 'shop-dashboard-page',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.scss'],
})

export class DashboardComponent implements OnInit {

	constructor(private el: ElementRef, private renderer: Renderer2,private _auth :ApiService) {
	}
   idUser;
  
	   firstName ="";
	   lastName="";
	   email="";
  
	ngOnInit(): void {
		console.log(localStorage.getItem('user'));
             this.idUser=localStorage.getItem('user');
			 console.log("this.idUser",this.idUser);
		this._auth.getUser(this.idUser).subscribe((res)=>{
			console.log("ee",res)
			this.firstName=res.user.firstName
			this.lastName=res.user.lastName
			this.email=res.user.email
			console.log("this.dataUser",this.firstName,this.lastName)
		})
	}

	viewTab($event: Event, prevId: number, nextId: number) {
		$event.preventDefault();
		let nodes = this.el.nativeElement.querySelectorAll(".nav-dashboard .nav-link");
		this.renderer.removeClass(nodes[prevId], 'active');
		this.renderer.addClass(nodes[nextId], 'active');
	}
	logOut(){
		localStorage.removeItem("token");
			localStorage.removeItem("role");
			localStorage.removeItem("user");
			setTimeout(() => {
				location.reload();
			}, 300);
		
	}
}
