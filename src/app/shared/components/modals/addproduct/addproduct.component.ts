import { Component, OnInit ,ChangeDetectorRef,ElementRef,ViewChild, Input} from '@angular/core';
import { ConfigServiceService } from 'src/app/config-service.service';
import { ApiService } from 'src/app/shared/services/api.service';
import { FormBuilder, FormArray, Validators } from "@angular/forms";
import{ HttpClient } from '@angular/common/http';
import { UploadClient } from '@uploadcare/upload-client';
declare var $: any;

@Component({
  selector: 'molla-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.scss']
})
export class AddproductComponent implements OnInit {
  client = new UploadClient({ publicKey: '8984836541096889c993' })
  @Input() public product;
  update = false ;
	constructor(private _auth: ConfigServiceService, private _authUser:ApiService ,public fb: FormBuilder,
    private cd: ChangeDetectorRef,private http: HttpClient ) {
    
   }
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
  addProduct = {
		name:"",
		description:"",
    price : 0,
    qty : 0,
    picture:"",
    categorie:"",
    SC:""
	}
  file ;
  SousCategories=[];
	ngOnInit(): void {
    if(this.product){
      this.addProduct=this.product
      this.update= true;
      this.fileName=this.addProduct.picture;

      console.log("addProductCategorie", this.product);
      this.selectCategoryOnInit(this.addProduct.categorie);
      // this.selectSCOnInt(this.addProduct.SC)
      console.log("sousCategorie",this.SousCategories);
    }
	}
 /*##################### Registration Form #####################*/
 registrationForm = this.fb.group({
  file: [null]
})  

/*########################## File Upload ########################*/
@ViewChild('fileInput') el: ElementRef;
imageUrl: any = 'https://i.pinimg.com/236x/d6/27/d9/d627d9cda385317de4812a4f7bd922e9--man--iron-man.jpg';
editFile: boolean = true;
removeUpload: boolean = false;
fileName=""
onFileSelected(event) {

  this.file = event.target.files[0];
  this.client.uploadFile(this.file).then((res)=>{
    this.addProduct.picture= res.cdnUrl;
    this.fileName=res.name
   console.log(res)

  })
}
selectCategory(event){
 var res = $(event.target).val();
 this.addProduct.categorie=res;
switch (res) {
  case 'Visage':
    this.SousCategories=["Soins hydratants et nourrissants","Soins anti-âge et anti-rides","Maquillage","Yeux et lèvres",
    "Démaquillants, nettoyants visage","Soins peau grasse, mixte et acné"]
    break;
  case 'Cheveux':
      this.SousCategories=["Shampoing","Après-shampooing, soin des cheveux","Soins anti-chute","Kératine",
      "Produits coiffants" ,"Compléments cheveux et ongles"]
      break;
  case 'Corps':
    this.SousCategories=["Hydratation et nutrition corps","Epilation, dépilation, décoloration","Soins spécifiques","Soins des pieds",
      "Parfum"]
    break;
  case 'Bébé et maman':
    this.SousCategories=["Puériculture","Toilette & soins bébé","Change de bébé"]
    break;
  case 'Compléments alimentaire':
    this.SousCategories=["Hydratation et nutrition corps","Epilation, dépilation, décoloration","Soins spécifiques","Soins des pieds",
        "Parfum"]
    break;
  case 'Hygiene':
    this.SousCategories=["Puériculture","Toilette & soins bébé","Change de bébé"]
    break;
  case 'Solaire':
      this.SousCategories=["Shampoing","Après-shampooing, soin des cheveux","Soins anti-chute","Kératine",
      "Produits coiffants" ,"Compléments cheveux et ongles"]
      break;
  case 'Bio et naturel':
        this.SousCategories=["Puériculture","Toilette & soins bébé","Change de bébé"]
        break;
  case 'Matériel Medical':
          this.SousCategories=["Shampoing","Après-shampooing, soin des cheveux","Soins anti-chute","Kératine",
          "Produits coiffants" ,"Compléments cheveux et ongles"]
          break;
  default:
    this.SousCategories=["Puériculture","Toilette & soins bébé","Change de bébé"]
    break;
}

}
selectCategoryOnInit(value){
 switch (value) {
   case 'Visage':
     this.SousCategories=["Soins hydratants et nourrissants","Soins anti-âge et anti-rides","Maquillage","Yeux et lèvres",
     "Démaquillants, nettoyants visage","Soins peau grasse, mixte et acné"]
     break;
   case 'Cheveux':
       this.SousCategories=["Shampoing","Après-shampooing, soin des cheveux","Soins anti-chute","Kératine",
       "Produits coiffants" ,"Compléments cheveux et ongles"]
       break;
   case 'Corps':
     this.SousCategories=["Hydratation et nutrition corps","Epilation, dépilation, décoloration","Soins spécifiques","Soins des pieds",
       "Parfum"]
     break;
   case 'Bébé et maman':
     this.SousCategories=["Puériculture","Toilette & soins bébé","Change de bébé"]
     break;
   case 'Compléments alimentaire':
     this.SousCategories=["Hydratation et nutrition corps","Epilation, dépilation, décoloration","Soins spécifiques","Soins des pieds",
         "Parfum"]
     break;
   case 'Hygiene':
     this.SousCategories=["Puériculture","Toilette & soins bébé","Change de bébé"]
     break;
   case 'Solaire':
       this.SousCategories=["Shampoing","Après-shampooing, soin des cheveux","Soins anti-chute","Kératine",
       "Produits coiffants" ,"Compléments cheveux et ongles"]
       break;
   case 'Bio et naturel':
         this.SousCategories=["Puériculture","Toilette & soins bébé","Change de bébé"]
         break;
   case 'Matériel Medical':
           this.SousCategories=["Shampoing","Après-shampooing, soin des cheveux","Soins anti-chute","Kératine",
           "Produits coiffants" ,"Compléments cheveux et ongles"]
           break;
   default:
     this.SousCategories=["Puériculture","Toilette & soins bébé","Change de bébé"]
     break;
 }
 
 }
selectSC(event){
  var selectCategory = $(event.target).val();
  this.addProduct.SC=selectCategory;
  console.log("eveeeebr",selectCategory);
}
selectSCOnInt(value){

  this.addProduct.SC=value;
  console.log("eveeeebr",value);
}
uploadFile(event) {
  let reader = new FileReader(); // HTML5 FileReader API
  let file = event.target.files[0];
  if (event.target.files && event.target.files[0]) {
    reader.readAsDataURL(file);

    // When file uploads set it to file formcontrol
    reader.onload = () => {
      this.imageUrl = reader.result;
      this.registrationForm.patchValue({
        file: reader.result
      });
      this.editFile = false;
      this.removeUpload = true;
    }
    // ChangeDetectorRef since file is loading outside the zone
    this.cd.markForCheck();        
  }
}

// Function to remove uploaded file
removeUploadedFile() {
  let newFileList = Array.from(this.el.nativeElement.files);
  this.imageUrl = 'https://i.pinimg.com/236x/d6/27/d9/d627d9cda385317de4812a4f7bd922e9--man--iron-man.jpg';
  this.editFile = true;
  this.removeUpload = false;
  this.registrationForm.patchValue({
    file: [null]
  });
}

// Submit Registration Form
 onSubmit() {
  /* this.submitted = true; */
  if(!this.registrationForm.valid) {
    alert('Please fill all the required fields to create a super hero!')
    return false;
  } else {
    console.log(this.registrationForm.value)
    return true
  }
}

	closeModal() {
    console.log("eee111",)
    this.addProduct=this.product;
		let modal = document.querySelector('.login-modal') as HTMLElement;
    console.log("eee111",modal)
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
    if(!this.product){
      this.client.uploadFile(this.file).then((res)=>{
        this.addProduct.picture= res.cdnUrl;
        console.log("this is the upload result", res);
        console.log("addProduct", this.addProduct);
        this._authUser.addProduct(this.addProduct).subscribe();
        this.closeModal()
  
      })
    }
    else {
      // this.client.uploadFile(this.file).then((res)=>{
        // this.addProduct.picture= res.cdnUrl;
        console.log("addProduct", this.addProduct);
        this._authUser.updateProduct(this.addProduct,this.product.id).subscribe();
        this.closeModal()
  
      // })
    }
    

		// console.log(this.loginUsuer)
		// this._authUser.signIn(this.loginUsuer).subscribe();
	}
  
}
