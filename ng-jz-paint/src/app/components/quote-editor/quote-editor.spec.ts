import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuoteEditor } from './quote-editor';

describe('QuoteEditor', () => {
  let component: QuoteEditor;
  let fixture: ComponentFixture<QuoteEditor>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuoteEditor]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuoteEditor);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
