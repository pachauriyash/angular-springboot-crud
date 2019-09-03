import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs";
import { EmployeeService } from '../employee.service';
import { Employee } from "../employee";

@Component({
  selector: 'app-search-employee',
  templateUrl: './search-employee.component.html',
  styleUrls: ['./search-employee.component.css']
})
export class SearchEmployeeComponent implements OnInit {
	salary : number;
	employees : Observable<Employee[]>;

  constructor(private employeeService: EmployeeService) { }

  ngOnInit() {
	this.salary = 0;
  }
  
  search()
  {
	this.employeeService.searchEmployees(this.salary)
      .subscribe(data => {
        console.log(data)
        this.employees = data;
      }, error => console.log(error));
  }
  
	onSubmit() {
    this.search();    
  }
}
