import { Employee } from '../models/Employee';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { AddEmployee, RemoveEmployee } from '../actions/employee.action';

export class EmployeeStateModel {
  employees!: Employee[];
}

@State<EmployeeStateModel>({
  name: 'employees',
  defaults: {
    employees: [],
  },
})
@Injectable()
export class EmployeeState {

  @Selector()
  static getEmployees(state: EmployeeStateModel): Employee[] {
    return state.employees;
  }

  @Action(AddEmployee)
  add(
    { getState, patchState, setState }: StateContext<EmployeeStateModel>,
    { payload }: AddEmployee,
  ): void {
    const state = getState();
    if (state?.employees) {
      patchState({
        employees: [...state.employees, payload],
      });
    } else {
      setState({
        employees: [payload],
      });
    }
  }

  
  @Action(RemoveEmployee)
  remove({ getState, setState }: StateContext<EmployeeStateModel>, { payload }: AddEmployee): void {
    const state = getState();
    if (state?.employees) {
      setState({
        employees: state.employees.filter(u => !(u.email === payload.email && u.name === payload.name)),
      });
      console.log(
        'state',
        payload,
        state.employees.filter(u => !(u.email == payload.email && u.name == payload.name)),
      );
    }
  }
}
