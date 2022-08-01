import React, {useState, useEffect} from 'react'
import Team from './Team'
import { Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, ChakraProvider, Box, Text, Link, VStack, Code, Grid, theme, Button, FormControl, FormLabel, FormErrorMessage, FormHelperText, Input, InputGroup, InputRightElement, useToast,   Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody,  ModalCloseButton, useDisclosure} from '@chakra-ui/react';
import NewTeam from './NewTeam';



function JoinedTeamList({currentUser}) {
  const [allTeams, setAllTeams] = useState(null)
  const [boardList, setBoardList] = useState([])

  // useEffect(() => {
  //   fetch(`/teams`)
  //       .then((res) => {
  //         if (res.ok) {
  //           res.json().then((teams) => {
  //             setAllTeams(teams); 
  //           });
  //         }
  //         else {
  //           res.json().then(errors => {
  //             console.error(errors)
  //           })}
  //         });
  //       }, [allTeams])

  let joinedTeams = (currentUser.teams && currentUser.teams.map(team => 
  <AccordionItem key={team.id}>
    <h2>
      <AccordionButton>
        <Box flex='1' textAlign='left'>
        <Team team={team} />
        </Box>
        <AccordionIcon />
      </AccordionButton>
    </h2>
    <AccordionPanel pb={4}>
      Team Boards will go here
    </AccordionPanel>
  </AccordionItem>  
  ))

  const handleAddTeam = (newTeam) => {
    joinedTeams = (allTeams ===  null) ? [...joinedTeams, newTeam]  : [...allTeams, newTeam]
    setAllTeams(joinedTeams)
  }
  
  // if (joinedTeams === undefined) return <p>Loading joinedTeams...</p>;

  return (
    <>
    <Accordion>{allTeams === null ? joinedTeams : allTeams} </Accordion>
    <NewTeam currentUser={currentUser} onAddTeam={handleAddTeam} />
    </>
  )
}

export default JoinedTeamList