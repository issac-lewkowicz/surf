import React from 'react'
import { Button } from '@chakra-ui/react';


function TeamJoin({team}) {

  const handleJoin = () => {
    console.log(team)
  }

  return (
    <Button onClick={handleJoin}>{team.team_name}</Button>
  )
}

export default TeamJoin