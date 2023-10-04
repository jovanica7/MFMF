import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ProfileRoutingModule } from './wrapper-routing.module';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeeProfileComponent } from './employee-profile/employee-profile.component';

@NgModule({
  declarations: [EmployeeProfileComponent, EmployeeListComponent],
  imports: [CommonModule, ProfileRoutingModule, FormsModule, ReactiveFormsModule],
  exports: [EmployeeListComponent],
})
export class WrapperModule {
}
