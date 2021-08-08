import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, AbstractControl, FormBuilder, Validators} from '@angular/forms';

import { AppConfig } from '@app/app.config';
import { AuthService } from '@services/auth/authentication.service';
import { NavigationService } from '@services/navigation/navigation.service';
import { Store } from '@services/store/store.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.page.html',
	styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

	public clientTitle: string = "App";
	public form:FormGroup;

	constructor(
		private fb:FormBuilder,
		private router: Router,
		private activeRoute: ActivatedRoute,
		private appConfig: AppConfig,
		private Store: Store,
		private Navigation: NavigationService,
		private service: AuthService,
	) {
		this.form = this.fb.group({
			'email': ['', Validators.compose([Validators.required])],
			'password': ['', Validators.compose([Validators.required])]
		});
	}

	ngOnInit() {
		this.clientTitle = this.appConfig
				.getTitle();
		this.checkLogged();
	}

	public checkLogged(): void {
		if(this.Store.isLogged()) {
			this.Navigation.goHome();
		}
	}

	public login() {
		const { email, password } = this.form.value;
		this.service.login(email, password)
			.then(data => {
				console.info("login result: ", data);
				this.Navigation.goHome();
			});
	}


}
