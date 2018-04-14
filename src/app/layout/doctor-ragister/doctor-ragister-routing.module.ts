import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DoctorRagisterComponent } from './doctor-ragister.component';

const routes: Routes = [
    {
        path: '',
        component: DoctorRagisterComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DoctorRagisterRoutingModule {}
