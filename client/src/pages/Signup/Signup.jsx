import React, {useState} from 'react'
import { useNavigate } from "react-router-dom";
import { ChakraProvider, Box, Text, Link, VStack, Code, Grid, theme, Button, FormControl, FormLabel, FormErrorMessage, FormHelperText, Input, InputGroup, InputRightElement, useToast } from '@chakra-ui/react';


function Signup({setActiveUser}) {
let navigate = useNavigate()
const toast = useToast()

const defaultFormData = {
  member_name: "",
  username: "",
  email: "",
  image_url: "",
  password: "",
  password_confirmation: ""
}

const [formData, setFormData] = useState(defaultFormData)
const [show1, setShow1] = React.useState(false)
const [show2, setShow2] = React.useState(false)
const handleClick1 = () => setShow1(!show1)
const handleClick2 = () => setShow2(!show2)

const updateFormData = (e) => {
  const { name, value } = e.target;
  setFormData({ ...formData, [name]: value });
};


const handleSubmit = (e) => {
  e.preventDefault();
  const newMember = {
      member_name: formData.member_name,
      username: formData.username,
      email: formData.email,
      image_url: formData.image_url,
      password: formData.password,
      password_confirmation: formData.password_confirmation
  }

  const postConfig = {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify(newMember),
  };


  fetch('/signup', postConfig)
      .then(res => res.json())
      .then((newMember => {
          setActiveUser(newMember);
          setFormData(defaultFormData);
          toast({
            title: 'Account created.',
            description: "We've created your account for you.",
            status: 'success',
            duration: 3000,
            isClosable: true,
          })
          navigate(`/user-page`, { replace: true })
      }))
}

/*
Example:
<div className="class__name">
  <h2>New Item</h2>
  <form onSubmit={handleSubmit}>
      <input type="text" name="name" placeholder="Item Name" value={formData.name} onChange={updateFormData} />
      <input type="text" name="image" placeholder="Image URL" onChange={updateFormData} value={formData.image} />
      <input type="number" name="price" step="0.01" placeholder="Price" onChange={updateFormData} value={formData.price} />
      <button type="submit">Add Item</button>
  </form>
</div>
*/

  return (
  <VStack spacing={4}>
      <FormControl isRequired>
      <FormLabel>Full Name:</FormLabel>
      <Input type="text" name="member_name" id="member_name__field" placeholder="Full Name" value={formData.member_name} onChange={updateFormData} />
      <br/>
      </FormControl>

      <FormControl isRequired>
      <FormLabel>Username:</FormLabel>
      <Input type="text" name="username" id="username__field" placeholder="Username" value={formData.username} onChange={updateFormData} />
      <br/>
      </FormControl>

      <FormControl isRequired>
      <FormLabel>Email:</FormLabel>
      <Input type="text" name="email" id="email__field"  placeholder="Email" value={formData.email} onChange={updateFormData} />
      <br/>
      </FormControl>

      <FormControl>
      <FormLabel>Image URL:</FormLabel>
      <Input type="text" name="image_url" id="image_url__field" placeholder="Image URL" value={formData.image_url} onChange={updateFormData} />
      <br/>
      </FormControl>

      <FormControl isRequired>
      <FormLabel>Password:</FormLabel>
      <InputGroup size='md'>
      <Input
        id="password__field"
        max={30} 
        min={3}
        pr='4.5rem'
        type={show1 ? 'text' : 'password'}
        placeholder='Enter password'
        name='password'
        value={formData.password}
        onChange={updateFormData} />
      <InputRightElement width='4.5rem'>
        <Button h='1.75rem' size='sm' onClick={handleClick1}>
          {show1 ? 'Hide' : 'Show'}
        </Button>
      </InputRightElement>
    </InputGroup>
    </FormControl>
    <br/>

    <FormControl isRequired>
    <FormLabel>Password Confirmation:</FormLabel>
    <InputGroup size='md'>
        <Input
          id="password_confirmation__field"
          max={30} 
          min={3}
          pr='4.5rem'
          type={show2 ? 'text' : 'password'}
          placeholder='Enter password confirmation'
          name='password_confirmation'
          value={formData.password_confirmation}
          onChange={updateFormData} />
        <InputRightElement width='4.5rem'>
          <Button h='1.75rem' size='sm' onClick={handleClick2}>
            {show2 ? 'Hide' : 'Show'}
          </Button>
        </InputRightElement>
      </InputGroup>
      </FormControl>
      <br/>
      <Button type='submit' onClick={handleSubmit}>Sign Up</Button>

  </VStack>

  )
}

export default Signup