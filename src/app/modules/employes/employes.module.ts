import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// Modules
import { CoreModule } from '../core/core.module';

// Pages
import { ListComponent } from './pages/list/list.component';
import { CreateComponent } from './pages/create/create.component';
import { CreateEmployeeComponent } from './forms/create/create.component';

// Services
import { EmployeService } from './services/employe.service';

@NgModule({
  declarations: [ListComponent, CreateComponent, CreateEmployeeComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    CoreModule,
    RouterModule.forChild([
      {
        path: 'list',
        component: ListComponent
      },
      {
        path: 'create',
        component: CreateComponent
      },
      {
        path: 'edit/:id',
        component: CreateComponent
      }
    ]),
  ],
  providers: [EmployeService]
})
export class EmployesModule { }
