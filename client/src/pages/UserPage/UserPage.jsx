import React, {useState, useEffect} from 'react'
import { useNavigate } from "react-router-dom";
import JoinedTeamList from './Team/JoinedTeamList';
// import OwnedTeamList from './OwnedTeamList';
import { Spinner, ChakraProvider, Box, Text, Link, VStack, Code, Grid, theme, Button, FormControl, FormLabel, FormErrorMessage, FormHelperText, Input, InputGroup, InputRightElement, useToast, Toast, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody,  ModalCloseButton, useDisclosure, ButtonGroup} from '@chakra-ui/react';
import NewTeam from './Team/NewTeam';
import Logout from '../../components/Navbar/Logout';
import JoinableTeams from './Team/JoinableTeams';


function UserPage({currentUser, setActiveUser}) {
  // const { isOpen, onOpen, onClose } = useDisclosure()
  let navigate = useNavigate()
  const toast = useToast()



  useEffect(() => {
    if (currentUser === null) {
      toast({
        title: 'Not Logged In!',
        description: "You are NOT logged in - Redirecting.",
        status: 'warning',
        duration: 3000,
        isClosable: true,
      })
      navigate(`/`, { replace: true })
    }
  }, [])

    const handleClickJoin = () => navigate(`/join-teams`, { replace: true })


  if ( currentUser === null) return <Spinner />;
  // console.log(currentUser)
  return (
    <div>
      <ButtonGroup>
        <Logout setActiveUser={setActiveUser}/>
        <Button onClick={handleClickJoin} >Join a Team</Button>
      </ButtonGroup>
      <h2>My Teams</h2>
      {/* <OwnedTeamList currentUser={currentUser}/> */}
      {/* <h2>Joined Teams:</h2> */}
      <JoinedTeamList currentUser={currentUser} />

    </div>
  )
}

export default UserPage