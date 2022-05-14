import { Component, OnInit } from '@angular/core';
import { ConfigServiceService } from 'src/app/config-service.service';
@Component({
	selector: 'molla-login-modal',
	templateUrl: './login-modal.component.html',
	styleUrls: ['./login-modal.component.scss']
})

export class LoginModalComponent implements OnInit {

	constructor(private _auth: ConfigServiceService) { }
    registerUser = {
		firstname:"",
		lastname:"",
		age:0,
		titre:"",
		address:"",
		city:"",
		country:"",
		codepostal:0,
		email:"",
		password:"",
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
		this._auth.signUp(this.registerUser)
	}
	login(){
		console.log(this.loginUsuer)
		this._auth.signIn(this.login)
	}
}