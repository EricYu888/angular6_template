import { Component, ElementRef, Input, OnInit, Output, EventEmitter, forwardRef, ViewChild, ChangeDetectorRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms'

@Component({
  selector: 'app-search',
  templateUrl: './app-search.component.html',
  styleUrls: ['app-search.component.scss'],
  providers:[{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => AppSearchComponent),
    multi: true
  }]
})
export class AppSearchComponent implements OnInit, ControlValueAccessor {

  @Input() placeholder: any;
  @Input() cssClass: any;
  @Input() resultlist: any;
  @Output() onInput: EventEmitter<any> = new EventEmitter<any>();
  @Output() itemClik: EventEmitter<any> = new EventEmitter<any>();

  _value = '';

  hasFocus = false;

  constructor(private cd: ChangeDetectorRef) { }

  propagateChange: Function = () => { };

  ngOnInit() { }

  inputInput(e) {
    if (this._value != '') {
      this.propagateChange(this._value);
      this.onInput.emit(this._value);
    }
  }

  set value(v:any){
    if(v!==this._value){
        this._value=v;
        this.propagateChange(this._value)
    }
  } 

  get value(){
      return this._value;
  }


  itemClick(item) {
    this.itemClik.emit(item);
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
    this.propagateChange(this._value);
  }

  inputFocus(e) {
    this.hasFocus = true;
  }

  inputBlur(e) {
    setTimeout(() => {
      this.hasFocus = false;
    }, 200);
  }
}
