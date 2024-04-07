import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { OsDetailComponent } from './os-detail/os-detail.component';
import { OsComponent } from './os/os.component';
import { NgNovncComponent } from './ng-novnc/ng-novnc.component'

const routes: Routes = [
  { path: '', redirectTo: 'os', pathMatch: 'full' },
  { path: 'os', component: OsComponent },
  { path: 'os/:id', component: OsDetailComponent },
  { path: 'test_vnc', component: NgNovncComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
