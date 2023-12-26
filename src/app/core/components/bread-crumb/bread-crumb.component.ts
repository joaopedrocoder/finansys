import { Component, Input } from '@angular/core';

interface IBreadCrumbItem {
  text: string
  link?: string
} 

@Component({
  selector: 'app-bread-crumb',
  templateUrl: './bread-crumb.component.html',
  styleUrl: './bread-crumb.component.scss'
})
export class BreadCrumbComponent {
  @Input() items: IBreadCrumbItem[] = []
  
}
