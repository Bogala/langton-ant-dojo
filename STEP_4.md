# From Component State to Redux

## New functional need
We have 2 milestones for our ant's moves : 700 moves and 2000+ moves
(No spoil here, you'll see it in time)

But, if we want to move the ant up to 700 or 2000 times, we doesn't want to click on play button each move.
To prevent that, we will upgrade the play button :
1. Play button must launch moves one by one and show the grid each time
1. New pause button to stop process and show last move
1. New label in the right of AppBar to whow the number of moves already maked

## Refactor
Firstly, our App component is too complex and we have to separate graphic component from functional behavior.
To make this, we have to migrate our local state to a state manager : Redux.

### What is Redux ?
Redux is a predictable state container for JavaScript apps.

It helps you write applications that behave consistently, run in different environments (client, server, and native), and are easy to test.

To resume, Redux is :
* A library for managing states with reducers
* The better way of communication between components
* First step towards functional programming

### What is a Reducer ?
A simple function that take state and an action, and returns a new state.

Reducers specify how the application's state changes in response to actions sent to the store. Remember that actions only describe the fact that something happened, but don't describe how the application's state changes.

### What is a container ?
The container is the connector between React component and reducers (redux state).

### Migration by the tests
Move refs from App.state to App[Grid].props on `App.spec.tsx`
Example, from :
``` jsx
const initAndPlay = async (playTimes: number = 1) => {
  const wrapper = mount(<App />);
  for (let times = 0; times < playTimes; times++) {
    await wrapper.find(AvPlayArrow).simulate('click');
  }
  const ant: Ant = wrapper.state().ant;
  const cells: boolean[][] = wrapper.state().cells;
  return {
    wrapper,
    ant,
    cells
  } as TestContext;
};
```

to :
``` jsx
const initAndPlay = async (playTimes: number = 1) => {
  const wrapper = mount(<App />);
  for (let times = 0; times < playTimes; times++) {
    await wrapper.find(AvPlayArrow).simulate('click');
  }
  const ant: Ant = wrapper.find(Grid).props().ant;
  const cells: boolean[][] = wrapper.find(Grid).props().cells;
  return {
    wrapper,
    ant,
    cells
  } as TestContext;
};
```
> So, you can make a search for "wrapper.state()" and replace to "wrapper.find(Grid).props()"

create and implement tests in redux elements
``` jsx
//Work in progress
```
move state elements & events to props from App.tsx
``` jsx
//Work in progress
```
create tests for redux-react mapping
``` jsx
//Work in progress
```

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

## Exercice Solution
[_Download Example_](https://github.com/Bogala/langton-ant-dojo/archive/step4.zip)
