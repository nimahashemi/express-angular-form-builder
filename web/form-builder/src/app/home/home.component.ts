import { Component } from '@angular/core';
import { FormService } from '../_services/form.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  content?: string;

  constructor(private formService: FormService) {}


}
