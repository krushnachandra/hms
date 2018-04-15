import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DoctorRagisterRoutingModule } from './doctor-ragister-routing.module';
import { DoctorRagisterComponent } from './doctor-ragister.component';
import { FormsModule } from '@angular/forms';

@NgModule({
    imports: [CommonModule, DoctorRagisterRoutingModule, FormsModule],
    declarations: [DoctorRagisterComponent]
})
export class DoctorRagisterModule {}
