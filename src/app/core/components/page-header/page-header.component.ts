import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrl: './page-header.component.scss'
})
export class PageHeaderComponent {
  @Input('page-title') pageTitle: string = ''
  @Input('button-class') buttonClass: string = ''
  @Input('button-text') buttonText: string = ''
  @Input('button-link') buttonLink: string = ''
}