/* INSTALL DEPENDENCIES:
npm install -save ngx-toastr  
*/
import { Injectable } from '@angular/core';
import { ToastrService, GlobalConfig } from 'ngx-toastr';

@Injectable()
export class Toaster {

	private options: GlobalConfig;
  private lastInserted: number[] = [];

	constructor(
		public toastrService: ToastrService
	) {
		this.options = this.toastrService.toastrConfig;
	}

	private debug(type: string, message: string): void {
		console.trace(type + " toaster with message ["+message+"]");
	}

	public error(message: string): void {
		this.debug("error", message);
		this.openToast(this.toastrService.error, message, null);
	}
	public success(message: string): void {
		this.openToast(this.toastrService.success, message, null);
	}
	public exception(err: any): void {
		this.debug("error", err);
		this.openToast(this.toastrService.error, err, "ERRO!");
	}
	public warning(message: string): void {
		this.openToast(this.toastrService.warning, message, null);
	}

	public openToast(toaster: Function, message: string, title: string | null) {
		setTimeout(() => { // set timeout: https://github.com/angular/material2/issues/5268
			const inserted = toaster(message, title, this.options);
			if (inserted) {
				this.lastInserted.push(inserted.toastId);
			}
		});
	}

  public clearToasts() {
    this.toastrService.clear();
  }
  public clearLastToast() {
    this.toastrService.clear(this.lastInserted.pop());
  }

}
