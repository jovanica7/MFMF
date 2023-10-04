import { Component, ElementRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngxs/store';
import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { RemoveEmployee } from '../employee-state/actions/employee.action';
import { Employee } from '../employee-state/models/Employee';

const containerElementName = 'customReactComponentContainer';

@Component({
  selector: 'app-employee-list',
  template: ` <h2 style="color: cadetblue">Employee List (React Microfrontend)</h2>
    <div style="font-family: Inter, sans-serif; color: rgb(140, 137, 137, 1); font-size: 13px">
      This employee list component is being remotely loaded into the application from React App using
      Webpack Module Federation
    </div>
    <span #${containerElementName}></span>`,
  encapsulation: ViewEncapsulation.None,
})
export class EmployeeListComponent {
  @ViewChild(containerElementName, { static: true }) containerRef!: ElementRef;
  root!: any;

  constructor(private store: Store) {
    this.handleClicked = this.handleClicked.bind(this);
  }

  handleClicked(employee: Employee) {
    this.removeEmployee(employee.name, employee.email);
  }

  removeEmployee(name: string, email: string): void {
    this.store.dispatch(new RemoveEmployee({ name, email } as Employee));
  }

  ngAfterViewInit() {
    this.root = createRoot(this.containerRef.nativeElement);
    this.root.render('Loading script...');
    try {
      import('react_remote/EmployeeListReactComponent').then(val => {
        this.store
          .select<Employee[]>(state => state.employees.employees)
          .subscribe(employees => {
            this.root.render(
              React.createElement(val.EmployeeListReactComponent, {
                employees,
                onClick: this.handleClicked,
              }),
            );
          });
      });
    } catch (error) {
      console.log('Erorr', error);
    }
  }

  ngOnDestroy() {
    this.root.unmountComponentAtNode(this.containerRef.nativeElement);
  }
}
