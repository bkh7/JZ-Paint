import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuotesView } from './quotes-view';

describe('QuotesView', () => {
  let component: QuotesView;
  let fixture: ComponentFixture<QuotesView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuotesView]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuotesView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
