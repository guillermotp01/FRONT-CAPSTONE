import { ComponentFixture, TestBed } from '@angular/core/testing';

import  RegistrarOrganizacionComponent  from './registrar-organizacion.component';

describe('RegistrarOrganizacionComponent', () => {
  let component: RegistrarOrganizacionComponent;
  let fixture: ComponentFixture<RegistrarOrganizacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistrarOrganizacionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegistrarOrganizacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
