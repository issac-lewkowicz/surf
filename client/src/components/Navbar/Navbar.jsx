import { Avatar, AvatarBadge, AvatarGroup, Box, Button, HStack, Spinner, useColorModeValue } from '@chakra-ui/react'
import React from 'react'
import { NavLink } from 'react-router-dom'
import { ColorModeSwitcher } from '../../ColorModeSwitcher';
import Logout from './Logout';

function Navbar({currentUser, setActiveUser}) {

  let bgColor = useColorModeValue('blue.300', 'blue.600')

  if (!currentUser) return (
    <HStack px="5vw" py="2vh" spacing="auto" bg={bgColor}>
    <NavLink to="/">Surf-Logo</NavLink>
    <HStack spacing="1vw">
    <ColorModeSwitcher justifySelf="flex-end" />
    </HStack>
    </HStack>
  )

  const avatar = <Avatar name={currentUser.member_name} src={currentUser.image_url} />
  console.log(currentUser)
  return (
    <HStack px="5vw" py="2vh" spacing="auto">
    <NavLink to="/user-page">Surf-Logo</NavLink>
    <HStack spacing="1vw">
    {currentUser && avatar}
    <Logout setActiveUser={setActiveUser}/>
    <ColorModeSwitcher justifySelf="flex-end" />
    </HStack>
    </HStack>
  )
}

export default Navbar