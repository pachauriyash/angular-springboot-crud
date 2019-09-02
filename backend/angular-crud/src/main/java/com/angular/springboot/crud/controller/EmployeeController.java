package com.angular.springboot.crud.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.angular.springboot.crud.model.Employee;
import com.angular.springboot.crud.repo.EmployeeRepository;

@CrossOrigin(origins="http://localhost:4200")
@RestController
@RequestMapping("/api")
public class EmployeeController {
	
	@Autowired
	EmployeeRepository repository;
	
	@GetMapping("/employees")
	public List<Employee> getAllEmployees()
	{
		System.out.println("Getting all employees..");
		List<Employee> employees = new ArrayList<Employee>();
		repository.findAll().forEach(employees::add);
		return employees;
	}
	
	@PostMapping("/employees")
	public Employee createEmployee(@RequestBody Employee employee)
	{
		System.out.println("Creating Employee");
		Employee _employee = repository.save(employee);
		return _employee;
	}
	
	@DeleteMapping("/employees/{id}")
	public ResponseEntity<String> deleteEmployee(@PathVariable("id") Integer id)
	{
		System.out.println("Deleting Employee");
		repository.deleteById(id);
		return new ResponseEntity<>("Employee has been deleted!", HttpStatus.OK);
	}
	
	@PutMapping("/employees/{id}")
	public ResponseEntity<Employee> updateEmployee(@PathVariable("id") Integer id, @RequestBody Employee employee)
	{
		System.out.println("Updating Employee...");
		Optional<Employee> employeeData = repository.findById(id);
		
		if(employeeData.isPresent())
		{
			Employee _employee = employeeData.get();
			_employee.setDesignation(employee.getDesignation());
			_employee.setFullName(employee.getFullName());
			_employee.setSalary(employee.getSalary());
			return new ResponseEntity<>(repository.save(_employee), HttpStatus.OK);
		}
		else
		{
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	@GetMapping("/employees/{id}")
	public ResponseEntity<Employee> getEmployee(@PathVariable("id") Integer id)
	{
		System.out.println("Getting employee");
		Optional<Employee> employeeData = repository.findById(id);
		if(employeeData.isPresent())
		{
			Employee employee = employeeData.get();
			return new ResponseEntity<>(employee, HttpStatus.OK);
		}
		else
		{
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
}
