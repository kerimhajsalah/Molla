import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'molla-facture',
  templateUrl: './facture.component.html',
  styleUrls: ['./facture.component.scss']
})
export class FactureComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  closeModal() {
		let modal = document.querySelector('.login-modal') as HTMLElement;
		if (modal)
			modal.click();
	}
}
