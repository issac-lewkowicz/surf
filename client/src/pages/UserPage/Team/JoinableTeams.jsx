import React, {useState, useEffect} from 'react'
import { Spinner, Container, ButtonGroup, Heading, Grid, SimpleGrid } from '@chakra-ui/react';
import TeamJoin from './TeamJoin';


function JoinableTeams({currentUser}) {
// user will be able to join a team, by browsing/ searching through all teams
//stretch goal would be to make a request to join a team (eventually be able to get invited)

const [joinableTeamList, setJoinableTeamList] = useState(null)
  
useEffect(() => {
  fetch('/join-teams')
  .then((res) => {
    if (res.ok) {
      res.json().then((teams) => {
        setJoinableTeamList(teams); 
      });
    }
    else {
      res.json().then(errors => {
        console.error(errors)
      })}
    });
  }, [])


  if (!joinableTeamList) return <Spinner />;

  const joinTeams = joinableTeamList.map(team => <TeamJoin team={team} key={team.id} currentUser={currentUser} />);

  return (
    <>
    <Heading>Pick a team to join</Heading>

    {/* <Container> */}
      <SimpleGrid  columns={2} spacing={6} padding={20}>
        {joinTeams}
      </SimpleGrid>

    </>
  )
}

export default JoinableTeams