import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'FilterPipe'
})
export class FilterPipe implements PipeTransform {
    transform(input, filter):boolean {
        if (!input || filter[0] == "")
            return false;
        if (input.indexOf(filter[0]) > -1)
            return false;
        return true;
    }
}