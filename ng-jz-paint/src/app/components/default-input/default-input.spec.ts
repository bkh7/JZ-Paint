import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultInput } from './default-input';

describe('DefaultInput', () => {
  let component: DefaultInput;
  let fixture: ComponentFixture<DefaultInput>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DefaultInput]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DefaultInput);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
