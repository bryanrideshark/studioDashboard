import {Lib} from "../../Lib";

export class Compbaser {
    private unsubStore;
    protected me = '';

    constructor() {
        this.me = Lib.GetCompSelector(this.constructor)
    }

    protected callOnDestroy(i_function: Function): void {
        this.unsubStore = i_function;
    }

    ngOnDestroy() {
        this.unsubStore();
        this.destroy();
    }

    // override by sub class component
    destroy() {
    };
}