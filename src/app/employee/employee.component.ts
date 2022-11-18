import { Component, OnInit } from '@angular/core';
import {ApiService} from "../providers/api.service";
import {FormBuilder} from "@angular/forms";

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})

export class EmployeeComponent implements OnInit {

  employees:any = []
  show_form_employees: boolean = false;
  form_employee = this.fb.group({
    id:[''],
    employee_name:[''],
    employee_lastname:[''],
    employee_address:[''],
    employee_telephone:[''],
    employee_birthday:[''],
    employee_username:[''],
    employee_password:['']
  })
  selectedEmployee: any;

  constructor(private api:ApiService, private fb:FormBuilder) { }

  ngOnInit(): void {
    this.get_employees()
  }

  get_employees(){
    this.api.get('employee')
      .subscribe(
        data=>{
          this.employees = data
          console.log(data)
        }
      )
  }

  save_employee() {
    this.api.post('employee', this.form_employee.value)
      .subscribe(
        data=>{
          if(data !=undefined){
            this.get_employees()
            this.show_form_employees = false
            this.form_employee.reset()
          }else {
            //TODO
          }
        }
      )
  }

  update_employee() {
    this.api.update('employee', this.form_employee.value, this.form_employee.value['id'])
      .subscribe(
        data=>{
          if(data !=undefined){
            this.get_employees()
            this.show_form_employees = false
            this.form_employee.reset()
          }else {
            //TODO
          }
        }
      )
  }

  fill_form_employee() {
    this.form_employee.reset()
    this.form_employee.patchValue({
      id:this.selectedEmployee.id,
      employee_name: this.selectedEmployee.employee_name,
      employee_lastname: this.selectedEmployee.employee_lastname,
      employee_address: this.selectedEmployee.employee_address,
      employee_telephone: this.selectedEmployee.employee_telephone,
      employee_birthday: this.selectedEmployee.employee_birthday,
      employee_username: this.selectedEmployee.employee_username,
      employee_password: this.selectedEmployee.employee_password
    })
    this.show_form_employees = true;
  }

  save(){
    if(this.form_employee.value['id']){
      this.update_employee()
    }else {
      this.save_employee()
    }
  }

  clean_form(){
    this.form_employee.reset()
    this.show_form_employees = false
  }
}
