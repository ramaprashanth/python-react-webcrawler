import React from 'react'


function MainContainer(props) {
  return (
    <div className='col-sm-12 text-center'>
      <div >
        {props.children}
      </div>
    </div>
  );
}

export default MainContainer
