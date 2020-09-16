import RequirementPredicate from "./RequirementPredicate";

class RequirementAny extends RequirementPredicate {
  isSatisfied(credentials) {
    return this.requirements.some(r => r.isSatisfied(credentials));
  }
}

export default RequirementAny;
