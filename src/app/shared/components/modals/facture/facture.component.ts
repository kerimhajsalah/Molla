import { Component, Input, OnInit } from '@angular/core';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
@Component({
  selector: 'molla-facture',
  templateUrl: './facture.component.html',
  styleUrls: ['./facture.component.scss']
})
export class FactureComponent implements OnInit {

  @Input() cartItems
  @Input() commande
  @Input() exist
  @Input () Pourcentage 
  show = true;
  total = 0 ;
  constructor() { }

  ngOnInit(): void {
    console.log("cartItem", this.exist);
    console.log("commande", this.Pourcentage);
    for (let i of this.cartItems){
      this.total += i.price * i.qty
    }
    if(this.exist){
      this.total = this.total - this.total*this.Pourcentage/100;
    }
  }
  closeModal() {
		let modal = document.querySelector('.login-modal') as HTMLElement;
		if (modal)
			modal.click();
	}
  pdfConverter(){
    this.show = false;
    var data = document.getElementById('contentToConvert');
html2canvas(data).then(canvas => {
// Few necessary setting options
var imgWidth = 150;
var pageHeight = 295;
var imgHeight = canvas.height * imgWidth / canvas.width;
var heightLeft = imgHeight;
 
const contentDataURL = canvas.toDataURL('image/png')
let pdf = new jspdf.jsPDF('p', 'mm', 'a4'); // A4 size page of PDF
var position = 0;
pdf.addImage(contentDataURL, 'PNG', 0, 5, imgWidth, imgHeight-100)
pdf.save('new-file.pdf'); // Generated PDF
});
  }
}
