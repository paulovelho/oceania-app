import { DebugElement, Type, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed, TestModuleMetadata } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { By } from '@angular/platform-browser';
import { Observable } from "rxjs/Rx";

import { RouterTestingModule } from '@angular/router/testing'
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';

import { AppConfig } from '@app/app.config';
import { Store } from '@app/services/store/store.service';

import { ApiService } from '@app/services/api/api.service';
import { ApiServiceMock } from '@app/services/api/api.service.mock';

export class Setup {

  public imports: any[];
  public providers: any[];
  public declarations: any[];
  public activatedRoute = null;

  constructor() {
    this.imports = [
      RouterTestingModule,
      FormsModule
    ];
    this.providers = [
      DatePipe,
      AppConfig,
      Store,
      { provide: ApiService, useClass: ApiServiceMock }
    ];
    this.declarations = [];
    this.activatedRoute = null;
  }

  addImports = (...extraImports: any[]): this => {
    this.imports = this.imports.concat(extraImports);
    return this;
  }
  addProviders = (...extraProviders: any[]): this => {
    this.providers = this.providers.concat(extraProviders);
    return this;
  }
  addDeclarations = (...extraDeclarations: any[]): this => {
    this.declarations = this.declarations.concat(extraDeclarations);
    return this;
  }
  addRouteParam = (obj: any): this => {
    this.activatedRoute = {
      snapshot: { params: obj }
    };
    this.providers = this.providers.concat({
      provide: ActivatedRoute, useValue: this.activatedRoute
    });
    return this;
  }

  getSetup = (): any => {
    return {
      imports: this.imports,
      providers: this.providers,
      declarations: this.declarations,
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    };
  }

  start = () => {
    return TestBed.configureTestingModule(this.getSetup())
      .compileComponents();
  }

  reset = () => {
    TestBed.resetTestingModule();
  }

  component = (comp) => {
    return TestBed.createComponent(comp);
  }
  provider = (prov) => {
    return TestBed.get(prov);
  }

  getMocker = (type: string) => {
    let fn: string = type.toLowerCase() + 'Api';
    return spyOn(this.provider(ApiService), fn);
  }

  // component management
  private testedType;
  private hostType;
  private fixture;

  init<T, H>(testedType?: Type<T>, hostType?: Type<H>): this {
    let declarations = [];
    if (testedType) {
      declarations.push(testedType);
      this.testedType = testedType;
    }
    if (hostType) {
      declarations.push(hostType);
      this.hostType = hostType;
    }

    if(declarations.length > 0)
      this.addDeclarations(declarations);

    afterEach(() => {
      if (this.fixture) {
        this.fixture.destroy();
        this.fixture.nativeElement.remove();
      }
      this.reset();
    });

    return this;
  }

  compileComponent(): TestComponent {
    this.fixture = this.component(this.hostType);
    this.fixture.detectChanges();
    let hostComponent = this.fixture.componentInstance;
    let debugElement = this.fixture.debugElement.query(By.directive(this.testedType));

    return new TestComponent({
      fixture: this.fixture,
      component: debugElement.injector.get(this.testedType),
      element: debugElement
    });
  }

  getComponent() {
    let comp = this.compileComponent();
    return comp;
  }

  mockPromise(obj, fn, ret) {
    spyOn(obj.prototype, fn)
      .and.callFake(() => {
        return Observable.of(ret).toPromise();
      });
  }
}

export class TestComponent {
  public externalFix;
  public component;
  public element;

  constructor(data){
    this.externalFix = data.fixture;
    this.component = data.component;
    this.element = data.element;
  }

  byCss(query: string): void {
    return this.element.query(By.css(query)).nativeElement;
  }

  clickIn(query: string): void {
    this.element.query(By.css(query)).nativeElement.click();
    return this.tick();
  }

  setValue(query: string, value: string): void {
    let input: HTMLInputElement = this.element.query(By.css(query)).nativeElement;
    input.value = value;
    input.dispatchEvent(new Event('change'));
    input.dispatchEvent(new Event('input'));
  }

  tick() {
    this.externalFix.detectChanges();
    return this.externalFix.whenStable();
  }
}
