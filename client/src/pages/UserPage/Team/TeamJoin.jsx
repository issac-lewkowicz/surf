import React from 'react'
import { Button } from '@chakra-ui/react';


function TeamJoin({team}) {

  const handleJoin = (e) => {
    console.log(team)
    e.currentTarget.disabled = true
    //display toast/redirect?
    const currentTeamMembers = team.members

    const patchConfig = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({key: updatedValue})   //=>  |(or newItemObject),
    };
    
    fetch(`/teams/${team.id}`, patchConfig)
    

  }

  return (
    <Button onClick={handleJoin}>{team.team_name}</Button>
  )
}

export default TeamJoin