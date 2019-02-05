import React, { Component } from 'react';
import { createMuiTheme } from '@material-ui/core/styles';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import indigo from '@material-ui/core/colors/indigo';
import pink from '@material-ui/core/colors/pink';
import './App.css';
import Layout from './components/Layout/Layout';

const theme = createMuiTheme({
  palette: {
    primary: indigo,
    secondary: pink
  }
});

class App extends Component {
  render() {
    return (
      <div className="App">
        <MuiThemeProvider theme={theme}>
          <Layout />
        </MuiThemeProvider>
      </div>
    );
  }
}

export default App;
