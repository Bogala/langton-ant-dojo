import { mount, ReactWrapper } from 'enzyme';
import { defineFeature, loadFeature } from "jest-cucumber";
import { AppBar } from 'material-ui';
import { AvPlayArrow } from 'material-ui/svg-icons';
import * as React from 'react';
import App from '../App';

let wrapper: ReactWrapper;

const feature = loadFeature("./src/grid/grid.feature");

defineFeature(feature, test => {
  test("My initial conditions", ({ given, when, then, pending }) => {
    when("I launch application", () => {
      wrapper = mount(<App />);
    });
    then(/^I have a grid with (.*) lines, (.*) cells each line and an ant at the middle$/, (lines, cells) => {
      expect(wrapper.find('tr').length).toBe(21);
      wrapper.find('tr').forEach((line, y) => {
        expect(line.find('td').length).toBe(21);
        line.find('td').forEach((child, x) => {
          const expectedCount = (y === 10 && x === 10) ? 1 : 0;
          expect(child.find('.ant').length).toBe(expectedCount);
        });
      });
    });
    then(/^I have a Material AppBar with title "(.*)"$/, (title: string) => {
      expect(wrapper.find(AppBar).length).toBe(1);
      expect(wrapper.find(AppBar).prop('title')).toBe(title);
    });
    then("I have a play button on AppBar", () => {
      expect(wrapper.find(AppBar).find(AvPlayArrow).length).toBe(1);
    });
  });
});