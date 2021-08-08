import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
// Toast for IONIC: https://ionicframework.com/docs/v4/api/toast

@Injectable()
export class Toaster {

  private lastToast = null;

	constructor(
		private Toast: ToastController,
	) {
	}

	private debug(type, message): void {
		return;
		console.trace(type + " toaster with message ["+message+"]");
	}

	public error(message: string): void {
		this.debug("error", message);
		this.openToast("error", message, null);
	}
	public success(message: string): void {
		this.openToast("success", message, null);
	}
	public exception(err): void {
		this.debug("error", err);
		this.openToast("error", err, "ERRO!");
	}
	public warning(message: string): void {
		this.openToast("warning", message, null);
	}
	public info(message: string): void {
		this.openToast("info", message, null);
	}
	public denied(): void {
		const html = 'Efetue novamente o login';
		this.openToast("error", html, "Acesso negado!");
	}

	public openToast(type, message, title, extendedOptions=null) {
		this.Toast.create({
			message,
			duration: 5000,
			buttons: [{
				icon: 'close-circle-outline',
				role: 'cancel',
				handler: () => { console.log('Cancel clicked'); },
			}],
		})
		.then((toastData) => {
			toastData.present();
		});
		console.info(`[${type}] ${title}`, message);
	}

  public clearToasts() {
  }
  public clearLastToast() {
  }

}
