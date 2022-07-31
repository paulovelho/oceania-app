import { NgModule, forwardRef } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { NgxMaskModule } from 'ngx-mask'
import { ToastrModule } from 'ngx-toastr';

// services:
import { ApiService } from '@services/api/api.service';
import { AuthService } from '@services/auth/authentication.service';
import { AuthApi } from '@services/auth/auth.api';
import { AuthGuardService } from '@services/auth/auth-guard.service';
import { NavigationService } from '@services/navigation/navigation.service';
import { Store } from '@services/store/store.service';
import { Toaster } from '@services/toaster/toaster.service';

// directives:
import { Widget } from './shared/directives/widget/widget.directive';
import { MoneyMaskDirective } from './shared/directives/money-mask/money-mask.directive';

// pipes:
import { CurrencyProxyPipe } from './shared/pipes/currency.pipe';

// components:
import { MenuComponent } from './shared/components/menu/menu.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { PlatypusLoaderComponent } from './shared/components/platypus-loader/platypus-loader.component';
import { StatusComponent } from './shared/components/status/status.component';

// form components:
import { ButtonComponent } from './shared/components/forms/button-material/button.component';
import { CurrencyInputComponent } from './shared/components/forms/currency-input-material/currency-input.component';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		RouterModule,

		MatFormFieldModule,
		MatButtonModule,
		MatCheckboxModule,
		MatInputModule,
		MatSelectModule,

		NgxMaskModule.forRoot({}),
		ToastrModule.forRoot(),
	],
	declarations: [
		Widget,
		MoneyMaskDirective,

		CurrencyProxyPipe,

		MenuComponent,
		NavbarComponent,
		PlatypusLoaderComponent,
		StatusComponent,

		ButtonComponent,
		CurrencyInputComponent,
	],
	providers: [
		ApiService,
		AuthService,
		AuthApi,
		AuthGuardService,
		NavigationService,
		Store,
		Toaster,
	],
	exports: [
		NgxMaskModule,
		Widget,
		MoneyMaskDirective,

		FormsModule,
		MatFormFieldModule,
		MatButtonModule,
		MatCheckboxModule,
		MatInputModule,
		MatSelectModule,
		
		MenuComponent,
		NavbarComponent,
		PlatypusLoaderComponent,
		StatusComponent,
		ButtonComponent,
		CurrencyInputComponent,
	]
})
export class SharedModule { }
