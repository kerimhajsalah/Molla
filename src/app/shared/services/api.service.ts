import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root'
})

export class ApiService {

	constructor(private http: HttpClient) {
	}

	/**
	 * Get Products
	 */
	public signUp(user) : Observable<any>{
		console.log("usesssr",user) 
	 return this.http.post<any>("http://localhost:3000/users/" , user);
	 }
	 public getUser(user) : Observable<any>{
		console.log("user",user) 
	 return this.http.get<any>(`http://localhost:3000/users/${user}` );
	 }
	public signIn(user): Observable<any> {
		console.log("catched")
	return this.http.post("http://localhost:3000/users/signIn", user);
	}
	public fetchShopData(params: any, perPage: number, initial = 'shop'): Observable<any> {
		let temp = initial;
		if (!initial.includes('?')) {
			temp += '?';
		}

		for (let key in params) {
			temp += key + '=' + params[key] + '&';
		}

		if (!params.page) {
			temp += 'page=1';
		}

		if (!params.perPage) {
			temp += '&perPage=' + perPage;
		}

		temp += '&demo=' + environment.demo;

		return this.http.get(`${environment.SERVER_URL}/products`);
	}
	public addProduct(product){
		return this.http.post(`${environment.SERVER_URL}/products`, product);
	}
	public updateProduct(product,id){
		return this.http.put(`${environment.SERVER_URL}/products/${id}`, product);
	}
	public createCommande(commande , products){
		return this.http.post(`${environment.SERVER_URL}/commandes`, {commande,products});
	}
	public createPromotion (Pourcentage , startDate , endDate){
		return this.http.post(`${environment.SERVER_URL}/promotion`, {Pourcentage,startDate,endDate});
	}
	public getPromotion(){
		return this.http.get(`${environment.SERVER_URL}/promotion`);
	}
	public getCommandes(){
		return this.http.get(`${environment.SERVER_URL}/commandes`);
	}
	public getProductsByCommande(id){
		return this.http.get(`${environment.SERVER_URL}/commandes/${id}`);
	}
	public validateCommande(id){
		return this.http.put(`${environment.SERVER_URL}/commandes/validate`,{id});
	}
	public refuseCommande(id){
		return this.http.put(`${environment.SERVER_URL}/commandes/annuler`,{id});
	}
	/**
	 * Get Products
	 */
	public fetchBlogData(params: any, initial = 'blogs/classic', perPage: number,): Observable<any> {
		let temp = initial;
		if (!initial.includes('?')) {
			temp += '?';
		}

		for (let key in params) {
			temp += key + '=' + params[key] + '&';
		}

		if (!params.page) {
			temp += 'page=1';
		}

		if (!params.perPage) {
			temp += '&perPage=' + perPage;
		}

		return this.http.get(`${environment.SERVER_URL}/${temp}`);
	}

	/**
	 * Get Products
	 */
	public fetchSinglePost(slug: string): Observable<any> {
		return this.http.get(`${environment.SERVER_URL}/${'single/' + slug + '?demo=' + environment.demo}`);
	}

	/**
	 * Get Products for home page
	 */
	public fetchHomeData(): Observable<any> {
		return this.http.get(`${environment.SERVER_URL}/${environment.demo}`);
	}

	/**
	 * Get products by demo
	 */
	public getSingleProduct(id: string, isQuickView = false): Observable<any> {
		return this.http.get(`${environment.SERVER_URL}/products/${id}`);
	}

	/**
	 * Get Products
	 */
	public fetchHeaderSearchData(searchTerm: string, cat = null): Observable<any> {
		return this.http.get(`${environment.SERVER_URL}/shop?perPage=5&searchTerm=${searchTerm}&category=${cat}&demo=${environment.demo}`);
	}

	/**
	 * Get Element Products
	 */
	public fetchElementData(): Observable<any> {
		return this.http.get(`${environment.SERVER_URL}/elements/products`);
	}

	/**
	 * Get Element Blog
	 */
	public fetchElementBlog(): Observable<any> {
		return this.http.get(`${environment.SERVER_URL}/elements/blogs`);
	}
}