import React from 'react'
import { Link } from 'react-router'

const PageOne = React.createClass({
  render () {
    return (
      <div>
        <h1>Welcome to Page One</h1>
        <p>Please navigate around.</p>
        <Link to='/pagetwo'>
          <button type='button' className='btn btn-lg btn-danger'>
            Go to Page Two
          </button>
        </Link>
      </div>
    );
  },
});

export default PageOne
