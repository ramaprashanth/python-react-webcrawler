import React from 'react'
import { Link } from 'react-router'

const Home = React.createClass({
  render () {
    return (
      <div>
        <h1>Welcome to Home</h1>
        <p>Feel free to explore around</p>
        <Link to='/form'>
          <button type='button' className='btn btn-lg btn-success'>
            {`Go to the Form`}
          </button>
        </Link>
      </div>
    );
  },
});

export default Home
