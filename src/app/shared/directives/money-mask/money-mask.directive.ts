import { Directive, ElementRef, HostListener, AfterViewInit, Input, forwardRef, Renderer2 } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

const noop = () => {};

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
	provide: NG_VALUE_ACCESSOR,
	useExisting: forwardRef(() => MoneyMaskDirective),
	multi: true
};
/*
* from: https://raw.githubusercontent.com/LeoTanoue/ngx-currency-mask/master/currency-mask.directive.ts
* 
* Custom Directive for Currency Mask
* The main requirements that drove the creation of this custom directive currency mask are:
* 1. Currency Mask had to be easy to implement across application. Directive control was used to accomplish that and everything is under one Module that can be easily imported.
* 2. Formatted value should be composed of: US dollar currency symbol '$' + value + 2 decimal point precision.
* 3. When user focus on the input, it should remove all formatting and only keep the decimal amount with the precision. If the input is blank and:
*   a. The user types "100" then unfocus, it should display $100.00
*   b. The user types "100.10" then unfocus, it should display $100.10
*   c. The user types ".25" then unfocus, it should display $0.25
* 4. User shouldn't be able to type anything that isn't numbers or decimal separator "."
* 5. Optional parameter for allowing negative numbers added. On Edit mode the the indicative of negative number is the minus "-" sign, but when
*     formatted we surround the value with parenthesis. So on input -300.12 will display as ($300.12).
*/
@Directive({
	selector: '[money-mask]',
	providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
})
export class MoneyMaskDirective implements ControlValueAccessor {

	private prefix: string = '';
	private decimalSeparator: string = ',';
	private thousandsSeparator: string = '.';

	private el: HTMLInputElement;
	// Keeps track of the value without formatting
	private innerValue: any;
	// Optional Parameter to allow for negative number interaction

	@Input() allowNegative: boolean = true;
	constructor(
		private elementRef: ElementRef, 
		private renderer: Renderer2
	) {
		this.el = elementRef.nativeElement;
	}

	// Placeholders for the callbacks which are later providesd
	// by the Control Value Accessor
	private onTouchedCallback: () => void = noop;
	private onChangeCallback: (a: any) => void = noop;

	// set getter
	get value(): any {
		return this.innerValue;
	}

	// set accessor including call the onchange callback
	set value(v: any) {
		if (v !== this.innerValue) {
			this.innerValue = v;
			this.onChangeCallback(v);
		}
	}

	// From ControlValueAccessor interface
	writeValue(value: any) {
		if (value !== this.innerValue) {
			this.el.value = this.transform(value, this.allowNegative) || "";
			if (value) {
				this.renderer.setAttribute(this.elementRef.nativeElement, 'value', value);
			}
			this.innerValue = value;
		}
	}

	// From ControlValueAccessor interface
	registerOnChange(fn: any) {
		this.onChangeCallback = fn;
	}

	// From ControlValueAccessor interface
	registerOnTouched(fn: any) {
		this.onTouchedCallback = fn;
	}

	// On Focus remove all non-digit or decimal separator values
	@HostListener('focus', ['$event.target.value'])
	onfocus(value: any) {
		this.el.value = this.parse(value, this.allowNegative).replace('.', ',');
	}

	// On Blue remove all symbols except last . and set to currency format
	@HostListener('blur', ['$event.target.value'])
	onBlur(value: any) {
		this.onTouchedCallback();
		this.valueTransformation(value);
	}

	// On Change remove all symbols except last . and set to currency format
	@HostListener('change', ['$event.target.value'])
	onChange(value: any) {
		this.valueTransformation(value);
	}

	valueTransformation(value: any) {
		this.el.value = this.transform(value, this.allowNegative) || "";
		this.innerValue = this.parse(this.el.value, this.allowNegative);
		this.onChangeCallback(this.innerValue);
		if (this.innerValue) {
			this.renderer.setAttribute(this.elementRef.nativeElement, 'value', this.innerValue);
		}
	}

	// Prevent user to enter anything but digits and decimal separator

	@HostListener('keydown', ['$event']) onKeyDown(event: any) {
		let e = <KeyboardEvent> event;

		if(e.key == '.') {
			e.preventDefault();
			this.el.value += ',';
			return;
		}

		// 108 - numpad comma
		// 188 - comma
		if ([46, 8, 9, 27, 13, 108, 110, 190, 188].indexOf(e.keyCode) !== -1 ||
			// Allow: Ctrl+A
			(e.keyCode === 65 && (e.ctrlKey || e.metaKey)) ||
			// Allow: Ctrl+C
			(e.keyCode === 67 && (e.ctrlKey || e.metaKey)) ||
			// Allow: Ctrl+V
			(e.keyCode === 86 && (e.ctrlKey || e.metaKey)) ||
			// Allow: Ctrl+X
			(e.keyCode === 88 && (e.ctrlKey || e.metaKey)) ||
			// Allow: home, end, left, right
			(e.keyCode >= 35 && e.keyCode <= 39)) {
				// let it happen, don't do anything
				return;
			}
			// Ensure that it is a number and stop the keypress
			if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
				e.preventDefault();
			
		}
	}

	transform(value: string, allowNegative = false, decimalPrecision: number = 2): string | null {
		if (value == undefined || value === '') {
			return null;
		}

		if (allowNegative) {
			value = value.toString();
			if (value.startsWith('(') || value.startsWith('-')) {
				value = '-' + value.substr(1, value.length).replace(/\(|\)|\$|\-/g, '');
			} else {
				value = value.replace(/\(|\)|\$|\-/g, '');
			}
		}
		let [integer, fraction = ''] = (value || '').toString().split(this.decimalSeparator);
		fraction = decimalPrecision > 0 ? this.decimalSeparator + (fraction + '000000').substring(0, 2) : '';
		integer = integer.replace(/\B(?=(\d{3})+(?!\d))/g, this.thousandsSeparator);

		return integer + fraction;
	}

	parse(value: string, allowNegative = false) {
		value = value.replace('.', '').replace(',', '.');
		let [integer, fraction = ''] = (value || '').split(this.decimalSeparator);
		integer = integer.replace(new RegExp(/[^\d\.]/, 'g'), '');
		fraction = parseInt(fraction, 10) > 0 && 2 > 0 ? this.decimalSeparator + (fraction + '000000').substring(0, 2) : '';
		return integer + fraction;
	}

}