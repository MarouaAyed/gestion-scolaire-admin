import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { NgChartjsModule } from 'ng-chartjs'; 
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';

// Import components
import { AdminLayoutComponent } from './admin-layout.component';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { ComponentsModule } from '../../components/components.module';
// Other component imports...

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(AdminLayoutRoutes),
    RouterModule, ComponentsModule ,
    FormsModule,
    NgChartjsModule,
    NgbModule,
    ToastrModule.forRoot()
  ],
  declarations: [
    AdminLayoutComponent,
    DashboardComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AdminLayoutModule {}
