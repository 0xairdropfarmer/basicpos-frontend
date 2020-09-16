import Requirement from "./Requirement";
import RequirementAll from "./RequirementAll";
import RequirementAny from "./RequirementAny";
import RequirementNot from "./RequirementNot";

import { Guard, Provider as CredentialProvider } from "./Guard";
import guardFactory from "./guardFactory";
import protect from "./protect";

function all(...requirements) {
  return new RequirementAll(...requirements);
}

function any(...requirements) {
  return new RequirementAny(...requirements);
}

function not(requirement) {
  return new RequirementNot(requirement);
}

export {
  Requirement,
  all,
  any,
  not,
  CredentialProvider,
  Guard,
  guardFactory,
  protect
};
