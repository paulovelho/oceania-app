import { Directive, ElementRef, OnInit } from '@angular/core';
import * as jQuery from 'jquery';

import 'widgster';

@Directive ({
	selector: '[widget]'
})

export class Widget implements OnInit {
	$el: any;

	constructor(el: ElementRef) {
		this.$el = jQuery(el.nativeElement);
		let widgster: any = (<any>jQuery.fn).widgster;
		widgster.Constructor.DEFAULTS.bodySelector = '.widget-body';

		jQuery(document).on('close.widgster', (e: any) => {
			let $colWrap = jQuery(e.target).closest(' [class*="col-"]:not(.widget-container)');
			if (!$colWrap.find('.widget').not(e.target).length) {
				$colWrap.remove();
			}
		});

		jQuery(document).on("fullscreened.widgster", (e) => {
				jQuery(e.target).find('div.widget-body').addClass('scrolling');
		}).on("restored.widgster", (e) => {
				jQuery(e.target).find('div.widget-body').removeClass('scrolling');
		}); 
	}

	ngOnInit(): void {
		this.$el.widgster();
	}
}
