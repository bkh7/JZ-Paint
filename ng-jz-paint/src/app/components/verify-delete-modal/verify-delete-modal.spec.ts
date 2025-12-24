import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyDeleteModal } from './verify-delete-modal';

describe('VerifyDeleteModal', () => {
  let component: VerifyDeleteModal;
  let fixture: ComponentFixture<VerifyDeleteModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerifyDeleteModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerifyDeleteModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
