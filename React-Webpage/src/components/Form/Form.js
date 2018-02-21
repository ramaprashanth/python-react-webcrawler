import React from 'react'
import { Link } from 'react-router'
import {
  Button, ButtonGroup, Tooltip, OverlayTrigger,
  FormGroup, HelpBlock, FormControl,
} from 'react-bootstrap'

import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';


// import LoadingButton from '../LoadingButton/LoadingButton'
import SearchInfoModal from '../SearchInfoModal/SearchInfoModal'

const styles = {
  formContainer: {
    maxWidth: '60%',
    margin: '0 auto',
    marginTop: '5%'
  },
  centered: {
    textAlign: 'center',
  },
  inputFields: {
    display: 'block',
    width: '75%',
    margin: '0 auto',
  },

}

export default function Form (props) {

  const startSiteTooltip = (
    <Tooltip id="startSiteTooltip">
      {`The origin of the webcrawl, subsequent links will originate here.`}
    </Tooltip>
  );

  const depthTooltip = (
    <Tooltip id="depthTooltip">
      {`How deep would you like the crawler to travel?`}
    </Tooltip>
  );

  const keywordTooltip = (
    <Tooltip id="keywordTooltip">
      {`Crawler scans given word.  Search stops upon discovery of keyword.`}
    </Tooltip>
  );

  return (
    <div style={styles.formContainer}>

      <h4>{`Where would you like to start the crawl?`}</h4>
      <form>
        <FormGroup
          controlId="formBasicText"
          validationState={props.getValidationState()}
        >
          <OverlayTrigger placement="left" overlay={startSiteTooltip}>
            <FormControl
              type="text"
              placeholder="Staring Website"
              onChange={props.onUrlChange}
            />
          </OverlayTrigger>
          <OverlayTrigger placement="left" overlay={depthTooltip}>
          <FormControl
            type="text"
            placeholder="Depth of Search"
            onChange={props.onMaxPagesChange}
          />
          </OverlayTrigger>
          <OverlayTrigger placement="left" overlay={keywordTooltip}>
          <FormControl
            type="text"
            placeholder="Optional Keyword"
            onChange={props.onKeywordChange}
          />
          </OverlayTrigger>
          <FormControl.Feedback />
          <HelpBlock>{`More information about search algorithms below.`}</HelpBlock>
        </FormGroup>
        <br />
        <br />
          <DropDownMenu searchType={props.searchType} onChange={props.onSearchTypeChange}>
            <MenuItem searchType={"BFS"} label="BFS" primaryText="Breadth-First Search" />
            <MenuItem searchType={"DFS"} label="DFS" primaryText="Depth-First Search" />
          </DropDownMenu>
        <ButtonGroup bsSize='small'>

          <a href="https://tangographicalcrawler.herokuapp.com/tangoGraphicalCrawler.html">
          {`Go to results`}</a>

        <Button type='submit' bsStyle="success">{`GO`}</Button>
        </ButtonGroup>
        <Button type='submit' bsStyle="success" onClick={props.onSubmit}>{`Send Cookie`}</Button>
      </form>

      <br />
      <br />
      <SearchInfoModal />


    </div>
  )
}
