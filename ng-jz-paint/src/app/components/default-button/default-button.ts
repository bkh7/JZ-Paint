import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { NgClass } from "@angular/common";

@Component({
  selector: 'default-button',
  imports: [ButtonModule, NgClass],
  templateUrl: './default-button.html',
  styleUrl: './default-button.scss',
})
export class DefaultButton {

  @Input() text = 'Button';
  @Input() class: string = '';
  @Output() clicked = new EventEmitter<void>();

  onClick() {
    this.clicked.emit();
  }

}
