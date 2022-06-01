import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommandeProductsComponent } from './commande-products.component';

describe('CommandeProductsComponent', () => {
  let component: CommandeProductsComponent;
  let fixture: ComponentFixture<CommandeProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommandeProductsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommandeProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
