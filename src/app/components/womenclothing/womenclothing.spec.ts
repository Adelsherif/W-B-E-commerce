import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Womenclothing } from './womenclothing';

describe('Womenclothing', () => {
  let component: Womenclothing;
  let fixture: ComponentFixture<Womenclothing>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Womenclothing]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Womenclothing);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
