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
  Flex,
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
    <HStack
    // row={1}
    // align="left" 
    // justify="left"
      border="1px"
      p="8px"
      borderRadius="2px"
      fontSize="15px"
      fontWeight="bold"
      borderColor="#ccd0d5"
      boxShadow="md"
      // wrap='wrap'
      // maxWidth="100px"
      
    >
        <IconButton onClick={onOpen} colorScheme="red" icon={<DeleteIcon />} />
      <Editable defaultValue={task.title} onSubmit={handleEditTaskCard} wrap='wrap'>
        <AlertDialog
          isOpen={isOpen}
          leastDestructiveRef={cancelRef}
          onClose={onClose}
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize="lg" fontWeight="bold">
                Delete Card
              </AlertDialogHeader>

              <AlertDialogBody>
                Are you sure you want to delete this card?
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
              background: useColorModeValue('gray.100', 'gray.700'),
            }}
          />
        </Tooltip>
        <EditableTextarea textAlign='left' />
      </Editable>
      </HStack>
  );
}

export default TaskCard;
