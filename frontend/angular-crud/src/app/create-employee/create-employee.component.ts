import { EmployeeService } from '../employee.service';
import { Employee } from '../employee';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css'],
  providers: [ DatePipe ]
})
export class CreateEmployeeComponent implements OnInit {
	id : number;
	empForm : FormGroup;
	submitted = false;

  constructor(private employeeService: EmployeeService,
    private router: Router, private route: ActivatedRoute,
	private formBuilder: FormBuilder, private datePipe: DatePipe) { }

  ngOnInit() {
    this.empForm = this.formBuilder.group({
		fullName: ['', Validators.required],
		designation: ['', Validators.required],
		salary: ['', Validators.required],
		joiningDate: ['', Validators.required]
	});
	this.empForm.patchValue({
		joiningDate: this.datePipe.transform(new Date(), 'yyyy-MM-dd')
	});
    this.id = this.route.snapshot.params['id'];
    
    if(this.id!=-1) {
      this.employeeService.getEmployee(this.id)
          .subscribe ((data: any) => {
		  this._id = data._id;
		  this.empForm.setValue({
        fullName: data.fullName,
        designation: data.designation,
        salary: data.salary,
		joiningDate: this.datePipe.transform(data.joiningDate, 'yyyy-MM-dd')
      });
    }, error => console.log(error)
          );
    }
  }
  
  get f() { return this.empForm.controls; }

  save() {
	  this.submitted = true;
	  if (this.empForm.invalid) {
            return;
        }
    if(this.id == -1) 
	{ 
      this.employeeService.createEmployee(this.empForm.value)
		.subscribe(data => console.log(data), error => console.log(error));
		this.router.navigate(['/employees']);
    } 
	else 
	{
      this.employeeService.updateEmployee(this.id, this.empForm.value)
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
