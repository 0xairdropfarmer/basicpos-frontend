import React from "react";
import { shallow } from "enzyme";
import Login from "./posmachine";

describe("<Posmachine />", () => {
  test("renders", () => {
    const wrapper = shallow(<Login />);
    expect(wrapper).toMatchSnapshot();
  });
});
