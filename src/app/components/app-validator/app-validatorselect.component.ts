import { Component, ElementRef, Input, OnInit, Output, EventEmitter, forwardRef, ViewChild, ChangeDetectorRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms'

@Component({
  selector: 'app-validator-select',
  templateUrl: 'app-validatorselect.component.html',
  providers:[{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => AppValidatorSelectComponent),
    multi: true
  }]
})
export class AppValidatorSelectComponent implements OnInit, ControlValueAccessor {
  @Input() startValidator: boolean;
  @Input() test: boolean;
  @Input() msg: string;
  @Input() labelname: string;
  @Input() tagName?:string;
  @Input() placeholder: string;
  @Input() disabled?: boolean;
  @Input() optionlist: any;
  @Input() readonly?: boolean;

  @Output() onChange?: EventEmitter<any> = new EventEmitter<any>();
  
  propagateChange: Function = () => { };
  _value: string;

  ngOnInit() { }

  invalidate() {
    return this.startValidator && !this.test;
  }

  constructor(private cd: ChangeDetectorRef) { }

  set value(v:any){
    if(v!==this._value){
        this._value=v;
        this.propagateChange(this._value)
    }
  }

  get value(){
      return this._value;
  }

  writeValue(val: any): void {
    this._value = val;
    this.cd.markForCheck();
  }

  registerOnChange(fn: Function): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: Function): void {
  }

  selectValueChange(event: any) {
    this.propagateChange(this._value);
    this.onChange.emit(event)
  }

}