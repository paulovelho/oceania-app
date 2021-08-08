import { Platform } from '@ionic/angular';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { LoadingController } from '@ionic/angular';

import { Toaster } from './toaster/toaster.service';
import { Store } from './store/store.service';

@Injectable({
	providedIn: 'root'
})
export default class ThemeService {

	@Output() changeTheme = new EventEmitter<any>();
	public imageUnavailable = "/assets/images/unavailable-image.jpg";

	constructor(
		private LoadingController: LoadingController,
		private platform: Platform,
		private Store: Store,
		private Toaster: Toaster,
	) {
		this.setDarkTheme(false);
	}

	public logo: string;
	public setDarkTheme(dark: boolean) {
		console.info('setting dark theme ', dark);
		this.Store.set("dark-mode", dark);
		document.body.classList.toggle('dark', dark);
		document.body.classList.toggle('light', !dark);
		this.logo = "assets/img/logo/nav_logo.png";
		this.changeTheme.emit({
			dark: dark,
			logo: this.logo,
		});
	}

	public isMobile() {
		// available platforms:
		// 'android','capacitor','cordova','desktop','electron','hybrid','ios','ipad','iphone','mobile','mobileweb','phablet','pwa','tablet'
		return (
			this.platform.is('android') ||
			this.platform.is('ios') ||
			this.platform.is('tablet') ||
			this.platform.is('ipad')
		);
	}
	public getPlatforms() {
		return this.platform.platforms();
	}

	private loadings: number = 0;
	private loadingCtrl;
	public async showLoading(message?: string) {
		console.info('showing loading ', this.loadings);
		if (this.loadings > 0) {
			this.loadings ++;
			return true;
		}
		this.loadings ++;
		if(!message) message = "Loading";
		this.loadingCtrl = await this.LoadingController.create({
			message
		});
		if(this.loadings > 0)
			await this.loadingCtrl.present();
	}
	public async hideLoading() {
		this.loadings --;
		console.info('hide loading ', this.loadings);
		if (this.loadings > 0) return false;
		if(this.loadingCtrl) this.loadingCtrl.dismiss();
		this.loadingCtrl = null;
		return true;
	}
	public async randomLoadTime() {
		await this.showLoading();
		const wait = this.getRandomWaitTime();
		console.info('setting a random wait time of ' + wait);
		await new Promise(resolve => setTimeout(resolve, wait));
		await this.hideLoading();
	}
	public async sleep() {
		return new Promise(resolve => setTimeout(resolve, this.getRandomWaitTime()));
	}
	public getRandomWaitTime(): number {
//		return 0;
		const wait = Math.floor(Math.random() * 50) + 1;
		return wait * 100;
	}

	public showError(message) {
		this.Toaster.error(message);
	}
	public showMessage(message) {
		this.Toaster.info(message);
	}

}


