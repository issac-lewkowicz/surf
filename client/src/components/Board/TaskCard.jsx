import React from 'react';
import {
  Stack,
  HStack,
  VStack,
  Button,
  Box,
  Container,
  Heading,
  Text,
  Spinner,
  Editable,
  EditableInput,
  EditableTextarea,
  EditablePreview,
} from '@chakra-ui/react';

function TaskCard({ task }) {
  const handleEditTaskCard = value => {
    console.log(value);

    const patchConfig = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({ title: value }),
    };

    fetch(`/tasks/${task.id}`, patchConfig).then(res => {
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
      <Editable defaultValue={task.title} onSubmit={handleEditTaskCard}>
        <EditablePreview />
        <EditableInput />
      </Editable>
    </Container>
  );
}

export default TaskCard;
