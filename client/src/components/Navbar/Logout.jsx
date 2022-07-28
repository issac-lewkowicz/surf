import React from 'react';
import { useNavigate } from "react-router-dom";
import { ChakraProvider, Box, Text, Link, VStack, Code, Grid, theme, Button, FormControl, FormLabel, FormErrorMessage, FormHelperText, Input, InputGroup, InputRightElement, useToast,   Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody,  ModalCloseButton, useDisclosure} from '@chakra-ui/react';


function Logout({setActiveUser}) {
  let navigate = useNavigate()
  const toast = useToast()
      
    const handleLogout = () => {
      fetch('/logout', {method: 'DELETE'})
      .then(res => {
        if (res.ok) {
          toast({
            title: 'Logged out',
            description: "You have successfully logged out - Redirecting.",
            status: 'success',
            duration: 3000,
            isClosable: true,
          })
      setActiveUser(null)
      navigate('/', {replace: true})
    } else {
      res.json().then(error => console.error(error))
    }
  })
}
  
  return (
    <Button onClick={handleLogout}>Logout</Button>
  )
}

export default Logout