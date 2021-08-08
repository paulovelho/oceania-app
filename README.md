# Malte - Stock APP

## cli commands

#### add page
example:
`ionic generate page features/parts`

#### add component
example:
`ionic generate component features/parts/components/parts-list`

then go to `parts.module` and include the code for importing the component.

```
import { PartsListComponent } from './components/parts-list/parts-list.component';

@NgModule({
  imports: [ ... ],
  declarations: [
  	..., 
  	PartsListComponent,
  ]
})
export class PartsModule {}

```

#### add service
example:
`ionic generate service services/parts`

then go to `app.module` and include the code for importing the service

```
import { PartsService } from './services/parts.service';

@NgModule({
	imports: [ ... ],
	providers: [
		..., 
		PartsService,
	],
	bootstrap: [AppComponent],
})
export class AppModule {}

```
