import { Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-loading',
  templateUrl: './platypus-loader.component.html',
  styleUrls: ['./platypus-loader.component.scss']
})
export class PlatypusLoaderComponent {

	@Input() extraClass: string = "";
	// extra class:
	// inline, small, white

  constructor() { }

}
