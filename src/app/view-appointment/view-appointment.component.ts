import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services';


@Component({
  selector: 'app-view-appointment',
  templateUrl: './view-appointment.component.html',
  styleUrls:['./view-appointment.component.css']
})
export class ViewAppointmentComponent implements OnInit {
allAppointments:any
  constructor(private service:UserService) { }

  

  ngOnInit() {
    this.service.getfitnessdata().subscribe((data) => {
      this.allAppointments = data;
    });
    
  }
  deleteApp(id)
  {
    console.log(id);
    return this.service.deleteAppointment(id).subscribe((data) => {
      this.ngOnInit();
    });
  }
  
  getfitness() {
    
  }
}
