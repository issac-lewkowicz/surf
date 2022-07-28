import React, {useState, useEffect} from 'react'
import { useNavigate } from "react-router-dom";
import JoinedTeamList from './Team/JoinedTeamList';
// import OwnedTeamList from './OwnedTeamList';
import { ChakraProvider, Box, Text, Link, VStack, Code, Grid, theme, Button, FormControl, FormLabel, FormErrorMessage, FormHelperText, Input, InputGroup, InputRightElement, useToast, Toast, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody,  ModalCloseButton, useDisclosure} from '@chakra-ui/react';
import NewTeam from './Team/NewTeam';
import Logout from '../../components/Navbar/Logout';


function UserPage({currentUser, setActiveUser}) {
  // const { isOpen, onOpen, onClose } = useDisclosure()
  let navigate = useNavigate()
  const toast = useToast()
  const [allTeams, setAllTeams] = useState(null)

  // if (currentUser === null) {
  //   // toast({
  //   //   title: 'Not Logged In.',
  //   //   description: "You are NOT logged in - Redirecting.",
  //   //   status: 'failure',
  //   //   duration: 3000,
  //   //   isClosable: true,
  //   // })
  //   navigate(`/`, { replace: true })
  // }

  if ( currentUser === null) return <p>Loading...</p>;
  console.log(currentUser)
  return (
    <div>
      <Logout setActiveUser={setActiveUser}/>
      <h2>My Teams</h2>
      {/* <OwnedTeamList currentUser={currentUser}/> */}
      {/* <h2>Joined Teams:</h2> */}
      <JoinedTeamList currentUser={currentUser} allTeams={allTeams} setAllTeams={setAllTeams} />

    </div>
  )
}

export default UserPage