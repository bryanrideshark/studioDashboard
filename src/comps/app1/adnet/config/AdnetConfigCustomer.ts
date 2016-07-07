import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'AdnetConfigCustomer',
    styles: [`
        .input-group {
            padding-top: 10px;
        }
    `],
    template: `
          <h2>User settings</h2>
          <div class="input-group">
            <span class="input-group-addon"><i class="fa fa-edit"></i></span>
            <input id="user" type="text" class="form-control" name="user" value="" placeholder="User">                                        
         </div>
         <div class="input-group">
            <span class="input-group-addon"><i class="fa fa-edit"></i></span>
            <input id="user" type="text" class="form-control" name="user" value="" placeholder="User">                                        
         </div>
        `
})
export class AdnetConfigCustomer {
    constructor() {
    }
}