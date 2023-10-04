import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { Employee } from '../employee-state/models/Employee';
import { AddEmployee } from '../employee-state/actions/employee.action';

@Component({
  selector: 'app-employee-profile',
  templateUrl: './employee-profile.component.html',
  styleUrls: ['./employee-profile.component.scss'],
})
export class EmployeeProfileComponent implements OnInit {
  public form: FormGroup;

  ngOnInit(): void {}

  constructor(private fb: FormBuilder, private store: Store) {
    this.form = this.createForm();
  }

  createForm(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
    });
  }


  addEmployee(name: string, email: string): void {
    this.store.dispatch(new AddEmployee({ name, email } as Employee));
  }

 
  getEmployees(): Employee[] {
    return this.store.selectSnapshot<Employee[]>(state => state.employees.employees);
  }
}
