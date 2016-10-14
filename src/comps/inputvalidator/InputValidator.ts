/** Form custom counter component compatible with both template and model forms
 References:
 http://almerosteyn.com/2016/04/linkup-custom-control-to-ngcontrol-ngmodel
 http://blog.thoughtram.io/angular/2016/07/27/custom-form-controls-in-angular-2.html
 **/
import {
    Component,
    OnInit,
    forwardRef,
    Input,
    OnChanges,
    ElementRef,
    Renderer,
    ChangeDetectionStrategy
} from '@angular/core';
import * as _ from 'lodash';

import { FormControl, ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS } from '@angular/forms';

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
        return (c.value > +maxValue || c.value < +minValue) ? err: null;
    }
}

@Component({
    selector: 'InputValidator',
    host: {
        '(blur)': 'onBlur($event)'
    },
    template: `
        <div (click)="$event.preventDefault()">
            <input value="{{counterValue}}"
                   pattern="^[0-9.]*$"
                   type="number" placeholder="{{placer}}" min="{{counterRangeMin}}" max="{{counterRangeMax}}" 
                  class="form-control" (blur)="onBlur($event)"/>    
        </div>
  `,
    providers: [
        { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => InputValidator), multi: true },
        { provide: NG_VALIDATORS, useExisting: forwardRef(() => InputValidator), multi: true }
    ]
})
export class InputValidator implements ControlValueAccessor, OnChanges {

    private placer:string = ''
    constructor(private elRef:ElementRef, private renderer:Renderer) {
    }

    onBlur($event) {
        var n = Number($event.target.value);
        if (n < this.counterRangeMin)
            n = this.counterRangeMin;
        if (_.isNaN(n))
            n = 1;
        if (n < 10) {
            this.writeValue(1);
        } else {
            this.writeValue(n);
        }

        this.renderer.invokeElementMethod(this.elRef.nativeElement,
            'dispatchEvent', [new CustomEvent('input-blur', {bubbles: true})]);
        // or just
        // el.dispatchEvent(new CustomEvent('input-blur', { bubbles: true }));
        // if you don't care about webworker compatibility
    }

    propagateChange: any[] = [];
    validateFn:any = () => {};

    @Input('counterValue') _counterValue = 0;
    @Input() counterRangeMax;
    @Input() counterRangeMin;
    @Input()
    set textholder(i_placer:string) {
        this.placer = i_placer;
    }
    // @Input() setAdnetPackageModels:AdnetPackageModel;

    get counterValue() {
        return this._counterValue;
    }

    set counterValue(val) {
        this._counterValue = val;
        this.propagateChange.forEach(fn => fn(val));
    }

    ngOnChanges(inputs) {
        if (inputs.counterRangeMax || inputs.counterRangeMin) {
            this.validateFn = createCounterRangeValidator(this.counterRangeMax, this.counterRangeMin);
        }
    }

    writeValue(value) {
        if (value) {
            this.counterValue = value;
        }
    }

    registerOnChange(fn) {
        this.propagateChange.push(fn);
    }

    registerOnTouched(fn) {
    }

    increase() {
        this.counterValue++;
        this.onBlur(null);
    }

    decrease() {
        this.counterValue--;
        this.onBlur(null);
    }

    validate(c: FormControl) {
        return this.validateFn(c);
    }
}