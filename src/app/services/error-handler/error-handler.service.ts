import { Injectable } from "@angular/core";
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

import { NavigationService } from '@services/navigation/navigation.service';
import { Store } from '@services/store/store.service';
import { Toaster } from '@services/toaster/toaster.service';

@Injectable()
export class ErrorHandler {

	constructor(
    private router: Router,
		private datePipe: DatePipe,
		private Navigate: NavigationService,
    private Store: Store,
		private Toaster: Toaster
	) {}

	public ErrorCodeManager(code, data): void {
		console.error("error-handler - managing error: " + code, data);
		switch (code) {
			case 0:
				this.Toaster.error(data.message);
				break;
			case 1001:
				this.Toaster.error("parâmetros de busca inválidos");
				break;
			case 4009: // conta azul not connected
				this.Toaster.warning("Conta Azul não conectado");
				break;
			case 4010: // token expired
				let expired = this.datePipe.transform(data.expiredAt, 'yyyy-MM-dd hh:mm:ss');
				this.Toaster.warning("Login expirado em " + expired);
				this.redirectToLogin();
				break;
			case 4011:
				this.Toaster.error("usuário/senha inválidos!");
				break;
			case 2005: // invalid object
				this.Toaster.error("objeto inválido!");
				break;
			case 2006: // invalid data
				this.Toaster.error("chamada inválida!");
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
		this.Navigate.goToLogin();
	}

	private getErrorMessage(item: any): string {
		console.error(item);
		switch (item.kind) {
			case "uniqueEmail":
				return item.key + " já está cadastrado no sistema!";
				break;
			case "required":
				return "campo obrigatório: " + item.path;
			default:
				return item.key + " behave unexpectedly";
				break;
		}
	}

	public ValidationError(errors: Array<any>) {
		if(!errors) return this.unknownError(errors);
		if(!Array.isArray(errors)) {
			errors = Object.keys(errors).map((index) => errors[index] );
		}
		let message: Array<string> = [];
		errors.forEach((item) => {
			message.push(this.getErrorMessage(item));
		});
		this.Toaster.warning(message.join(";<br/>"));
	}

	public unknownError(item: any): void {
		console.error(item);
		this.Toaster.error("Ocorreu um erro desconhecido!");
	}

	public AccessDenied(): void {
		console.error("PERMISSION DENIED");
		this.Toaster.denied();
		return this.redirectToLogin();
	}

	public exception(err: any): void {
		switch (err.code) {
			case 5052:
				this.Toaster.error("Erro na integração financeira: " + err.message);
				break;
			default:
				console.error(err);
				this.Toaster.error("Ocorreu um erro desconhecido!");
				break;
		}
	}

}
