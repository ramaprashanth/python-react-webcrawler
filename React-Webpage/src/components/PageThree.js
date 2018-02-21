import React from 'react'
import { Link } from 'react-router'

const PageThree = React.createClass({
  render () {
    return (
      <div>
        <h1>Welcome to Page Three</h1>
        <p>Please navigate around.</p>
        <Link to='/'>
          <button type='button' className='btn btn-lg btn-info'>
            Go back to Home
          </button>
        </Link>
      </div>
    );
  },
});

export default PageThree
