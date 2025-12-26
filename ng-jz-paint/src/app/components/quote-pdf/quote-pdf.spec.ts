import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuotePdf } from './quote-pdf';

describe('QuotePdf', () => {
  let component: QuotePdf;
  let fixture: ComponentFixture<QuotePdf>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuotePdf]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuotePdf);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
