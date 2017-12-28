# Dojo : TDD Against the Time with React and Redux

## What is the Langton's Ant ?
__Langton's ant__ is a two-dimensional universal Turing machine with a very simple set of rules but complex emergent behavior. It was invented by Chris Langton in 1986 and runs on a square lattice of black and white cells. The universality of Langton's ant was proven in 2000. The idea has been generalized in several different ways, such as turmites which add more colors and more states.

### How it works ?
Squares on a plane are colored variously either black or white. We arbitrarily identify one square as the "ant". The ant can travel in any of the four cardinal directions at each step it takes. The "ant" moves according to the rules below:
* At a white square, turn 90° right, flip the color of the square, move forward one unit
* At a black square, turn 90° left, flip the color of the square, move forward one unit

Langton's ant can also be described as a cellular automaton, where the grid is colored black or white and the “ant” square has one of eight different colors assigned to encode the combination of black/white state and the current direction of motion of the ant.

## Dojo's rules
### TDD
Test-driven development (TDD) is a software development process that relies on the repetition of a very short development cycle: Requirements are turned into very specific test cases, then the software is improved to pass the new tests, only. This is opposed to software development that allows software to be added that is not proven to meet requirements.
![TDD Cycles](https://upload.wikimedia.org/wikipedia/commons/0/0b/TDD_Global_Lifecycle.png)
5 Steps to reproduce :
1. Add a new test
2. Run all tests and verify if the new test fails
3. Write code to pass the new test to green
4. Run all tests and verify all are green
5. Refactor

For more informations, see [Wikipedia](https://en.wikipedia.org/wiki/Test-driven_development)

