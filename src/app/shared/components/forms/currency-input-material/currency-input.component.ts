import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { FormsModule, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'currency-input',
  templateUrl: './currency-input.component.html',
  styleUrls: ['./currency-input.component.scss'],
	providers: [{
		provide: NG_VALUE_ACCESSOR,
		useExisting: forwardRef(() => CurrencyInputComponent),
		multi: true
	}]
})
export class CurrencyInputComponent implements ControlValueAccessor {

	public symbol: string = "$";
	public amount: number = 0;

	@Input() id: string = "";
	@Input() controlName: string = "";
	@Input() label: string = "";
	@Input() value: number = 0;
	@Output() valueChange = new EventEmitter<number>();

  constructor() { }
	
	onChange = (delta: any) => {};

	writeValue(delta: any): void { }

	registerOnChange(fn: (v: any) => void): void {
		this.onChange = fn;
	}

	registerOnTouched(fn: () => void): void { }
}
