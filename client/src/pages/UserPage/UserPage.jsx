import React, {useState, useEffect} from 'react'
import JoinedTeamList from './Team/JoinedTeamList';
// import OwnedTeamList from './OwnedTeamList';
import { ChakraProvider, Box, Text, Link, VStack, Code, Grid, theme, Button, FormControl, FormLabel, FormErrorMessage, FormHelperText, Input, InputGroup, InputRightElement, useToast,   Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody,  ModalCloseButton, useDisclosure} from '@chakra-ui/react';
import NewTeam from './Team/NewTeam';


function UserPage({currentUser}) {
  // const { isOpen, onOpen, onClose } = useDisclosure()
  const [allTeams, setAllTeams] = useState(null)

  if (currentUser === null ) return <p>Loading...</p>;

  return (
    <div>
      <h2>My Teams</h2>
      {/* <OwnedTeamList currentUser={currentUser}/> */}
      {/* <h2>Joined Teams:</h2> */}
      <JoinedTeamList currentUser={currentUser} allTeams={allTeams} setAllTeams={setAllTeams} />

    </div>
  )
}

export default UserPage