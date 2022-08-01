import React from 'react';
import { ChakraProvider, Box, Text, Link, VStack, Code, Grid, theme, Button, FormControl, FormLabel, FormErrorMessage, FormHelperText, Input, InputGroup, InputRightElement, useToast,   Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody,  ModalCloseButton, useDisclosure} from '@chakra-ui/react';

function NewBoardButton({team}) {
  const [formData, setFormData] = React.useState("")
  const { isOpen, onOpen, onClose } = useDisclosure()


  const handleAddBoard = (e) => {
    e.preventDefault();
    const board = {team_id: team.id, 
    title: formData}
    const postConfig = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(board),
    };
  
    fetch(`/teams/${team.id}/boards`, postConfig)
        .then(res => { 
        if (res.ok) {
          res.json()
        .then((team => {
            onAddTeam(team);
            handleClick();
            setFormData("");
        }))}
        else {
          res.json().then(errors => {
            console.error(errors)
          })}
        })



    console.log('post new board button clicked');
    onClose()
  };

  return (
    <>
    <Box
      as="button"
      height="75px"
      width="150px"
      lineHeight="1.2"
      transition="all 0.2s cubic-bezier(.98,.92,.92,1)"
      border="1px"
      px="8px"
      borderRadius="2px"
      fontSize="15px"
      fontWeight="bold"
      bg="#f5f6f7"
      borderColor="#ccd0d5"
      color="#4b4f56"
      _hover={{ bg: '#ebedf0' }}
      _active={{
        bg: '#dddfe2',
        transform: 'scale(0.98)',
        borderColor: '#bec3c9',
      }}
      _focus={{
        boxShadow:
        '0 0 1px 2px rgba(88, 144, 255, .75), 0 1px 1px rgba(0, 0, 0, .15)',
      }}
      onClick={onOpen}
      >
      AddBoard
    </Box>
    <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>New Board</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            form Here
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={handleAddBoard}>
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
