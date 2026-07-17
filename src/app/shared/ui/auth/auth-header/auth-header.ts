import { Component, input } from '@angular/core';

@Component({
  selector: 'app-auth-header',
  standalone: true,
  templateUrl: './auth-header.html',
  styleUrl: './auth-header.scss'
})
export class AuthHeader {

  title = input.required<string>();

  subtitle = input.required<string>();

}