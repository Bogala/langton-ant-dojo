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
[_Download Example_](https://github.com/Bogala/langton-ant-dojo/archive/step2.zip)
