import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksByStatusComponent } from './tasks-by-status.component';

describe('TasksByStatusComponent', () => {
  let component: TasksByStatusComponent;
  let fixture: ComponentFixture<TasksByStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TasksByStatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TasksByStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
