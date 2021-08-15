import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { SlimScroll } from './slim-scroll/slim-scroll.directive';
import { Counter } from './counter/counter.directive';
import { LiveTile } from './live-tile/live-tile.directive';
import { ProgressAnimate } from './progress-animate/progress-animate.directive';

@NgModule({
	imports: [ 
		CommonModule 
	],
	declarations: [
		SlimScroll,
		Counter,
		LiveTile,
		ProgressAnimate,
	],
	exports: [ 
		SlimScroll,
		Counter,
		LiveTile,
		ProgressAnimate,
	]
})
export class DirectivesModule { }
