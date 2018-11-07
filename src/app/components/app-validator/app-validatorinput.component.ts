import { Component, ElementRef, Input, OnInit, Output, EventEmitter, forwardRef, ViewChild, ChangeDetectorRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms'

@Component({
  selector: 'app-validator-input',
  templateUrl: 'app-validatorinput.component.html',
  providers:[{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => AppValidatorInputComponent),
    multi: true
  }]
})
export class AppValidatorInputComponent implements OnInit, ControlValueAccessor {
  @Input() startValidator: boolean;
  @Input() test: boolean;
  @Input() msg: string;
  @Input() labelname: string;
  @Input() tagName?:string;
  @Input() iconClass?: string;
  @Input() helpStr?: string;
  @Input() appendStr?: string;
  @Input() placeholder?: string;
  @Input() disabled?: boolean;
  @Input() inputType: string;
  @Input() readonly?: boolean;

  @Output() onBlur?: EventEmitter<any> = new EventEmitter<any>();
  @Output() onFocus?: EventEmitter<any> = new EventEmitter<any>();
  @Output() onKeyupEnter?: EventEmitter<any> = new EventEmitter<any>();

  propagateChange: Function = () => { };
  _value: string;

  ngOnInit() { }

  showIcon() {
    return !(this.iconClass == null);
  }

  showAppend() {
    return !(this.appendStr == null);
  }

  showHelpStr() {
    return !(this.helpStr == null);
  }

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
    if(val){
      this._value = val;
      this.cd.markForCheck();
    }
  }

  registerOnChange(fn: Function): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: Function): void {
  }

  inputValueChange() {
    console.log(11)
    this.propagateChange(this._value);
  }

  inputFocus(event: any) {
    console.log(22)
    this.onFocus.emit(event);
  }

  inputBlur(event: any) {
    console.log(33)
    this.onBlur.emit(event);
  }

  inputEnter(event: any) {
    console.log(44)
    this.onKeyupEnter.emit(event);
  }
}