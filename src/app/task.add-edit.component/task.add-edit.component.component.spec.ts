import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskAddEditComponentComponent } from './task.add-edit.component.component';

describe('TaskAddEditComponentComponent', () => {
  let component: TaskAddEditComponentComponent;
  let fixture: ComponentFixture<TaskAddEditComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TaskAddEditComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TaskAddEditComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
