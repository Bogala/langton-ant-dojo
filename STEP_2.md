# A Grid and An Ant
We need to begin with a mocked interface

Please replace the current loader in the application by :
1. A [Material AppBar](http://www.material-ui.com/#/components/app-bar) with a dynamic label ('Langton Ant' by default)
1. A [play button](http://www.material-ui.com/#/components/icon-button) on this AppBar
1. A 21x21 Grid (white cells and black borders) in a [Card](http://www.material-ui.com/#/components/card)
1. An Ant icon at the center of this grid. (Font, svg and png accepted)

# Reminders
![TDD Cycles](https://upload.wikimedia.org/wikipedia/commons/0/0b/TDD_Global_Lifecycle.png)
5 Steps to reproduce every cycle:
1. Add a new test
1. Run all tests and verify if the new test fails
1. Write code to pass the new test to green
1. Run all tests and verify all are green
1. Refactor

Before each test, we launch a five minutes timer.
* If the code compiles and the tests are green, commit!
* Otherwise, revert!

All __your__ code must be covered by unit tests.

We'll avoid maximum `any` (implicit or not).

> Now your grid is ready, you can go to the [next step : First rules and Redux](./STEP_3.md)

## Exercice Solution
[_Download Solution Sources_](https://github.com/Bogala/langton-ant-dojo/archive/step2.zip)

if you do not master React, here are some things that might help you

### How create a new React Component
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
#### How work props
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
  <img src={props.img} />
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

#### How works state



### How can I test a component with Enzyme

#### UI elements finding

#### Simulate UI events and assert props/state
