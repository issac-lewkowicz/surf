// import React from 'react'
// import {useSelector, useDispatch} from "react-redux"
// import {login} from './loginSlice'
import React, {useState} from 'react'
import { useNavigate } from "react-router-dom";
import { ChakraProvider, Box, Text, Link, VStack, Code, Grid, theme, Button, FormControl, FormLabel, FormErrorMessage, FormHelperText, Input, InputGroup, InputRightElement, useToast } from '@chakra-ui/react';

function Login({setActiveUser}) {
  // const user = useSelector((state) => state.login.)
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
    const activeUser = {
        username: formData.username,
        password: formData.password
    }
  
    const postConfig = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(activeUser),
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
    <VStack spacing={4}>

    <FormControl>
    <FormLabel>Login:</FormLabel>
    <Input type="text" name="username" id="username__login" placeholder="Username" value={formData.username} onChange={updateFormData} />
    <InputGroup size='md'>
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
    <br/>
    <Button type='submit' onClick={handleSubmit}>LogIn</Button>
</VStack>
  )
}

export default Login
