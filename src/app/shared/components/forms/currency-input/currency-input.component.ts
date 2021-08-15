import { Component, Input } from '@angular/core';
import { FormsModule, ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'currency-input',
  templateUrl: './currency-input.component.html',
})
export class CurrencyInputComponent implements ControlValueAccessor {

	public symbol: string = "$";
	public amount: number = 0;

	@Input() controlName: string = "";

  constructor() { }
	
	onChange = (delta: any) => {};

	writeValue(delta: any): void { }

	registerOnChange(fn: (v: any) => void): void {
		this.onChange = fn;
	}

	registerOnTouched(fn: () => void): void { }
}
