import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Skleton } from './skleton';

describe('Skleton', () => {
  let component: Skleton;
  let fixture: ComponentFixture<Skleton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Skleton]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Skleton);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
