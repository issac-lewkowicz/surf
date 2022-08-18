import React, {useState, useEffect} from 'react'
import Team from './Team'
import { Accordion, Spinner, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, ChakraProvider, Box, Text, Link, VStack, Code, Grid, theme, Button, FormControl, FormLabel, FormErrorMessage, FormHelperText, Input, InputGroup, InputRightElement, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody,  ModalCloseButton, useDisclosure, Center} from '@chakra-ui/react';
import NewTeam from './NewTeam';



function JoinedTeamList({currentUser}) {
  const [allTeams, setAllTeams] = useState(null)


  useEffect(() => {
    fetch(`/members/${currentUser.id}/teams`)
        .then((res) => {
          if (res.ok) {
            res.json().then((teams) => {
              setAllTeams(teams); 
            });
          }
          else {
            res.json().then(errors => {
              console.error(errors)
            })}
          });
        }, [])

    if (!allTeams) return <Spinner />

  let joinedTeams = (allTeams && allTeams.map(team => 
        <Team team={team} key={team.id}/>
  ))

  const handleAddTeam = (newTeam) => {
    joinedTeams = (allTeams ===  null) ? [...joinedTeams, newTeam]  : [...allTeams, newTeam]
    setAllTeams(joinedTeams)
  }
  
  // if (joinedTeams === undefined) return <p>Loading joinedTeams...</p>;

  return (
    <>
    <Center>
    <Accordion w="75vw" allowMultiple>{joinedTeams} </Accordion>
    </Center>
    <br />
    <Center>
    <NewTeam currentUser={currentUser} onAddTeam={handleAddTeam} />
    </Center>
    </>
  )
}

export default JoinedTeamList