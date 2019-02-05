import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Aux from '../../HOC/Aux/Aux';
import HomePageContainer from '../../containers/HomePageContainer/HomePageContainer';

const Layout = () => (
  <Aux>
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" color="inherit">
          Minna Fun Task
        </Typography>
      </Toolbar>
    </AppBar>
    <HomePageContainer />
  </Aux>
);

export default Layout;
