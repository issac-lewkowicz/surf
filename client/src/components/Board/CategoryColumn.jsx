import React, { useState, useEffect, useRef } from 'react';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
  Stack,
  HStack,
  VStack,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  InputGroup,
  InputRightElement,
  Container,
  Heading,
  Text,
  Spinner,
  Box,
  Editable,
  EditableInput,
  EditableTextarea,
  EditablePreview,
  Tooltip,
  IconButton,
  useDisclosure,
  SimpleGrid,
  GridItem,
} from '@chakra-ui/react';
import TaskCard from './TaskCard';
import { DeleteIcon } from '@chakra-ui/icons';

function CategoryColumn({ category, onDelete }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();
  const { title, id, tasks } = category;
  const [taskList, setTaskList] = useState(null);
  const [newTaskData, setNewTaskData] = useState('');
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  useEffect(() => {
    setTaskList(tasks);
  }, []);

  const onAddTask = newTask => {
    const updatedTaskList = [...taskList, newTask];
    setTaskList(updatedTaskList);
  };

  const handleAddTask = e => {
    e.preventDefault();
    const newTask = { category_id: id, title: newTaskData };
    const postConfig = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTask),
    };

    fetch(`/categories/${id}/tasks`, postConfig).then(res => {
      if (res.ok) {
        res.json().then(newTask => {
          onAddTask(newTask);
          handleClick();
          setNewTaskData('');
        });
      } else {
        res.json().then(errors => {
          console.error(errors);
        });
      }
    });
  };

  const handleDeleteCategory = () => {
    fetch(`/categories/${category.id}`, {
      method: 'DELETE',
    }).then(res =>
      res.ok
        ? onDelete(category.id)
        : res.json().then(errors => console.error(errors))
    );
  };

  if (!taskList) return <Spinner />;

  const onDeleteTask = id => {
    const updatedTaskList = taskList.filter(task => task.id !== id);
    onClose();
    setTaskList(updatedTaskList);
  };

  const taskCardList = taskList.map(task => (
    <TaskCard task={task} key={task.id} onDeleteTask={onDeleteTask} />
  ));

  const handleEditCategory = value => {
    console.log(value);
    const patchConfig = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({ title: value }),
    };

    fetch(`/categories/${category.id}`, patchConfig).then(res => {
      if (res.ok) {
        res.json().then(console.log);
      } else {
        res.json().then(errors => {
          console.error(errors);
        });
      }
    });
  };

  return (
    <GridItem
    // display='flex'
      border="1px"
      p="10px"
      borderRadius="2px"
      fontWeight="bold"
      borderColor="#ccd0d5"
      width="320px"
      height="fit-content"
      overflowY="auto"
      maxHeight="75vh"
      justify='start'
      
    >
      <Heading fontSize="xl" display='flex'>
        <IconButton onClick={onOpen} colorScheme="red" icon={<DeleteIcon />} />
        <AlertDialog
          isOpen={isOpen}
          leastDestructiveRef={cancelRef}
          onClose={onClose}
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize="lg" fontWeight="bold">
                Delete Category
              </AlertDialogHeader>

              <AlertDialogBody>
                Are you sure you want to delete this list?
              </AlertDialogBody>

              <AlertDialogFooter>
                <Button ref={cancelRef} onClick={onClose}>
                  Cancel
                </Button>
                <Button colorScheme="red" onClick={handleDeleteCategory} ml={3}>
                  Delete
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
        <Editable defaultValue={title} onSubmit={handleEditCategory}>
          <Tooltip label="Click to edit">
            <EditablePreview
              py={2}
              px={4}
              _hover={{
                background: 'gray.500',
              }}
            />
          </Tooltip>
          <EditableInput />
        </Editable>
      </Heading>
      <br />
      <SimpleGrid columns={1} spacing={10}>{taskCardList}</SimpleGrid>
      {/* <VStack spacing={4} p={2} m={2} justify="flex-start" >{taskCardList}</VStack> */}
      <br/>
      <FormControl>
        {!show && <Button onClick={handleClick}>New Task</Button>}
        {show && (
          <InputGroup>
            <Input
              type="text"
              name="task_title"
              id="task_title_add"
              placeholder="Enter Task Title"
              value={newTaskData}
              onChange={e => setNewTaskData(e.target.value)}
            />
            <Button type="submit" onClick={handleAddTask}>
              Add Task
            </Button>
          </InputGroup>
        )}
      </FormControl>
    </GridItem>
  );
}

export default CategoryColumn;
