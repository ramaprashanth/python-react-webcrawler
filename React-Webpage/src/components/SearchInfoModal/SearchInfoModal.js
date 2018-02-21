import React from 'react'
import { Button, Modal, Tab, Tabs } from 'react-bootstrap'
import BFS from './BFS.png'
import DFS from './DFS.png'

function bfsDiagram() {
  // Import result is the URL of your image
  return <img src={BFS} alt="Breadth-First Search, showing order of node traversal" />;
}

function dfsDiagram() {
  // Import result is the URL of your image
  return <img src={DFS} alt="Depth-First Search, showing order of node traversal" />;
}

const SearchInfoModal = React.createClass({
  getInitialState() {
    return { showModal: false };
  },

  close() {
    this.setState({ showModal: false });
  },

  open() {
    this.setState({ showModal: true });
  },

  render() {

    return (
      <div>

        <Button
          bsStyle="primary"
          bsSize="small"
          onClick={this.open}
        >
          {`Algorithm Info`}
        </Button>

        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>Algorithm Information</Modal.Title>
          </Modal.Header>
          <Modal.Body>

            <Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
              <Tab eventKey={1} title="Breadth-First">
                <h4>{`Breadth-First Search`}</h4>

                <p>{`Breadth-first search (BFS) is an algorithm for traversing or
                  searching tree or graph data structures. It starts at the tree root
                  (or some arbitrary node of a graph, sometimes referred to as a
                    'search key') and explores the neighbor nodes first, before
                    moving to the next level neighbors.`}
                </p>
                <hr />
                <h4>{`BFS node traversal order`}</h4>
                {bfsDiagram()}
              </Tab>
              <Tab eventKey={2} title="Depth-First">
                <h4>{`Depth-First Search`}</h4>
                <p>{`Depth-first search (DFS) is an algorithm for traversing or searching
                   tree or graph data structures. One starts at the root (selecting some
                     arbitrary node as the root in the case of a graph) and explores as
                    far as possible along each branch before backtracking.`}
                </p>
                <hr />
                <h4>{`DFS node traversal order`}</h4>
                {dfsDiagram()}
              </Tab>
            </Tabs>

          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.close}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
})
export default SearchInfoModal
