import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SharedModule } from '@app/shared.module';

import { HomePageRoutingModule } from './home.routing';

import { HomeComponent } from './home.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HomePageRoutingModule,
    SharedModule,
  ],
  declarations: [ HomeComponent ]
})
export class HomeModule {}
