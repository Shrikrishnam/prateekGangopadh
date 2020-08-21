import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ElementRef,
} from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { UserService } from "../_services";

export class Fitness {
  constructor(
      public inr: number,
      public paisa: number,
      public streetaddress: string,
      public city: string,
      public state: string,
      public country: string,
      public pincode: number,
      public phonenumber: number,
      public email: string,
      public firstname: string,
      public lastname: string,
      public age: number,
      public trainerpreference: string,
      public physiotherapist: string,
      public packages: string
  ) {}
}

@Component({
  selector: "app-place-fitness-trainer-appointment",
  templateUrl: "./place-fitness-trainer-appointment.component.html",
  styleUrls: ["./place-fitness-trainer-appointment.component.css"],
})
export class PlaceFitnessTrainerAppointmentComponent implements OnInit {
  @Output() fitnessdata = new EventEmitter<Fitness>();
  fitnessForm: FormGroup;
  public obj: any = {};
  constructor(
      private fb: FormBuilder,
      private router: Router,
      private userSer: UserService,
      private el: ElementRef,
      private route: ActivatedRoute
  ) {}
  id: number;
  currentUser: any = null;
  ngOnInit() {
      this.fitnessForm = this.fb.group({
          firstname: [
              "",
              [
                  Validators.required,
                  Validators.pattern("[a-zA-Z ]*"),
                  Validators.minLength(2),
                  Validators.maxLength(20),
              ],
          ],
          lastname: [
              "",
              [
                  Validators.required,
                  Validators.pattern("[a-zA-Z ]*"),
                  Validators.minLength(2),
                  Validators.maxLength(20),
              ],
          ],
          phonenumber: [
              "",
              [Validators.required, Validators.pattern("[0-9 ]{10}")],
          ],
          email: [
              "",
              [
                  Validators.required,
                  Validators.pattern(
                      "^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$"
                  ),
              ],
          ],
          age: [
              "",
              [Validators.required, Validators.min(18), Validators.max(60)],
          ],
          streetaddress: ["", [Validators.required]],
          city: ["", [Validators.required]],
          state: ["", [Validators.required]],
          country: ["", [Validators.required]],
          pincode: ["", [Validators.required]],
          trainerpreference: ["", [Validators.required]],
          physiotherapist: ["", [Validators.required]],
          inr: ["", [Validators.required]],
          paisa: ["", [Validators.required]],
          packages: ["", [Validators.required]],
          id: [],
      });

      this.id = this.route.snapshot.params.id;
      if (this.id != undefined) {
          this.fillForm();
      }
    
  }
  fillForm() {
      this.userSer.getOneAppointment(+this.id).subscribe(
          (data) => {
              this.currentUser = data;
              this.currentUser["id"] = this.id;
              this.fitnessForm.setValue(this.currentUser);
              console.log(this.fitnessForm);
          },
          (error) => {
              console.log(error);
          }
      );
  }

  onSubmit() {
      this.obj = { ...this.fitnessForm.value, ...this.obj };
      this.fitnessForm.value;
      console.log("FORM STATUS ===>>>> ", this.fitnessForm.status);
      const invalid = [];
      const controls = this.fitnessForm.controls;
      for (const name in controls) {
          if (controls[name].invalid) {
              invalid.push(name);
          }
      }
      // promt for invalid feilds
      if (invalid.length > 0) {
          alert("You have entered INVALID values of  " + invalid + " fields");
      }
      // focus on invalid feilds
      for (const key of Object.keys(this.fitnessForm.controls)) {
          if (this.fitnessForm.controls[key].invalid) {
              const invalidControl = this.el.nativeElement.querySelector(
                  '[formcontrolname="' + key + '"]'
              );
              invalidControl.focus();
              break;
          }
      }
      if (this.fitnessForm.status == "VALID") {
          this.fitnessdata.emit(
              new Fitness(
                  this.fitnessForm.value.inr,
                  this.fitnessForm.value.paisa,
                  this.fitnessForm.value.streetaddress,
                  this.fitnessForm.value.city,
                  this.fitnessForm.value.state,
                  this.fitnessForm.value.country,
                  this.fitnessForm.value.pincode,
                  this.fitnessForm.value.phonenumber,
                  this.fitnessForm.value.email,
                  this.fitnessForm.value.firstname,
                  this.fitnessForm.value.lastname,
                  this.fitnessForm.value.age,
                  this.fitnessForm.value.trainerpreference,
                  this.fitnessForm.value.physiotherapist,
                  this.fitnessForm.value.packages
              )
          );

          console.log(this.id);
          if (this.id == undefined) {
              this.addAppointment();
          } else {
              this.editAppointment();
          }
      }
  }

  addAppointment() {
      console.log("Adding");
      this.userSer.postfitnessdata(this.fitnessForm.value).subscribe(
          (success) => {
              console.log(success);
              this.router.navigateByUrl("/view-appointment");
          },
          (error) => {
              console.log(error);
          }
      );
  }

  editAppointment() {
      console.log("Editing");
      this.userSer.editAppointment(this.fitnessForm.value).subscribe(
          (success) => {
              console.log(success);
              this.router.navigateByUrl("/view-appointment");
          },
          (error) => {
              console.log(error);
          }
      );
  }
}
