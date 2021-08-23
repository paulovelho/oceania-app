import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule, HttpClient } from '@angular/common/http';
import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

// material
// import { MatAutocompleteModule, MatInputModule } from '@angular/material';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppConfig } from './app.config';
import { AppState } from './app.state';

import { ApiManager } from './services/api/api-manager.service';
import { ApiInterceptor } from './services/api/api.interceptor';
import { ApiDelayerInterceptor } from './services/api/delayer.interceptor';
import { ErrorHandler } from './services/error-handler/error-handler.service';

import { SharedModule } from './shared.module';
import { MainComponent } from './shared/layout/main.component';
import { LoginModule } from './features/login/login.module';

import { ActivitiesModule } from './features/activities/activities.module';
import { ProjectsModule } from './features/projects/projects.module';

@NgModule({
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		HttpClientModule,
		FormsModule,
		ReactiveFormsModule,

		MatFormFieldModule,
		MatInputModule,
		MatSelectModule,
		MatRadioModule,
		MatCardModule,
		MatButtonModule,
		MatDatepickerModule,
		MatNativeDateModule,

		AppRoutingModule,
		NgbModule,

		SharedModule,
		ActivitiesModule,
		LoginModule,
		ProjectsModule,
	],
	declarations: [
		AppComponent,
		MainComponent,
	],
	providers: [
		DatePipe,
		NgbActiveModal,
		AppConfig,
		AppState,
		ApiManager,
		ErrorHandler,
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
	],
	schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
	bootstrap: [ AppComponent ]
})
export class AppModule { }
