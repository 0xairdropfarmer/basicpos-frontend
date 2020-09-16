import RequirementPredicate from "./RequirementPredicate";

class RequirementNot extends RequirementPredicate {
  constructor(requirement) {
    super(...[requirement]);
    this.requirement = requirement;
  }

  isSatisfied(credentials) {
    return !this.requirement.isSatisfied(credentials);
  }
}

export default RequirementNot;
