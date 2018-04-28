import { HospitalService } from './service/hospital-service';
import { SpecialistService } from './service/specialist-service';
import { AuthenticationService } from './service/authentication.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthGuard } from './shared';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { PatientService } from './service/patient-service';
import { DoctorService } from './service/doctorList-service';
// AoT requires an exported function for factories
export function createTranslateLoader(http: HttpClient) {
    // for development
    // return new TranslateHttpLoader(http, '/start-angular/SB-Admin-BS4-Angular-5/master/dist/assets/i18n/', '.json');
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        HttpModule,
        FormsModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: createTranslateLoader,
                deps: [HttpClient]
            }
        }),
        ToastrModule.forRoot(), // ToastrModule added,
        AppRoutingModule
    ],
    declarations: [AppComponent],
    providers: [AuthGuard
        , AuthenticationService
        , HospitalService
        , SpecialistService
        , PatientService
        , DoctorService],
    bootstrap: [AppComponent]
})
export class AppModule {}
