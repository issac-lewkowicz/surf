import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  theme,
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  InputGroup,
  InputRightElement,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react';

function NewBoardButton({ team }) {
  const [formData, setFormData] = React.useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();
  let navigate = useNavigate();

  const handleAddBoard = e => {
    e.preventDefault();
    const board = { team_id: team.id, title: formData };
    const postConfig = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(board),
    };

    fetch(`/teams/${team.id}/boards`, postConfig).then(res => {
      if (res.ok) {
        res.json().then(board => {
          setFormData('');
          // console.log('post new board button clicked');
          navigate(`/board/${board.id}`, { replace: true });
        });
      } else {
        res.json().then(errors => {
          console.error(errors);
        });
      }
    });
  };

  return (
    <>
      <Button
        marginLeft={3}
        marginRight={0}
        colorScheme="green"
        onClick={onOpen}
      >
        AddBoard
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>New Board</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl isRequired>
              <Input
                type="text"
                name="title"
                id="board_title_add"
                placeholder="Enter Board Name"
                value={formData}
                onChange={e => setFormData(e.target.value)}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleAddBoard}>
              Create
            </Button>
            {/* <Button variant='ghost'>Secondary Action</Button> */}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default NewBoardButton;
