import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AuthApi } from "@services/auth/auth.api";
import { NavigationService } from '@services/navigation/navigation.service';
import { Store } from '@services/store/store.service';
import { Toaster } from '@services/toaster/toaster.service';

@Injectable()
export class AuthService {
	constructor(
		private ApiService: AuthApi,
		private Navigation: NavigationService,
		private Store: Store,
		private Toaster: Toaster,
	) {}

	public isAuthenticated(): Promise<boolean> {
		return this.Store.isLogged();
	}

	public getTokenData(token: string): Promise<any> {
		return this.ApiService
			.GetToken(token)
			.toPromise()
			.then((data: any) => {
				if(data.success) return data.data;
			});
	}

	public login(email: string, password: string): Promise<any> {
		return this.ApiService.PostAuth({ email: email, password: password })
			.then((result: any) => {
				if(result.success) {
					this.Store.setToken(result.data.token);
					this.Store.setLoggedUser(result.data.user);
				}
				return result;
			});
	}

	public logout(): void {
		this.Store.clean();
		this.Navigation.Login();
	}
}