import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GetPatientDetailsComponent1 } from './getpatientdetails.component';

const routes: Routes = [
    {
        path: '',
        component: GetPatientDetailsComponent1
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class GetPatientDetailsRoutingModule {}
