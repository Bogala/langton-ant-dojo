import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import * as React from "react";
import "./App.css";
import Grid from "./grid/Grid";

export default () => (
  <MuiThemeProvider>
    <Grid />
  </MuiThemeProvider>
);
