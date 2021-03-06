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
    SC:"" ,
    checked:false
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
  case 'Nettoyant et d??maquillant':
    this.SousCategories=["Lait","Lotion","Gel lavant","Eau micellaire","Eaux thermalese","Mousse nettoyant","Masque visage","Gommage visage"]
    break;
  case 'Cheveux':
      this.SousCategories=["Masque visage hydratant",
        "Hydratant peaux s??ches",
        "Hydratant peaux normale a mixte",
        "Hydratant peaux grasse",
       "Hydratant peaux intol??rant",
        "Hydratant peaux atopiques"]
      break;
  case 'Soin anti ??ge et anti rides':
    this.SousCategories=["Soin anti rides",
      "Premi??res rides",
      "Rides install??es",
      "Rides marqu??es, perte de fermet??",
      "Soins anti rides peau s??che",
      "Soin anti rides peau grasse",
      "Soin liftant"]
    break;
  case 'Soin peau grasse, mixte et acn??iques et imperfection':
    this.SousCategories=["Nettoyage et purifiant",
     "Lotion",
    "Cr??mes et soin traitant",
      "Traitant matin et soir",
      "Soins specifique",
       "Soin teinte",
      "Soin a imperfections"]
    break;
  case 'Soin anti rougeurs et peau sensibles':
    this.SousCategories=["Nettoyant pour peau sensible",
      "Masques apaisants",
      "Lotion apaisante",
      "Cr??mes peau sensibles, anti rougeurs"]
    break;
  case 'Soin Anti taches d??pigmentant':
    this.SousCategories=["Eclat du teint",
      "BB cr??me",
      "CC cr??me",
      "Eclat du teint et anti fatigue"]
    break;
  case 'Soin des yeux':
      this.SousCategories=["Soin anti poches et cernes",
        "Contour des yeux",
        "D??maquillant yeux",
        "Anti ??ge yeux"]
      break;
  case 'Soin des l??vres':
        this.SousCategories=["Hydratation et r??paration l??vres",
          "Stick solaire"]
        break;
  case 'Corps':
          this.SousCategories=["Hydratation et fermete corps",
            "Vergeture",
            "Massage et bien etre",
            "Soins des pieds",
            "Soins des mains Soins des ongles"]
          break;
          case 'Soin des b??b??s':
            this.SousCategories=["Le bain",
              "Le change",
              "La toilette",
              "Le bien??tre",
              "Soins troubles cutan??es"]
            break;



            case 'Futures et jeunes mamans':
              this.SousCategories=["Test de grossesse",
                "Soins anti vergeture",
                "Compl??ment alimentaire",
                "Allaitement",
                "Soin post accouchement"]
              break;
              case 'Pu??riculture':
                this.SousCategories=["Sucettes",
                  "Biberon",
                  "T??tines",
                  "Accessoires"]
                break;
                case 'Hygi??ne intime':
                  this.SousCategories=["Changes complets",
                    "Toilettes et soins",
                    "Protections p??riodiques",
                    "Tampon"]
                  break;
                  case 'Sexualit??':
                    this.SousCategories=["Pr??servatif",
                      "Lubrifiant"]
                    break;



                    case 'Minceur':
                      this.SousCategories=["Accessoires minceur",
                        "Anti cellulite",
                        "Anti-vergetures",
                        "Bruleur de graisse",
                        "Capteur de graisse",
                        "Coup faim",
                        "Draineur et d??tox",
                        "Minceur bio",
                        "R??gimes hyper prot??iniques",
                        "Silhouette et ventre plat"]
                      break;
                      case 'Shampoing':
                        this.SousCategories=["Shampoing doux et fr??quent",
                         "Shampoing antipelliculaire",
                          "Shampoing cheveux gras",
                          "Shampoing cheveux secs",
                          "Shampoing cheveux color??s",
                          "Shampoing cheveux fins, cassants",
                          "Shampoing anti-poux",
                          "Shampoing sec"]
                        break;
                        case 'Apres shampoing, soin des cheveux':
                          this.SousCategories=["Apres shampoing",
                            "Masques, brumes",
                            "Soin d??frisant et lissant",
                            "Soins capillaires",
                            "Capillaire solaire",
                           "Produits coiffants",
                            "Prot??ine capillaire",
                            "Lotion anti-poux"]
                          break;
                          case 'Bio et naturel':
                          this.SousCategories=["Cosm??tique Bio et Naturel",
                            "Cheveux Bio et Naturels",
                           "Minceur Bio et Naturelle",
                            "Hygi??ne Bio et Naturelle",
                            "Solaire Bio et Naturel",
                            "Maman &amp; B??b?? Bio et Naturel",
                            "Aromath??rapie, Bien-??tre et Sant??",
                           "Alimentation Bio et Naturelle",
                            "Homme Bio et Naturel"]
                          break;
          
  default:
    this.SousCategories=["Pu??riculture","Toilette & soins b??b??","Change de b??b??"]
    break;
}

}
selectCategoryOnInit(value){
  switch (value) {
    case 'Nettoyant et d??maquillant':
      this.SousCategories=["Lait","Lotion","Gel lavant","Eau micellaire","Eaux thermalese","Mousse nettoyant","Masque visage","Gommage visage"]
      break;
    case 'Cheveux':
        this.SousCategories=["Masque visage hydratant",
          "Hydratant peaux s??ches",
          "Hydratant peaux normale a mixte",
          "Hydratant peaux grasse",
         "Hydratant peaux intol??rant",
          "Hydratant peaux atopiques"]
        break;
    case 'Soin anti ??ge et anti rides':
      this.SousCategories=["Soin anti rides",
        "Premi??res rides",
        "Rides install??es",
        "Rides marqu??es, perte de fermet??",
        "Soins anti rides peau s??che",
        "Soin anti rides peau grasse",
        "Soin liftant"]
      break;
    case 'Soin peau grasse, mixte et acn??iques et imperfection':
      this.SousCategories=["Nettoyage et purifiant",
       "Lotion",
      "Cr??mes et soin traitant",
        "Traitant matin et soir",
        "Soins specifique",
         "Soin teinte",
        "Soin a imperfections"]
      break;
    case 'Soin anti rougeurs et peau sensibles':
      this.SousCategories=["Nettoyant pour peau sensible",
        "Masques apaisants",
        "Lotion apaisante",
        "Cr??mes peau sensibles, anti rougeurs"]
      break;
    case 'Soin Anti taches d??pigmentant':
      this.SousCategories=["Eclat du teint",
        "BB cr??me",
        "CC cr??me",
        "Eclat du teint et anti fatigue"]
      break;
    case 'Soin des yeux':
        this.SousCategories=["Soin anti poches et cernes",
          "Contour des yeux",
          "D??maquillant yeux",
          "Anti ??ge yeux"]
        break;
    case 'Soin des l??vres':
          this.SousCategories=["Hydratation et r??paration l??vres",
            "Stick solaire"]
          break;
    case 'Corps':
            this.SousCategories=["Hydratation et fermete corps",
              "Vergeture",
              "Massage et bien etre",
              "Soins des pieds",
              "Soins des mains Soins des ongles"]
            break;
            case 'Soin des b??b??s':
              this.SousCategories=["Le bain",
                "Le change",
                "La toilette",
                "Le bien??tre",
                "Soins troubles cutan??es"]
              break;
  
  
  
              case 'Futures et jeunes mamans':
                this.SousCategories=["Test de grossesse",
                  "Soins anti vergeture",
                  "Compl??ment alimentaire",
                  "Allaitement",
                  "Soin post accouchement"]
                break;
                case 'Pu??riculture':
                  this.SousCategories=["Sucettes",
                    "Biberon",
                    "T??tines",
                    "Accessoires"]
                  break;
                  case 'Hygi??ne intime':
                    this.SousCategories=["Changes complets",
                      "Toilettes et soins",
                      "Protections p??riodiques",
                      "Tampon"]
                    break;
                    case 'Sexualit??':
                      this.SousCategories=["Pr??servatif",
                        "Lubrifiant"]
                      break;
  
  
  
                      case 'Minceur':
                        this.SousCategories=["Accessoires minceur",
                          "Anti cellulite",
                          "Anti-vergetures",
                          "Bruleur de graisse",
                          "Capteur de graisse",
                          "Coup faim",
                          "Draineur et d??tox",
                          "Minceur bio",
                          "R??gimes hyper prot??iniques",
                          "Silhouette et ventre plat"]
                        break;
                        case 'Shampoing':
                          this.SousCategories=["Shampoing doux et fr??quent",
                           "Shampoing antipelliculaire",
                            "Shampoing cheveux gras",
                            "Shampoing cheveux secs",
                            "Shampoing cheveux color??s",
                            "Shampoing cheveux fins, cassants",
                            "Shampoing anti-poux",
                            "Shampoing sec"]
                          break;
                          case 'Apres shampoing, soin des cheveux':
                            this.SousCategories=["Apres shampoing",
                              "Masques, brumes",
                              "Soin d??frisant et lissant",
                              "Soins capillaires",
                              "Capillaire solaire",
                             "Produits coiffants",
                              "Prot??ine capillaire",
                              "Lotion anti-poux"]
                            break;
                            case 'Bio et naturel':
                            this.SousCategories=["Cosm??tique Bio et Naturel",
                              "Cheveux Bio et Naturels",
                             "Minceur Bio et Naturelle",
                              "Hygi??ne Bio et Naturelle",
                              "Solaire Bio et Naturel",
                              "Maman &amp; B??b?? Bio et Naturel",
                              "Aromath??rapie, Bien-??tre et Sant??",
                             "Alimentation Bio et Naturelle",
                              "Homme Bio et Naturel"]
                            break;
            
    default:
      this.SousCategories=["Pu??riculture","Toilette & soins b??b??","Change de b??b??"]
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
    location.reload()
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
        console.log("addProduct111111111", this.addProduct);
        this._authUser.addProduct(this.addProduct).subscribe((res)=>{
          console.log("fgsdhgghshgsgdh",res)
        });
        this.closeModal()
  
      })
    }
    else {
      // this.client.uploadFile(this.file).then((res)=>{
        // this.addProduct.picture= res.cdnUrl;
        console.log("addProduct2222", this.addProduct);
        this._authUser.updateProduct(this.addProduct,this.product.id).subscribe();
        this.closeModal()
  
      // })
    }
    

		// console.log(this.loginUsuer)
		// this._authUser.signIn(this.loginUsuer).subscribe();
	}
  
}
