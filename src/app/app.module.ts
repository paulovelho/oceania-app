import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule, HttpClient } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { MainComponent } from './main.component';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';

import { AppConfig } from './app.config';

// APIS
import { ApiService } from './services/api/api.service';
import { ApiManager } from './services/api/api-manager.service';
import { ApiInterceptor } from './services/api/api.interceptor';
import { ApiDelayerInterceptor } from './services/api/delayer.interceptor';

import { BaseApi } from './apis/api';
import { AuthApi } from './apis/auth.api';
import { ProjectsApi } from './apis/projects.api';

// SERVICES
import Botecache from './services/botecache/botecache.service';
import ThemeService from './services/theme.service';
import { ErrorHandler } from './services/error-handler/error-handler.service';
import { NavigationService } from './services/navigation/navigation.service';
import { Store } from './services/store/store.service';
import { Toaster } from './services/toaster/toaster.service';

import { AuthService } from './services/auth/authentication.service';
import { AuthGuardService } from './services/auth/auth-guard.service';



@NgModule({
  declarations: [ AppComponent, MainComponent ],
  entryComponents: [],
  imports: [
  	BrowserModule,
  	IonicModule.forRoot(),
  	AppRoutingModule,
  	FormsModule,
  	ReactiveFormsModule,
		HttpClientModule,

		SharedModule,
  ],
  providers: [
  	DatePipe,
  	{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },

		BaseApi,
		AuthApi,
		ProjectsApi,

		ApiService,
		ApiManager,
		{
			provide: HTTP_INTERCEPTORS,
			useClass: ApiInterceptor,
			multi: true,
		},
		{
			provide: HTTP_INTERCEPTORS,
			useClass: ApiDelayerInterceptor,
			multi: true,
		},

		AppConfig,

		Botecache,
		ErrorHandler,
		NavigationService,
		Store,
		ThemeService,
		Toaster,

		AuthGuardService,
		AuthService,

		{ provide: LOCALE_ID, useValue: 'en-US' }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
