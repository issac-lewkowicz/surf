import React from 'react'
import Login from './Login'
import { useNavigate } from "react-router-dom";
import { ChakraProvider, Box, Text, Link, VStack, Code, Grid, theme, Button, FormControl, FormLabel, FormErrorMessage, FormHelperText, Input, InputGroup, InputRightElement, useToast,   Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton, useDisclosure} from '@chakra-ui/react';

function Landing({setActiveUser, currentUser}) {
  let navigate = useNavigate()
  const toast = useToast()
  const { isOpen, onOpen, onClose } = useDisclosure()

  if (currentUser !== null) {
    toast({
      title: 'Logged In.',
      description: "You are already logged in - Redirecting.",
      status: 'success',
      duration: 3000,
      isClosable: true,
    })
    navigate(`/user-page`, { replace: true })
  }
  return (
    <div>Landing SURF
      <Login setActiveUser={setActiveUser}/>
      <Button>Sign Up</Button>
    </div>
  )
}

export default Landing