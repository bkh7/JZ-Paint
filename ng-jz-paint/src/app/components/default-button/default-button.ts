import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'default-button',
  imports: [ButtonModule],
  templateUrl: './default-button.html',
  styleUrl: './default-button.scss',
})
export class DefaultButton {

  @Input() text = 'Button';
  @Output() clicked = new EventEmitter<void>();

  onClick() {
    this.clicked.emit();
  }

}
