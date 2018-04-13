import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientRagisterComponent } from './patient-ragister.component';

describe('PatientRagisterComponent', () => {
    let component: PatientRagisterComponent;
    let fixture: ComponentFixture<PatientRagisterComponent>;

    beforeEach(
        async(() => {
            TestBed.configureTestingModule({
                declarations: [PatientRagisterComponent]
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(PatientRagisterComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
