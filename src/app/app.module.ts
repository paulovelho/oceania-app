import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule, HttpClient } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppConfig } from './app.config';
import { AppState } from './app.state';

import { SharedModule } from './shared.module';

import { MainComponent } from './shared/layout/main.component';
import { LoginModule } from './features/login/login.module';

@NgModule({
	imports: [
		BrowserModule,
		AppRoutingModule,
		HttpClientModule,
		AppRoutingModule,

		SharedModule,

		LoginModule,
	],
	declarations: [
		AppComponent,
		MainComponent,
	],
	providers: [
		AppConfig,
		AppState,
	],
	schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
	bootstrap: [ AppComponent ]
})
export class AppModule { }
