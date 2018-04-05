import { Component, OnInit } from '@angular/core';
import { Employee } from '../class/employee';
import { ThirdPartyService } from '../services/third-party.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
  providers: [ThirdPartyService]
})
export class EmployeeComponent implements OnInit {

  public employee: Employee;
  public editable = false;

  constructor(private thirdPartyService: ThirdPartyService) {
    this.employee = new Employee();
  }

  ngOnInit() {

  }

}
