import { Component, OnInit ,ChangeDetectorRef,ElementRef,ViewChild} from '@angular/core';
import { ConfigServiceService } from 'src/app/config-service.service';
import { ApiService } from 'src/app/shared/services/api.service';
import { FormBuilder, FormArray, Validators } from "@angular/forms";
import{ HttpClient } from '@angular/common/http';
@Component({
  selector: 'molla-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.scss']
})
export class AddproductComponent implements OnInit {

	constructor(private _auth: ConfigServiceService, private _authUser:ApiService ,public fb: FormBuilder,
    private cd: ChangeDetectorRef,private http: HttpClient) {
    
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
	ngOnInit(): void {
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

  const file:File = event.target.files[0];

  if (file) {

      this.fileName = file.name;

      const formData = new FormData();

      formData.append("thumbnail", file);

      const upload$ = this.http.post("/api/thumbnail-upload", formData);

      upload$.subscribe();
  }
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
		console.log(this.loginUsuer)
		this._authUser.signIn(this.loginUsuer).subscribe();
	}
  
}
