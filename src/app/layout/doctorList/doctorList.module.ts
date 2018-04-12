import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbCarouselModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { DoctorListRoutingModule } from './doctorList-routing.module';
import { DoctorListComponent } from './doctorList.component';
import { PageHeaderModule } from './../../shared';

@NgModule({
    imports: [CommonModule, DoctorListRoutingModule, PageHeaderModule],
    declarations: [DoctorListComponent]
})
export class DoctorListModule {}
