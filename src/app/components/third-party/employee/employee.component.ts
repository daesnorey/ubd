import { Component, OnInit } from '@angular/core';
import { Employee } from '../class/employee';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  public employee: Employee;
  public editable = false;

  constructor() {
    this.employee = new Employee();
  }

  ngOnInit() {
  }

}
