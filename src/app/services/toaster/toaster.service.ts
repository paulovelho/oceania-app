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
//		console.trace(type + " toaster with message ["+message+"]");
	}

	public error(message: string): void {
		this.debug("error", message);
		const inserted = this.toastrService.error(message, "Error!", this.options);
		if (inserted) {
			this.lastInserted.push(inserted.toastId);
		}
	}
	public success(message: string): void {
		const inserted = this.toastrService.success(message, '', this.options);
		if (inserted) {
			this.lastInserted.push(inserted.toastId);
		}
	}
	public exception(err: any): void {
		this.debug("error", err);
		const inserted = this.toastrService.error(err, "Exception!", this.options);
		if (inserted) {
			this.lastInserted.push(inserted.toastId);
		}
	}
	public warning(message: string): void {
		const inserted = this.toastrService.warning(message, '', this.options);
		if (inserted) {
			this.lastInserted.push(inserted.toastId);
		}
	}

  public clearToasts() {
    this.toastrService.clear();
  }
  public clearLastToast() {
    this.toastrService.clear(this.lastInserted.pop());
  }

}
