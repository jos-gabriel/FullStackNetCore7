import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteClienteComponent } from './delete-cliente.component';

describe('DeleteClienteComponent', () => {
  let component: DeleteClienteComponent;
  let fixture: ComponentFixture<DeleteClienteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteClienteComponent]
    });
    fixture = TestBed.createComponent(DeleteClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
