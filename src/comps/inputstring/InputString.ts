/**
 Custom Form numeric enforcer component compatible with both template and reactive forms

 While <input type="number> sort of works, it does not prevent the user
 from still entering invalid values via pasting wrong text, enter the letter 'e'
 and a number of other ways that users can find to screw your SQL numeric only database entries.

 This simple to use component will make sure you will never get anything but
 allowed values within your selected range (+, -, decimal point).. enjoy,

 Sean

 =====================

 Originally based on examples from:
 http://almerosteyn.com/2016/04/linkup-custom-control-to-ngcontrol-ngmodel
 http://blog.thoughtram.io/angular/2016/07/27/custom-form-controls-in-angular-2.html



 /////////////////////////////////// api ///////////////////////////////////////////

 (onChange):                        notify when a change occurred, includes value and if change is from keUp or final value
 [defaultValue]="88"                starting value as well as reset value, make sure it falls between your range values
 [step]="0.1"                       options include 'any', 1, 0.1, 0.5 ...
 [safe]="true"                     if you set safe to true be sure to set step to 1
 [textholder]="'numbers please'"    placeholder text
 [stringRangeMin]="-10.5"          min value allowed
 [stringRangeMax]="102"            max value allowed
 [formControl]="someValue">         for reactive forms, or use ngModel


 /////////////////////////////////// example ///////////////////////////////////////////

 <InputString
 (onChange)="runMeAndShowValue($event)"
 [defaultValue]="88"
 [step]="0.1"
 [safe]="true"
 [textholder]="'numbers please'"
 [stringRangeMin]="-10.5"
 [stringRangeMax]="102"
 [formControl]="someValue">
 </InputString>
 <small [hidden]="contGroup.controls.duration.valid || contGroup.controls.duration.pristine">invalid value</small>

 and add CSS

 .ng-valid[required] { border-left: 5px solid green; }
 .ng-invalid { border-left: 5px solid red; }
 **/

import {
    Component,
    forwardRef,
    Input,
    OnChanges,
    ElementRef,
    Renderer,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    ViewChild,
    Output,
    EventEmitter
} from "@angular/core";
import * as _ from "lodash";
import {
    FormControl,
    ControlValueAccessor,
    NG_VALUE_ACCESSOR,
    NG_VALIDATORS
} from "@angular/forms";

export function createCounterRangeValidator(maxValue, minValue) {
    return (c: FormControl) => {
        let err = {
            rangeError: {
                given: c.value,
                max: maxValue || 10,
                min: minValue || 0
            }
        };
        // console.log('value: ' + c.value);
        var res = (c.value.length > +maxValue || c.value.length < +minValue) ? err : null;
        return res;
    }
}

@Component({
    selector: 'InputString',
    host: {
        '(blur)': 'onBlur($event)'
    },
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <div (click)="$event.preventDefault()">
            <input #inputElement
                   required 
                   (keyup)="onKeyUp($event)"
                   value="{{stringValue}}"                   
                   placeholder="{{placer}}"
                   type="text"                    
                   class="form-control" 
                   (blur)="onBlur($event)"/>
                   <!--
                   you can also use code below to always include an error as part of the component
                   required minlength="3"
                   <p *ngIf="!inputElement.checkValidity()">not valid</p>-->
			         <!--<pre>{{ inputElement.value | json }}-->
			       <!--</pre>-->
                   
        </div>
  `,
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => InputString),
        multi: true
    }, {
        provide: NG_VALIDATORS,
        useExisting: forwardRef(() => InputString),
        multi: true
    }]
})
export class InputString implements ControlValueAccessor, OnChanges {

    constructor(private elRef: ElementRef, private renderer: Renderer, private cd: ChangeDetectorRef) {
    }

    @ViewChild('inputElement') inputElement: ElementRef;

    @Input('stringValue') _stringValue;

    @Input() stringRangeMax;

    @Input() stringRangeMin;

    @Input() safe:boolean = false;

    @Input() defaultValue = '';

    @Input()
    set textholder(i_placer: string) {
        this.placer = i_placer;
    }

    @Output() onChange: EventEmitter<any> = new EventEmitter<any>();

    ngOnInit() {
        this.writeValue(this.defaultValue);
    }

    private placer: string = ''

    stringFixLength(i_value){
        return i_value.substr(0, this.stringRangeMax)
    }

    stringFixSafe(i_value){
        return i_value;
    }

    onKeyUp(event) {
        var v = event.target.value;
        if (v.length == 0)
            return;
        this.onBlur(event, true)
    }

    onBlur($event, fromKeyUp: boolean = false) {
        var s = $event.target.value;
        if (!fromKeyUp && (this.validateFn({value: s}))) {
            s = this.stringFixLength(s);
            this.writeValue(s);
        } else {
            this.writeValue(s);
        }

        /** fire custom input-blur so we can easily bind to any changes using our custom BlurForwarder directive **/
        this.renderer.invokeElementMethod(this.elRef.nativeElement, 'dispatchEvent', [new CustomEvent('input-blur', {bubbles: true})]);

        /** fire even for onChange and notify when final value is being delivered **/
        this.onChange.emit({
            value: s,
            finalValue: !fromKeyUp
        });

        // or just
        // el.dispatchEvent(new CustomEvent('input-blur', { bubbles: true }));
        // if you don't care about outside dom compatibility
        this.cd.markForCheck();
    }

    propagateChange: any[] = [];
    validateFn: any = () => {
    };


    get stringValue() {
        return this._stringValue;
    }

    set stringValue(val) {
        this._stringValue = val;
        this.propagateChange.forEach(fn => fn(val));
    }

    ngOnChanges(inputs) {
        if (inputs.stringRangeMax || inputs.stringRangeMin) {
            this.validateFn = createCounterRangeValidator(this.stringRangeMax, this.stringRangeMin);
        }
    }

    writeValue(value) {
        if (_.isUndefined(value))
            return;
        if (this.safe){
            value = this.stringFixSafe(value);
        }
        this.stringValue = value;
        this.cd.markForCheck();
        // this.inputElement.nativeElement.value = value;
    }

    registerOnChange(fn) {
        this.propagateChange.push(fn);
    }

    registerOnTouched(fn) {
    }

    validate(c: FormControl) {
        return this.validateFn(c);
    }
}