import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PatientRagisterRoutingModule } from './patient-ragister-routing.module';
import { PatientRagisterComponent } from './patient-ragister.component';
import { FormsModule } from '@angular/forms';

@NgModule({
    imports: [CommonModule, PatientRagisterRoutingModule, FormsModule],
    declarations: [PatientRagisterComponent]
})
export class PatientRagisterModule {}
