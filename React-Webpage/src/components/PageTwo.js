import React from 'react'
import { Link } from 'react-router'

const PageTwo = React.createClass({
  render () {
    return (
      <div>
        <h1>Welcome to Page Two</h1>
        <p>Please navigate around.</p>
        <Link to='/PageThree'>
          <button type='button' className='btn btn-lg btn-info'>
            Go to Page Three
          </button>
        </Link>
      </div>
    );
  },
});

export default PageTwo
