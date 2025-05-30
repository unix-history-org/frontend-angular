import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { OsDetailComponent } from './os-detail/os-detail.component';
import { OsComponent } from './os/os.component';
import { LicenseComponent } from './license/license.component';

const routes: Routes = [
  { path: '', redirectTo: 'os', pathMatch: 'full' },
  { path: 'os', component: OsComponent },
  { path: 'os/:id', component: OsDetailComponent },
  { path: 'license', component: LicenseComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
