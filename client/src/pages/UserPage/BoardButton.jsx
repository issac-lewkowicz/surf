import React, {useEffect, useState} from 'react'
import { useNavigate, useParams} from 'react-router-dom'
import { Button, EditablePreview, Box, useColorModeValue, IconButton, Flex, Input, useDisclosure, useEditableControls, ButtonGroup, SlideFade, Editable, Tooltip, EditableInput } from "@chakra-ui/react";



function BoardButton({board}) {
  const {title, id} = board
  let navigate = useNavigate()

  const handleClick = () => navigate(`/board/${id}`, { replace: true })


  return (
<Box
  as='button'
  height='60px'
  width='120px'
  lineHeight='1.2'
  transition='all 0.2s cubic-bezier(.98,.92,.92,1)'
  border='1px'
  px='8px'
  m={2}
  borderRadius='2px'
  fontSize='15px'
  fontWeight='bold'
  bg='#f5f6f7'
  borderColor='#ccd0d5'
  color='#4b4f56'
  _hover={{ bg: '#ebedf0' }}
  _active={{
    bg: '#dddfe2',
    transform: 'scale(0.98)',
    borderColor: '#bec3c9',
  }}
  _focus={{
    boxShadow:
      '0 0 1px 2px rgba(88, 144, 255, .75), 0 1px 1px rgba(0, 0, 0, .15)',
  }}
  onClick={handleClick}
>
  {title}
</Box>
  )
}

export default BoardButton