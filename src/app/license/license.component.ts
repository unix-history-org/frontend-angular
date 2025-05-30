import { Component, ViewEncapsulation } from '@angular/core';
import { MatCard, MatCardContent } from '@angular/material/card';

@Component({
  selector: 'app-license',
  templateUrl: './license.component.html',
  styleUrl: './license.component.css',
  encapsulation: ViewEncapsulation.None,
  imports: [
    MatCardContent,
    MatCard
  ],
  standalone: true
})
export class LicenseComponent {

}
