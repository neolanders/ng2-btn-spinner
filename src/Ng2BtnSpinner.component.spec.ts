import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import {} from 'jasmine';
import { Ng2BtnSpinnerComponent } from './Ng2BtnSpinner.component';

describe('Ng2BtnSpinnerComponent', () => {

  let comp:    Ng2BtnSpinnerComponent;
  let fixture: ComponentFixture<Ng2BtnSpinnerComponent>;
  let de:      DebugElement;
  let el:      HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ Ng2BtnSpinnerComponent ], // declare the test component
    });

    fixture = TestBed.createComponent(Ng2BtnSpinnerComponent);

    comp = fixture.componentInstance; // BannerComponent test instance

    // query for the title <h1> by CSS element selector
    de = fixture.debugElement.query(By.css('h1'));
    el = de.nativeElement;
  });

  it('Should be false', () => {
    expect(false).toBe(true);
  });
});
