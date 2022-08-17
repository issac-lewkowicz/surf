import React, {useState} from 'react'
import { useNavigate } from "react-router-dom";
import { AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, ChakraProvider, Box, Text, Link, VStack, Code, Grid, theme, Button, FormControl, FormLabel, FormErrorMessage, FormHelperText, Input, InputGroup, InputRightElement, useToast } from '@chakra-ui/react';
import Team from './Team';

function NewTeam({currentUser, onAddTeam}) {

  const [formData, setFormData] = useState("")
  const [show, setShow] = useState(false)
  const handleClick = () => setShow(!show)
  const handleSubmit = (e) => {
    e.preventDefault();
    const team = {member_id: currentUser.id, 
    team_name: formData}
    const postConfig = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(team),
    };
  
    fetch(`/members/${currentUser.id}/teams`, postConfig)
        .then(res => { 
        if (res.ok) {
          res.json()
        .then((team => {
            onAddTeam(team);
            handleClick();
            setFormData("");
        }))}
        else {
          res.json().then(errors => {
            console.error(errors)
          })}
        })
  }
  
  return (
    <div>
      <FormControl align="center" w="75vw" paddingRight={4}>
        {!show && (<Button colorScheme="blue" onClick={handleClick}>Create A Team</Button>)}
        {show && (<InputGroup ><Input type="text" name="team_name" id="team_name_add" placeholder="Enter Team Name" value={formData} onChange={(e) => setFormData(e.target.value)} /> 
        <Button colorScheme="blue" type='submit' onClick={handleSubmit}>Create</Button></InputGroup>)}
      </FormControl>
    </div>
  )
}

export default NewTeam
