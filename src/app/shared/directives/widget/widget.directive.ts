import { Directive, ElementRef, OnInit } from '@angular/core';
import * as jQuery from 'jquery';

@Directive ({
	selector: '[widget]'
})

export class Widget implements OnInit {
	$el: any;

	constructor(el: ElementRef) {
		this.$el = jQuery(el.nativeElement);
	}

	ngOnInit(): void {
	}
}
