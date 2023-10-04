import * as React from 'react';
import { FunctionComponent } from 'react';

import './employee-list-style.css';

export interface Employee { 
  name: string,
  email: string
}

export interface EmployeeListProps {
  employees: Array<Employee>;
  onClick: (data: Employee) => void;
}

export const EmployeeListReactComponent: FunctionComponent<EmployeeListProps> = (props: EmployeeListProps) => {

  const removeEmployee = (employeeToRemove: Employee) => {
    props.onClick(employeeToRemove);
  };


  return (
    <div className="container">
      {
       props.employees.length ? (<table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {props.employees.map((employee, i) =>
                <tr key={i}>
                  <td>{employee.name}</td>
                  <td>{employee.email}</td>
                  <td>
                    <button onClick={() => removeEmployee(employee)}>Remove Employee</button>
                  </td>
                </tr>)}
            </tbody>
          </table>): <h3 className='empty-list-message'>----- No employee added -----</h3> 
      } </div>);
}
