import { EmployeeService } from '../employee.service';
import { Employee } from '../employee';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {
	employee: Employee;
	id : number;

  constructor(private employeeService: EmployeeService,
    private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    
    this.id = this.route.snapshot.params['id'];
    
    this.employee = new Employee();
    
    if(this.id!=-1) {
      this.employeeService.getEmployee(this.id)
          .subscribe (
            data => this.employee = data, error => console.log(error)
          );
    }
  }

  save() {
    if(this.id == -1) 
	{ 
      this.employeeService.createEmployee(this.employee)
		.subscribe(data => console.log(data), error => console.log(error));
		this.router.navigate(['/employees']);
    } 
	else 
	{
      this.employeeService.updateEmployee(this.id, this.employee)
		.subscribe(data => console.log(data), error => console.log(error));
		this.router.navigate(['/employees']);
    }
	//this.gotoList();
  }

  onSubmit() {
    this.save();    
  }

  gotoList() {
    this.router.navigate(['/employees']);
  }

}
