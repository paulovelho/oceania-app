import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';

import { AppConfig } from '@app/app.config';
import { AuthService } from '@services/auth/authentication.service';
import { NavigationService } from '@services/navigation/navigation.service';
import { Store } from '@services/store/store.service';

@Component({
	selector: 'app-entrance',
})
export class EntrancePage implements OnInit, OnDestroy {

	public loading;

	constructor(
		private router: Router,
		private activeRoute: ActivatedRoute,
		public loadingController: LoadingController,
		private appConfig: AppConfig,
		private Store: Store,
		private Navigation: NavigationService,
		private service: AuthService,
	) {
	}

	async ngOnInit() {
		await this.ShowLoading();
		this.activeRoute.queryParams.subscribe(
			params => {
				const token = params["token"];
				this.Store.setToken(token);
				this.CheckToken(token)
					.finally(() => this.end());
			});
	}
	ngOnDestroy() {
		this.end();
	}

	public end() {
		if(this.loading)
			this.loading.dismiss();			
	}

	async CheckToken(token) {
		const rs = await this.service.getTokenData(token)
			.then((data) => {
				const { user, name, role, user_id } = data;
				this.Store.setUser({ email: user, name, role, id: user_id });
				this.Navigation.goHome();
			});
		return rs;
	}

  async ShowLoading() {
    this.loading = await this.loadingController.create({
      message: 'Carregando Stock App...',
    });
    await this.loading.present();
  }

}
