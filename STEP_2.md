# A Grid and An Ant
We need to begin with a mocked interface

Please replace the current loader in the application by :
1. A [Material AppBar](http://www.material-ui.com/#/components/app-bar) with a dynamic label ('Langton Ant' by default)
1. A [play button](http://www.material-ui.com/#/components/icon-button) on this AppBar
1. A 21x21 Grid (white cells and black borders) in a [Card](http://www.material-ui.com/#/components/card)
1. An Ant icon at the center of this grid. (Font, svg and png accepted)

if you do not master React, here are some things that might help you

## Create a new feature
Before all, we need gherkin testing model (cucumber).
If you use VSCode, install [Cucumber (Gherkin) Full Support](https://marketplace.visualstudio.com/items?itemName=alexkrechik.cucumberautocomplete)
``` shell
code --install-extension alexkrechik.cucumberautocomplete
``` 

For webstorm, you can use [Gherkin extension](https://plugins.jetbrains.com/plugin/7211-gherkin).

Next step is to install jest-cucumber :
``` shel
yarn add jest-cucumber -D
``` 

Usually, we do not use Gherkin and BDD for interface tests. We only test behaviors (BDD = Behavior Driven Development).
Here, for the needs of the dojo, we will bypass this rule a little bit and we will test interface in `feature` files.

Lets create a new folder under `src` : `grid` and a first file `grid.feature`
``` gherkin
Feature: Langton ant workspace

  Scenario: My initial conditions
     When I launch application
     Then I have a grid with 21 lines, 21 cells each line and an ant at the middle
     And I have a Material AppBar with title "Langton Ant"
     And I have a play button on AppBar
``` 

To test this gherkin scenario, we need a feature implementation file `grid.feature.spec.tsx`
``` typescript
import 'jest-enzyme';

import * as Adapter from 'enzyme-adapter-react-16';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { configure, shallow } from 'enzyme';

import { defineFeature, loadFeature } from "jest-cucumber";

const feature = loadFeature("./src/grid/grid.feature");

defineFeature(feature, test => {
  test("My initial conditions", ({ given, when, then, pending }) => {
    when("I launch application", () => {
      pending();
    });
    then(/^I have a grid with (.*) lines, (.*) cells each line and an ant at the middle$/, (lines, cells) => {
      pending();
    });
    then(/^I have a Material AppBar with title "(.*)"$/, title => {
      pending();
    });
    then("I have a play button on AppBar", () => {
      pending();
    });
  });
});
``` 

## How create a new React Component
A simple function is enough to create a component
``` jsx
export default () => (
  <div>
    <span>It works !</span>
  </div>
)
```

The returned node (div here) isn't a real html, it's a TSX object. TSX allows us to describe our User Interfaces (UIs) in a syntax very close to the HTML that we are used to. It is a Typescript representation of the Document Object Model (DOM).

If you want to define a new component, please name it in Pascal Case (ex: MyNewComponent). JSDOM recognizes that it is a React component if it starts with a capital letter.

``` jsx
const ChildComponent = () => (
  <span>Child</span>
)

const ParentComponent = () => (
  <div>
    <ChildComponent />
  </div>
)
```
### How work props
Props are the attributes for your component. To use it, add a props arg object :
``` jsx
const Image = (props: any) => (
  <img src={props.img} />
)
```

And you can define it in the parent component 
``` jsx
const Parent = () => (
  <div>
    <Image img="./img/picture.png" />
  </div>
)
```

If you have TSLint, any type for props is not a good idea. To be safe, we can define an interface :
``` typescript
interface ImageProps {
  img: string;
}
```

With this, the img attribute became mandatory. To make it optional, you have to add a `?` like this :
``` typescript
interface ImageProps {
  img?: string;
}
```

if the you have an optional prop, it can be a good idea to make a default value.
``` jsx
const Image = ({img = './img/picture.png'}: ImageProps) => (
  <img src={img} />
)

const Parent = () => (
  <div>
    <Image />
  </div>
)
```

> You can add 2 types of props :
> * objects to transmit data from parent to child
> * functions to transmit event from child to parent
>
> This is the React's one-way binding pattern.

## How can I test a component with Enzyme
Before all, you have to configure your test file to run with enzyme.
Please use de follwing lines :
``` typescript
import 'core-js';
import 'jest-enzyme';

import * as Adapter from 'enzyme-adapter-react-16';
import * as React from 'react';

import { configure, mount } from 'enzyme';

// tslint:disable-next-line:no-any
configure({ adapter: new Adapter() });
```

This code will configure your enzyme environment with the React 16 configuration.

To test a component with enzyme, we have 2 options :
1. shallow : for real unit test (isolated, no children render). Call only constructor and render.
``` jsx
const wrapper = shallow(<MyComponent />, { context: {} });
```
1. mount : The only way to test componentDidMount and componentDidUpdate. Full rendering including child components.
``` jsx
const wrapper = mount(<MyComponent />, { context: {} });
```

### UI elements finding
To find an element, use `find(Selector)`
You can elements by :
* CSS Selectors:
```jsx
const wrapper = shallow(<MyComponent />);
expect(wrapper.find('.foo')).toHaveLength(1);
expect(wrapper.find('.bar')).toHaveLength(3);

// compound selector
expect(wrapper.find('div.some-class')).toHaveLength(3);

// CSS id selector
expect(wrapper.find('#foo')).toHaveLength(1);
```

* Component Constructors:
```jsx
import Foo from '../components/Foo';

const wrapper = shallow(<MyComponent />);
expect(wrapper.find(Foo)).toHaveLength(1);
```

* Component Display Name:
```jsx
const wrapper = shallow(<MyComponent />);
expect(wrapper.find('Foo')).toHaveLength(1);
```

* Object Property Selector:
```jsx
const wrapper = shallow(<MyComponent />);
expect(wrapper.find({ prop: 'value' })).toHaveLength(1);
```


### Simulate UI events and assert props/state
To get props, you can use the props or prop function :
``` typescript
const wrapper = shallow(<Image img="./test.png" />);
expect(wrapper.props().img).toBe('./test.png');
expect(wrapper.prop('img')).toBe('./test.png');
```

To get state, it's like prop function
``` typescript
const wrapper = shallow(<MyComponent />);
expect(wrapper.state('count')).toBe(0);
```

To simulate an event, use simulate function
``` jsx
class Foo extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
  }
  render() {
    const { count } = this.state;
    return (
      <div>
        <div className={`clicks-${count}`}>
          {count} clicks
        </div>
        <a href="url" onClick={() => { this.setState({ count: count + 1 }); }}>
          Increment
        </a>
      </div>
    );
  }
}

const wrapper = shallow(<Foo />);

expect(wrapper.find('.clicks-0').length).toEqual(1);
wrapper.find('a').simulate('click');
expect(wrapper.find('.clicks-1').length).toEqual(1);
expect(wrapper.state('count')).toEqual(1);
```

Here we simulate a click (no parameter), if we want to simulate an onChange, we use it:
```typescript
wrapper.find('input').simulate('onChange', 'my new value');
```

> Now your grid is ready, you can go to the [next step : First rules and Component State](./STEP_3.md)

## Exercice Solution
[_Download Solution Sources_](https://github.com/Bogala/langton-ant-dojo/archive/step2.zip)
