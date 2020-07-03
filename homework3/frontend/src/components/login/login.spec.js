import React from "react";
import { shallow } from "enzyme";
import Login from "./login";
import {describe, expect, it} from "@jest/globals";

describe("Login Component", () => {
    it("should render correctly", () => {
        const component = shallow(<Login />);
        expect(component).toMatchSnapshot()
    });
});


