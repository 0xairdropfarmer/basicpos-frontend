import { Requirement } from "./react-guard/src";

class MyRequirement extends Requirement {
    constructor(credentials) {
        super();
        this.credentials = credentials;
    }

    isSatisfied(credentials) {
        return this.credentials === credentials;
    }
}

const NeedAdmin = new MyRequirement("admin");
const NeedStaff = new MyRequirement("staff");

export { NeedAdmin, NeedStaff };
