import React, { useState, useEffect } from 'react';
import {
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
} from '@chakra-ui/react';
import TaskCard from './TaskCard';
import { DeleteIcon } from '@chakra-ui/icons';

function CategoryColumn({ category, onDelete }) {
  const { title, id, tasks } = category;
  const [taskList, setTaskList] = useState(null);
  const [newTaskData, setNewTaskData] = useState('');
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  React.useEffect(() => {
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
    <Container
      border="1px"
      p="8px"
      borderRadius="2px"
      fontSize="15px"
      fontWeight="bold"
      borderColor="#ccd0d5"
    >
      <Heading fontSize="xl">
        <IconButton
          onClick={handleDeleteCategory}
          colorScheme="red"
          icon={<DeleteIcon />}
        />
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
      <VStack spacing={4}>{taskCardList}</VStack>
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
    </Container>
  );
}

export default CategoryColumn;
