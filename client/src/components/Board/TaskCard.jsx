import React from 'react'
import { Stack, HStack, VStack, Button, Box, Container, Heading, Text, Spinner } from '@chakra-ui/react'

function TaskCard({task}) {
  return (
    <Container 

    border="1px"
    p="8px"
    borderRadius="2px"
    fontSize="15px"
    fontWeight="bold"
    borderColor="#ccd0d5">
      {task.title}
    </Container>
  )
}

export default TaskCard