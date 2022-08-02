import React from 'react'
import { Stack, HStack, VStack, Button, Box, Container, Heading, Text, Spinner } from '@chakra-ui/react'
import TaskCard from './TaskCard'

function CategoryColumn({category}) {
  const {title, id, tasks } = category
  const [taskList, setTaskList] = React.useState([])
// console.log(category)


  React.useEffect(() => {
    setTaskList(tasks)
    }, [])




  if (!taskList) return <Spinner />

  const taskCardList = taskList.map((task) => <TaskCard task={task} key={task.id} /> )

  return (

    <Container w="33vw">
      <Heading fontSize="xl">{title}</Heading>
    <VStack spacing={4}>
    {taskCardList}
    
    </VStack>
    {/* <Button onClick={handleAddTask} >Add Task</Button> */}
    </Container>
  )
}

export default CategoryColumn