import { Injectable } from "@angular/core";
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

import { Store } from '@services/store/store.service';
import { Toaster } from '@services/toaster/toaster.service';

@Injectable()
export class ErrorHandler {

	constructor(
    private router: Router,
		private datePipe: DatePipe,
    private Store: Store,
		private Toaster: Toaster
	) {}

	public ErrorCodeManager(code: number, data: any): void {
		console.error('error code ' + code, data);
		switch (code) {
			case 0:
				this.Toaster.error("ERRO DE API: " + data.message);
				break;
			case 1001:
				this.Toaster.error("parâmetros de busca inválidos");
				break;
			case 401:
				this.redirectToLogin();
				break;
			case 4010: // token expired
				console.error(data);
				let expired = this.datePipe.transform(data.expiredAt, 'yyyy-MM-dd hh:mm:ss');
				this.Toaster.warning("Login expirado em " + expired);
				this.redirectToLogin();
				break;
			case 4011:
				this.Toaster.error("usuário/senha inválidos!");
				break;
			case 2005: // invalid object
				// take care of the error by itself
				break;
			case 5052:
				this.Toaster.error("Ocorreu um erro na integração com a plataforma financeira: ["+ data.message +"]");
				break;
			default:
				console.info(data);
				this.Toaster.error("error");
				break;
		}
	}

	private redirectToLogin(): void {
		this.Store.clean();
		this.router.navigate(["login"]);
	}

	private getErrorMessage(item: any): string {
		switch (item.error) {
			case "uniqueEmail":
				return item.key + " já está cadastrado no sistema!";
				break;
			default:
				return item.key + " behave unexpectedly";
				break;
		}
	}

	public ValidationError(errors: Array<any>) {
		if(!errors) return this.unknownError(errors);
		let message: Array<string> = [];
		errors.forEach((item) => {
			message.push(this.getErrorMessage(item));
		});
		this.Toaster.warning(message.join(";<br/>"));
	}

	private unknownError(item: any): void {
		console.error(item);
		this.Toaster.error("Ocorreu um erro desconhecido!");
	}

	public exception(err: any): void {
		switch (err.code) {
			case 5052:
				this.Toaster.error("Erro na integração financeira: " + err.message);
				break;
			default:
				this.Toaster.error("Ocorreu um erro desconhecido!");
				break;
		}
	}

}
