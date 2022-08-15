import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, AbstractControl, FormBuilder, Validators} from '@angular/forms';

import { Store } from '@services/store/store.service';
import { emailValidator } from '@services/validators/email.validator';
import { Toaster } from '@services/toaster/toaster.service';
import { AuthService } from '@services/auth/authentication.service';

import { AppConfig } from '@app/app.config';

@Component({
	selector: 'login',
	encapsulation: ViewEncapsulation.None,
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
	public form:FormGroup;
	public email:AbstractControl;
	public password:AbstractControl;
	public clientTitle:string = "App";
	public badge: string = "";

	private homeRedirect: string = "/app";

	constructor(
		fb:FormBuilder,
		private router: Router,
		private appConfig: AppConfig,
		private Store: Store,
		private Toaster: Toaster,
		private AuthService: AuthService,
	) {
		this.form = fb.group({
			'email': ['', Validators.compose([Validators.required, emailValidator])],
			'password': ['', Validators.compose([Validators.required])]
		});

		this.email = this.form.controls['email'];
		this.password = this.form.controls['password'];
	}

	ngOnInit() {
		this.checkLogged();
		this.clientTitle = this.appConfig
				.getTitle();
		this.badge = this.appConfig.getEnv();
	}

	public debugEnv(): void {
		this.appConfig.debug();
	}

	public checkLogged(): void {
		this.Store.isLogged()
			.then(logged => {
				if(logged) {
					this.router.navigate([this.homeRedirect]);
				}
			});
	}

	public onSubmit(values:Object):void {
		if (this.form.valid) {
			this.AuthService.login(this.email.value, this.password.value)
				.then((result: any) => {
					if (result.success) {
						this.router.navigate([this.homeRedirect]);
					} else {
						this.Toaster.warning("Erro ao efetuar login!");
					}
				}).catch((err: any) => {
					console.error("error catch: ", err);
				});
		}
	}

}
