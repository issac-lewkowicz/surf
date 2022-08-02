import React from 'react'
import { Stack, HStack, VStack, Button, Box, Container, Heading, Text, Spinner } from '@chakra-ui/react'

function TaskCard({task}) {
  return (
    <Box>
      {task.title}
    </Box>
  )
}

export default TaskCard