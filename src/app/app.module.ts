import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';

import { AppComponent } from './app.component';
import { AdminComponent } from './admin/admin.component';
import { OsComponent } from './os/os.component';
import { OsDetailComponent } from './os-detail/os-detail.component';
import { AppRoutingModule } from './app-routing.module';
import { NgCarouselModule } from '@silmar/ng-carousel';
import { NgTerminalModule } from 'ng-terminal';
import { NgNovncComponent } from './ng-novnc/ng-novnc.component';


@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    OsComponent,
    OsDetailComponent,
    NgNovncComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    NgCarouselModule,
    NgTerminalModule
  ],
  providers: [],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
