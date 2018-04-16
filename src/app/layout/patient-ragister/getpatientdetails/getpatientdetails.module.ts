import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GetPatientDetailsRoutingModule } from './getpatientdetails-routing.module';
import { GetPatientDetailsComponent1 } from './getpatientdetails.component.spec';
import { FormsModule } from '@angular/forms';

@NgModule({
    imports: [CommonModule, GetPatientDetailsRoutingModule, FormsModule],
    declarations: [GetPatientDetailsComponent1]
})
export class GetPatientDetailsModule {}
