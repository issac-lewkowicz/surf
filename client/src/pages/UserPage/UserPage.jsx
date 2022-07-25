import React, {useState, useEffect} from 'react'

function UserPage({currentUser}) {



  if (currentUser === null ) return <p>Loading...</p>;
  

  return (
    <div>UserPage</div>
  )
}

export default UserPage