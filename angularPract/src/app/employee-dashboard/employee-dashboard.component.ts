import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { EmployeeModel } from './employee-dashboard.model';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.scss']
})
export class EmployeeDashboardComponent implements OnInit {

  public formValue!: FormGroup;
  public employeemodelobj: EmployeeModel = new EmployeeModel()
  public employeeData :any;

  public showAdd !:boolean;
  public showUpdate !:boolean;

  constructor(private formbuilder: FormBuilder, private _api:ApiService) { }

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      firstName : ['',Validators.required],
      lastName : ['',Validators.required],
      email    : ['',[Validators.required,Validators.email]],
      mobile   : ['',Validators.required],
      salary    : ['',Validators.required]
    })
    this.getAllEmployee();
  }


  clickAddEmployee(){
    this.formValue.reset();
    this.showAdd=true;
    this.showUpdate=false;
  }

  postEmployeeDetails(){
    this.employeemodelobj.firstName = this.formValue.value.firstName;
    this.employeemodelobj.lastName = this.formValue.value.lastName;
    this.employeemodelobj.email = this.formValue.value.email;
    this.employeemodelobj.mobile = this.formValue.value.mobile;
    this.employeemodelobj.salary = this.formValue.value.salary;

    this._api.postEmployee(this.employeemodelobj)
    .subscribe(res=>{
      console.log(res);
      alert("Employee Added Successfully")
      let reference = document.getElementById("cancel")   //to close model form automatically
      reference?.click();
      this.formValue.reset();   //to reset modal form.
      this.getAllEmployee();
    },
    _err=>{
      alert("Something went Wrong")
    })
  }

  getAllEmployee(){
    this._api.getEmployee()
    .subscribe((res)=>{
      return this.employeeData = res;
    })
  }

  deleteEmployee(row:any){
  // debugger;
    this._api.deleteEmployee(row.id)
    .subscribe(res=>{
      alert("Employee Deleted");
      this.getAllEmployee()  //to get all the data in server.
    })
  }

  onEdit(row:any){
   this.employeemodelobj.id = row.id;

   this.showAdd=false;
    this.showUpdate=true;

    this.formValue.controls['firstName'].setValue(row.firstName)
    this.formValue.controls['lastName'].setValue(row.lastName)
    this.formValue.controls['email'].setValue(row.email)
    this.formValue.controls['mobile'].setValue(row.mobile)
    this.formValue.controls['salary'].setValue(row.salary)

  }

  updateEmployeeDetails(){
    this.employeemodelobj.firstName = this.formValue.value.firstName;
    this.employeemodelobj.lastName = this.formValue.value.lastName;
    this.employeemodelobj.email = this.formValue.value.email;
    this.employeemodelobj.mobile = this.formValue.value.mobile;
    this.employeemodelobj.salary = this.formValue.value.salary;

    this._api.updateEmployee(this.employeemodelobj,this.employeemodelobj.id)
    .subscribe(res=>{
      alert("Updated Successfully")

      let reference = document.getElementById("cancel")   //to close model form automatically
      reference?.click();
      this.formValue.reset();   //to reset modal form.
      this.getAllEmployee();
    })
  }



}
