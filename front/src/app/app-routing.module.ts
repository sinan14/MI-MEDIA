import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { CareerComponent } from './career/career.component';
import { AuthGuard } from './GUARDS/auth.guard';
import { LoginComponent } from './login/login.component';
import { PdfComponent } from './pdf-viewer/pdf-viewer.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  { path: '', component: CareerComponent, pathMatch: 'full' },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },

  {
    path: 'admin',
    canActivate: [AuthGuard],
    component: AdminPanelComponent,
  },
  { path: 'pdf', component: PdfComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
