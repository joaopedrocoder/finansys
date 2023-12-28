import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-server-error-messages',
  templateUrl: './server-error-messages.component.html',
  styleUrl: './server-error-messages.component.scss'
})
export class ServerErrorMessagesComponent {
  @Input('server-erroe-messages') serverErrorMessages: string[] = []
}
