import React from 'react'
import Paper from 'material-ui/Paper';

import LinearProgress from 'material-ui/LinearProgress';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import TextField from 'material-ui/TextField';
import { greenA200 } from 'material-ui/styles/colors';

const style = {
  height: 650,
  width: 900,
  margin: 20,
  textAlign: 'center',
  display: 'inline-block',
}

const textFieldStyle = {
  marginLeft: 10,
}

const iconStyles = {
  marginRight: 24,
};

export default function Results (props) {
  return (
    <div>
      <h1>Results</h1>
        <Paper style={style} zDepth={4}>
          <LinearProgress mode="indeterminate" />

            <Toolbar>
              <FontIcon
                className="muidocs-icon-action-home"
                color={greenA200}
                style={iconStyles}
              />
              <ToolbarGroup firstChild={true}>

                <TextField style={textFieldStyle}
                  hintText="Keyword to Search for"
                />
              </ToolbarGroup>
              <ToolbarGroup>
                <ToolbarTitle text="Settings" />
                <FontIcon className="muidocs-icon-custom-sort" />
                <ToolbarSeparator />
                <RaisedButton label="Stop Search" secondary={true} />
                <RaisedButton label="Apply" primary={true} />
                <IconMenu
                  iconButtonElement={
                    <IconButton touch={true}>
                      <NavigationExpandMoreIcon />
                    </IconButton>
                  }
                >
                  <MenuItem primaryText="Save Search" />
                  <MenuItem primaryText="Stop Search" />
                </IconMenu>
              </ToolbarGroup>
            </Toolbar>
        </Paper>
    </div>
  )
}
