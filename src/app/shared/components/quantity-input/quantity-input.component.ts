import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';

@Component( {
	selector: 'molla-quantity-input',
	templateUrl: './quantity-input.component.html',
	styleUrls: [ './quantity-input.component.scss' ]
} )

export class QuantityInputComponent implements OnInit, OnChanges {

	@Input() value = 1;
	@Input() max = 10000;
	@Input() adClass = "";
	@Output() changeQty: EventEmitter<number>;

	current = 1;
    test=25;
	constructor () {
		this.changeQty = new EventEmitter<number>();
	}

	ngOnChanges (): void {
		console.log("eee",this.value)
		this.current = this.value;
	}

	ngOnInit (): void {
	}

	increment () {
		// if ( this.max <= 0 || this.current >= this.max )
		// 	return;

		this.current++;
		console.log("curreeeeentInc", this.current)
		this.changeQty.emit( this.current );
	}

	decrement () {
		if ( this.current > 1 ) {
			this.current--;
			console.log("curreeeeentDec", this.current)
			this.changeQty.emit( this.current );
		}
	}

	changeCurrent ( event: any ) {
		console.log("eveeeent", event)
		if ( parseInt( event.data ) < 10 && parseInt( event.data ) > 0 ) {
			this.current = parseInt( event.data );
			this.changeQty.emit( this.current );
		} else {
			event.data = this.current;
		}
	}
}