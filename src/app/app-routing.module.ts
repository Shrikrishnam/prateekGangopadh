import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LandingPageComponent } from "./landing-page/landing-page.component";
import { ContactUsComponent } from "./contact-us/contact-us.component";
import { ViewAppointmentComponent } from "./view-appointment/view-appointment.component";
import { PlaceFitnessTrainerAppointmentComponent } from "./place-fitness-trainer-appointment/place-fitness-trainer-appointment.component";


const routes: Routes = [
    { path: "landing-page", component: LandingPageComponent },
    {
        path: "place-fitness-trainer-appointment",
        children: [
            {
                path: "edit/:id",
                component: PlaceFitnessTrainerAppointmentComponent,
                data: { title: "Edit Appointment" },
            },
            {
                path: "",
                component: PlaceFitnessTrainerAppointmentComponent,
                data: {
                    title: "Place Appointment",
                },
            },
        ],
    },
    { path: "view-appointment", component: ViewAppointmentComponent },
    { path: "contact-us", component: ContactUsComponent },
    { path: "**", redirectTo: "landing-page" },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
