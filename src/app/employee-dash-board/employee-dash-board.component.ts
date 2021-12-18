import { Component, OnInit } from '@angular/core';
import{FormBuilder,FormGroup}from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { EmployeeModel } from './employee-dash board.model';

@Component({
  selector: 'app-employee-dash-board',
  templateUrl: './employee-dash-board.component.html',
  styleUrls: ['./employee-dash-board.component.css']
})
export class EmployeeDashBoardComponent implements OnInit {
  formValue !: FormGroup; 
  employeeModelObj : EmployeeModel = new EmployeeModel();
  employeeData !: any;
  showAdd !: boolean;
  showUpdate !: boolean;

  constructor(private formbuilber: FormBuilder,private api : ApiService) { }

  ngOnInit(): void {
    this.formValue = this.formbuilber.group({
      firstName : [''],
      lastName : [''],
      designation : [''],
      emailId : [''],
      mobileNo : [''],
      salary : ['']
    }) 
    this.getAllEmployee();
  }
 
  clickAddEmployee(){
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }

  postEmployeeDetails(){
    this.employeeModelObj.firstName = this.formValue.value.firstName;
    this.employeeModelObj.lastName = this.formValue.value.lastName;
    this.employeeModelObj.designation = this.formValue.value.designation;
    this.employeeModelObj.emailId = this.formValue.value.emailId;
    this.employeeModelObj.mobileNo = this.formValue.value.mobileNo;
    this.employeeModelObj.salary = this.formValue.value.salary;

    this.api.postEmployee(this.employeeModelObj)
    .subscribe(res=>{
      console.log(res);
      alert("Employee Added Successfully..!");
      let ref = document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
      this.getAllEmployee();
    },
    err=>{
      console.log(err);
      alert("Something Went Wrong..!");
    })
  }
  getAllEmployee(){
     this.api.getEmployee()
     .subscribe(res=>{
       this.employeeData = res;
     })
  }
  deleteEmployee(row : any){
    this.api.deleteEmployee(row.id)
    .subscribe(res=>{
        alert("Employee Deleted..!");
        this.getAllEmployee();
    })
  }

  onEdit(row: any){
    this.showAdd = false;
    this.showUpdate = true;

    this.employeeModelObj.id = row.id;
      this.formValue.controls['firstName'].setValue(row.firstName);
      this.formValue.controls['lastName'].setValue(row.lastName);
      this.formValue.controls['designation'].setValue(row.designation);
      this.formValue.controls['emailId'].setValue(row.emailId);
      this.formValue.controls['mobileNo'].setValue(row.mobileNo);
      this.formValue.controls['salary'].setValue(row.salary);
  }

  updateEmployeeDetails(){
    this.employeeModelObj.firstName = this.formValue.value.firstName;
    this.employeeModelObj.lastName = this.formValue.value.lastName;
    this.employeeModelObj.designation = this.formValue.value.designation;
    this.employeeModelObj.emailId = this.formValue.value.emailId;
    this.employeeModelObj.mobileNo = this.formValue.value.mobileNo;
    this.employeeModelObj.salary = this.formValue.value.salary;

    this.api.updateEmployee(this.employeeModelObj,this.employeeModelObj.id)
    .subscribe(res=>{
      console.log(res);
      alert("Updated Successfully..!");
      let ref = document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
      this.getAllEmployee();
    })
  }
}

