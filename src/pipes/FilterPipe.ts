import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'FilterPipe'
})
export class FilterPipe implements PipeTransform {
    // transform(input, filter):boolean {
    transform(input: Object[], ...args:any[]): boolean {
        var filter = args[0];
        if (!input || filter == "")
            return false;
        if (input.indexOf(filter) > -1)
            return false;
        return true;
    }
}