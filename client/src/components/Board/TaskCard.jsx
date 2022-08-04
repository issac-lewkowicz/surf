import React from 'react';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
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
  Tooltip,
  useColorModeValue,
  IconButton,
  useDisclosure,
} from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';

function TaskCard({ task, onDeleteTask }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();

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

  const handleDeleteTask = () => {
    fetch(`/tasks/${task.id}`, {
      method: 'DELETE',
    }).then(res =>
      res.ok
        ? onDeleteTask(task.id)
        : res.json().then(errors => console.error(errors))
    );
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
        <IconButton onClick={onOpen} colorScheme="red" icon={<DeleteIcon />} />
        <AlertDialog
          isOpen={isOpen}
          leastDestructiveRef={cancelRef}
          onClose={onClose}
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize="lg" fontWeight="bold">
                Delete Task
              </AlertDialogHeader>

              <AlertDialogBody>
                Are you sure you want to delete this task?
              </AlertDialogBody>

              <AlertDialogFooter>
                <Button ref={cancelRef} onClick={onClose}>
                  Cancel
                </Button>
                <Button colorScheme="red" onClick={handleDeleteTask} ml={3}>
                  Delete
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
        <Tooltip label="Click to edit">
          <EditablePreview
            py={2}
            px={4}
            _hover={{
              background: useColorModeValue('gray.200', 'gray.600'),
            }}
          />
        </Tooltip>
        <EditableInput />
      </Editable>
    </Container>
  );
}

export default TaskCard;
