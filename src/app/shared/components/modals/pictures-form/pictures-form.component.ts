import { Component, OnInit } from '@angular/core';
import { UploadClient } from '@uploadcare/upload-client';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'molla-pictures-form',
  templateUrl: './pictures-form.component.html',
  styleUrls: ['./pictures-form.component.scss']
})
export class PicturesFormComponent implements OnInit {
  id ;
  client = new UploadClient({ publicKey: '8984836541096889c993' })
  picture;
  file ;
  fileName;
  constructor(private _authUser:ApiService) { }

  ngOnInit(): void {
  }
	closeModal() {
		let modal = document.querySelector('.login-modal') as HTMLElement;
		if (modal)
			modal.click();
	}
  onFileSelected(event) {

    this.file = event.target.files[0];
    this.client.uploadFile(this.file).then((res)=>{
      this.picture= res.cdnUrl;
      this.fileName=res.name
     console.log(res)
  
    })
  }
  submitModal(){
    this.client.uploadFile(this.file).then((res)=>{
      this.picture= res.cdnUrl;
      console.log("this is the upload result", res);
      this._authUser.createPic(this.id,this.picture).subscribe();
      this.closeModal()
  })

}
}
