import {Lib} from "../../Lib";

export class Compbaser {
    private unsubStore: Array<any> = [];
    protected me = '';

    constructor() {
        this.me = Lib.GetCompSelector(this.constructor)
    }

    protected cancelOnDestroy(i_function: Function): void {
        this.unsubStore.push(i_function);
    }

    private ngOnDestroy() {
        this.unsubStore.map((f: Function) => f());
        this.destroy();
        this.unsubStore = null;
        this.me = null;
    }

    // override by sub class component
    destroy() {
    };
}