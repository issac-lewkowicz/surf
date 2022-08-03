import React, {useState, useEffect} from 'react'
import { Spinner, } from '@chakra-ui/react';


function TeamJoin() {
// user will be able to join a team, by browsing/ searching through all teams
//stretch goal would be to make a request to join a team (eventually be able to get invited)

const [globalTeams, setGlobalTeams] = useState(null)
  
useEffect(() => {
  fetch('/teams')
  .then((res) => {
    if (res.ok) {
      res.json().then((teams) => {
        setGlobalTeams(teams); 
      });
    }
    else {
      res.json().then(errors => {
        console.error(errors)
      })}
    });
  }, [])


  if (!globalTeams) return <Spinner />;

  const joinableTeams = globalTeams.filter(team => {
    team.members.cont
  })

  return (
    <div>TeamJoin</div>
  )
}

export default TeamJoin