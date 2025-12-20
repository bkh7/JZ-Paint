import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultButton } from './default-button';

describe('DefaultButton', () => {
  let component: DefaultButton;
  let fixture: ComponentFixture<DefaultButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DefaultButton]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DefaultButton);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
