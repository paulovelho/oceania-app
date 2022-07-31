import { Injectable } from "@angular/core";
import { HttpResponse } from '@angular/common/http';

import { Observable } from "rxjs";
import { map } from 'rxjs/operators';

import { ErrorHandler } from '@services/error-handler/error-handler.service';
import { Toaster } from '@services/toaster/toaster.service';

@Injectable()
export class ApiManager {

	constructor(
		private ErrorHandler: ErrorHandler,
		private Toaster: Toaster,
	) {}

	private ErrorCodeManager(code: number, data: any) {
		return this.ErrorHandler.ErrorCodeManager(code, data);
	}

	public ErrorManager(err: any): void {
		switch (err.status) {
			case 0:
				this.ErrorCodeManager(0, err);
				break;
			case 401:
				let details = err.error;
				if(!details) return this.Toaster.error("Chamada não autorizada!");
				else this.ErrorCodeManager(details.code, details.data)
				break;
			case 200:
				if(err.statusText == "OK") return;
				break;
			default:
				if(err.name == "TimeoutError") {
					this.Toaster.error("Timeout na consulta da API");
				}
				if(err.error && !err.error.success) {
					let error = err.error.data || err.error.error;
					if( error ) {
						let code = error.code || 0;
						this.ErrorCodeManager(code, error);
					} else {
						this.ErrorCodeManager(0, err.error);
					}
				}
				break;
		}
	}

	private ResponseManage(response: any): void {
//    console.info("checking body ", response);
		if(!response.success) {
			return this.ErrorCodeManager(response.code, response.data)
		}
	}

	public StatusManage(event: HttpResponse<any>): void {
		switch (event.status) {
			case 200:
			default:
				let body: any = event.body;
				if(body instanceof Blob) return;
				this.ResponseManage(body);
				break;
			case 401:
				this.Toaster.error("Chamada não autorizada!");
				this.ErrorCodeManager(401, null)
				break;
		}
	}

}
