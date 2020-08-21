import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UserService } from "../_services";

export class Contact {
    constructor(
        public firstname: string,
        public lastname: string,
        public phonenumber: number,
        public email: string,
        public message: string
    ) {}
}
@Component({
    selector: "app-contact-us",
    templateUrl: "./contact-us.component.html",
})
export class ContactUsComponent implements OnInit {
    @Output() contactdata = new EventEmitter<Contact>();
    contactForm: FormGroup;
    public obj: any = {};
    constructor(private fb: FormBuilder, private service: UserService) {}
    contactReqList: any;

    ngOnInit() {
        this.contactForm = this.fb.group({
            firstname: ["", [Validators.required, 
            Validators.pattern("[a-zA-Z ]*"),
            Validators.minLength(2),
            Validators.maxLength(20)]],
            lastname: ["", [Validators.required,  
            Validators.pattern("[a-zA-Z ]*"),
            Validators.minLength(2),
            Validators.maxLength(20),]],
            phonenumber: ["", [Validators.required, Validators.pattern("[0-9 ]{10}")]],
            email: [
                "",
                [
                    Validators.required,
                    Validators.pattern(
                        "^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$"
                    ),
                ],
            ],
            message: ["", [Validators.required]],
        });
        this.service.getAllContacts().subscribe((data) => {
            console.log(data);
            this.contactReqList = data;
        });
    }

    onSubmit() {
        this.obj = { ...this.contactForm.value, ...this.obj };
        this.contactForm.value;
        console.log(
            "LOG: LoginComponent -> onSubmit -> this.contactForm.value",
            this.contactForm.value
        );

        if (this.contactForm.valid) {
            this.contactdata.emit(
                new Contact(
                    this.contactForm.value.firstname,
                    this.contactForm.value.lastname,
                    this.contactForm.value.phonenumber,
                    this.contactForm.value.email,
                    this.contactForm.value.message
                )
            );
            alert(
                "Contact Query added !!You have successfully added a Contact Query"
            );
            return this.service
                .postContact(this.contactForm.value)
                .subscribe((data) => {
                    this.ngOnInit();
                    this.contactForm.reset();
                });
        } else {
            alert("FATAL!You have entered invalid data!");
        }
    }
    deleteContactUs(id) {
      console.log(id);
      return this.service.deleteContact(id).subscribe((data) => {
        this.ngOnInit();
      });
      // delete api for deleting that contact request
    }
}
