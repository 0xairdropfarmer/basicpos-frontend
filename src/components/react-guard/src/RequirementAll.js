import RequirementPredicate from "./RequirementPredicate";

class RequirementAll extends RequirementPredicate {
  isSatisfied(credentials) {
    return this.requirements.every(r => r.isSatisfied(credentials));
  }
}

export default RequirementAll;
