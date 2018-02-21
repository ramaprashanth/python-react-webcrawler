import React from 'react'
import MainContainer from './MainContainer'
import Navbar  from './Navbar/Navbar'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

const Main = React.createClass({
  render () {
    return (
      <MuiThemeProvider>
        <MainContainer>
          <Navbar />

          <div>
            <span><h1>{`Web Crawler`}</h1></span>
          </div>

          {this.props.children}

        </MainContainer>
      </MuiThemeProvider>
    );
  },
});

export default Main
