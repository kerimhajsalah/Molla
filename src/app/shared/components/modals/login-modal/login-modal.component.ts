import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfigServiceService } from 'src/app/config-service.service';
import { ApiService } from 'src/app/shared/services/api.service';
@Component({
	selector: 'molla-login-modal',
	templateUrl: './login-modal.component.html',
	styleUrls: ['./login-modal.component.scss']
})

export class LoginModalComponent implements OnInit {

	constructor(private _auth: ConfigServiceService, private _authUser:ApiService , private router : Router) { }
    registerUser = {
		firstName:"",
		lastName:"",
		age:0,
		titre:"",
		adresse:"",
		city:"",
		country:"",
		codePostal:0,
		email:"",
		password:"",
		status:"admin"
	}
	loginUsuer = {
		email:"",
		password:""
	}
	ngOnInit(): void {
	}

	closeModal() {
		let modal = document.querySelector('.login-modal') as HTMLElement;
		if (modal)
			modal.click();
	}
	createAccount(){
		console.log(this.registerUser)
		this._authUser.signUp(this.registerUser).subscribe((res)=>{
			console.log(res)
		});
	}
	login(){
		console.log(this.loginUsuer)
		this._authUser.signIn(this.loginUsuer).subscribe((res)=>{
			console.log(res);
			localStorage.setItem("token", res.token);
			localStorage.setItem("role" , res.role);
			localStorage.setItem("user" , res.user);
			if (res.token){
				location.reload();
			}
		});
	}
}