import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrl: './page-header.component.scss'
})
export class PageHeaderComponent {
  @Input('page-title') pageTitle = ''
  @Input('button-class') buttonClass = ''
  @Input('button-text') buttonText = ''
  @Input('button-link') buttonLink = ''
  @Input('show-button') showButton = true
}
