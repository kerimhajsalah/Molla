import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PicturesFormComponent } from './pictures-form.component';

describe('PicturesFormComponent', () => {
  let component: PicturesFormComponent;
  let fixture: ComponentFixture<PicturesFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PicturesFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PicturesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
