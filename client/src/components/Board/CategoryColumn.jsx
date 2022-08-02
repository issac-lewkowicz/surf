import React from 'react'
import { Stack, HStack, VStack, Button, Box } from '@chakra-ui/react'

function CategoryColumn({category}) {
  const {title, id, tasks } = category



  return (

    <Box >
      <h2>{title}</h2>
    <VStack>
    <p>task cards will go here</p>
    
    {/* <Button onClick={handleAddTask} >Add Task</Button> */}
    </VStack>
    </Box>
  )
}

export default CategoryColumn