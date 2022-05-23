import { Component, OnInit ,ChangeDetectorRef,ElementRef,ViewChild, Input} from '@angular/core';
import { ConfigServiceService } from 'src/app/config-service.service';
import { ApiService } from 'src/app/shared/services/api.service';
import { FormBuilder, FormArray, Validators } from "@angular/forms";
import{ HttpClient } from '@angular/common/http';
import { UploadClient } from '@uploadcare/upload-client';

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
    picture:""
	}
  file ;
	ngOnInit(): void {
    if(this.product){
      this.addProduct=this.product
      this.update= true;
      this.fileName=this.addProduct.picture

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
      this.client.uploadFile(this.file).then((res)=>{
        this.addProduct.picture= res.cdnUrl;
        console.log("this is the upload result", res);
        console.log("addProduct", this.addProduct);
        this._authUser.updateProduct(this.addProduct,this.product.id).subscribe();
        this.closeModal()
  
      })
    }
    

		// console.log(this.loginUsuer)
		// this._authUser.signIn(this.loginUsuer).subscribe();
	}
  
}
