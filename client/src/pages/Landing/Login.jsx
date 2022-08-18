// import React from 'react'
// import {useSelector, useDispatch} from "react-redux"
// import {login} from './loginSlice'
import React, {useState} from 'react'
import { useNavigate } from "react-router-dom";
// import { ChakraProvider, Box, Text, Link, VStack, Code, Grid, theme, Button, FormControl, FormLabel, FormErrorMessage, FormHelperText, Input, InputGroup, InputRightElement, useToast, Divider } from '@chakra-ui/react';
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  theme,
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  InputGroup,
  InputRightElement,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Heading,
  Center,
  Divider,
} from '@chakra-ui/react';
import Signup from '../Signup/Signup';

function Login({setActiveUser}) {
  // const user = useSelector((state) => state.login.)
  const { isOpen, onOpen, onClose } = useDisclosure();
  let navigate = useNavigate()
  const toast = useToast()

  const defaultFormData = {
    username: "",
    password: ""
  }
  const [formData, setFormData] = useState(defaultFormData)
  const [show, setShow] = React.useState(false)
  const handleClick = () => setShow(!show)
  
  const updateFormData = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  
  const handleSubmit = (e) => {
    e.preventDefault();

    const postConfig = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
    };
  
  
    fetch('/login', postConfig)
        .then(res => res.json())
        .then((activeMember => {
            setActiveUser(activeMember);
            setFormData(defaultFormData);
            toast({
              title: 'Logged In.',
              description: "You have successfully logged in - Redirecting.",
              status: 'success',
              duration: 3000,
              isClosable: true,
            })
            navigate(`/user-page`, { replace: true })
        }))
  }


  return (
    <VStack spacing={4} border="1px" px={6} py={8} borderRadius="1rem" borderColor="#ccd0d5" boxShadow="lg">
    <FormControl minW="23vw" maxW="75vw" >
    {/* <FormLabel>Login:</FormLabel> */}
    <Input type="text" name="username" id="username__login" placeholder="Username" value={formData.username} onChange={updateFormData} marginBottom={2} />
    <InputGroup >
    <Input
      id="password__login"
      max={30} 
      min={3}
      pr='4.5rem'
      type={show ? 'text' : 'password'}
      placeholder='Enter password'
      name='password'
      value={formData.password}
      onChange={updateFormData} />
    <InputRightElement width='4.5rem'>
      <Button h='1.75rem' size='sm' onClick={handleClick}>
        {show ? 'Hide' : 'Show'}
      </Button>
    </InputRightElement>
    </InputGroup>
    </FormControl>
    <Button minW="23vw" maxW="75vw" colorScheme="blue" type='submit' onClick={handleSubmit}>Log In</Button>
    <Divider />
    <br />
      <Button onClick={onOpen} colorScheme="green">
        Create new account
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Sign Up</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Signup setActiveUser={setActiveUser} />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            {/* <Button variant='ghost'>Secondary Action</Button> */}
          </ModalFooter>
        </ModalContent>
      </Modal>
</VStack>
  )
}

export default Login
