import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'default-input',
  imports: [],
  templateUrl: './default-input.html',
  styleUrl: './default-input.scss',
})
export class DefaultInput {
  @Input() placeholder = 'Enter text';
  @Input() value: string = '';
  @Output() valueChange = new EventEmitter<string>();

  onInputChange(event: Event) {
    const target = event.target as HTMLInputElement;
    this.value = target.value;
    this.valueChange.emit(this.value);
  }
}
