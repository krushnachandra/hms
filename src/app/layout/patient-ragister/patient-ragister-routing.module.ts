import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PatientRagisterComponent } from './patient-ragister.component';

const routes: Routes = [
    {
        path: '',
        component: PatientRagisterComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PatientRagisterRoutingModule {}
