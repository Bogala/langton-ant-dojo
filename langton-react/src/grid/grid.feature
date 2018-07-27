Feature: Langton ant workspace

  Scenario: My initial conditions
     When I launch application
     Then I have a grid with 21 lines, 21 cells each line and an ant at the middle
     And I have a Material AppBar with title "Langton Ant"
     And I have a play button on AppBar