import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Menclothing } from './menclothing';

describe('Menclothing', () => {
  let component: Menclothing;
  let fixture: ComponentFixture<Menclothing>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Menclothing]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Menclothing);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
