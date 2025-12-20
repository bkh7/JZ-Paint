import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'default-input',
  imports: [],
  templateUrl: './default-input.html',
  styleUrl: './default-input.scss',
})
export class DefaultInput {
  @Input() placeholder = 'Enter text';
  @Output() valueChange = new EventEmitter<string>();
}
