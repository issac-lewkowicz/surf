import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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
  Box,
  Editable,
  EditableInput,
  EditableTextarea,
  EditablePreview,
  Spinner,
  Tooltip,
  useColorModeValue,
  ButtonGroup,
  useToast,
  useDisclosure,
} from '@chakra-ui/react';
import CategoryColumn from '../../components/Board/CategoryColumn';
import { DeleteIcon } from '@chakra-ui/icons';

function Board() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = useRef()
  let { boardId } = useParams();
  let navigate = useNavigate();
  const toast = useToast();
  const [formData, setFormData] = useState('');
  const [boardData, setBoardData] = useState(null);
  const [categoryList, setCategoryList] = useState(null);
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  useEffect(() => {
    fetch(`/boards/${boardId}`).then(res => {
      if (res.ok) {
        res.json().then(data => {
          setBoardData(data);
          setCategoryList(data.categories);
        });
      } else {
        res.json().then(errors => {
          console.error(errors);
        });
      }
    });
  }, []);

  const onAddCategory = newCategory => {
    const updatedCategoryList = [...categoryList, newCategory];
    setCategoryList(updatedCategoryList);
  };

  const onDeleteCategory = id => {
    const updatedCategoryList = categoryList.filter(
      category => category.id !== id
    );
    setCategoryList(updatedCategoryList);
  };

  const handleAddCategory = e => {
    e.preventDefault();
    const newCategory = { board_id: boardId, title: formData };
    const postConfig = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newCategory),
    };

    fetch(`/boards/${boardId}/categories`, postConfig).then(res => {
      if (res.ok) {
        res.json().then(newCategory => {
          onAddCategory(newCategory);
          handleClick();
          setFormData('');
        });
      } else {
        res.json().then(errors => {
          console.error(errors);
        });
      }
    });
  };

  const handleEditBoard = value => {
    console.log(value);

    const patchConfig = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({ title: value }),
    };

    fetch(`/boards/${boardId}`, patchConfig).then(res => {
      if (res.ok) {
        res.json().then(console.log);
      } else {
        res.json().then(errors => {
          console.error(errors);
        });
      }
    });
  };

  if (!boardData) return <Spinner />;
  if (!categoryList) return <Spinner />;

  const categories = categoryList.map(category => (
    <CategoryColumn
      category={category}
      key={category.id}
      onDelete={onDeleteCategory}
    />
  ));

  const handleDeleteBoard = () => {
    fetch(`/boards/${boardId}`, {
      method: 'DELETE',
    }).then(res => {
      if (res.ok) {
        onClose();
        toast({
          title: 'Board Deleted!',
          description: 'You have successfully deleted the board',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
        navigate(`/user-page`, { replace: true });
      } else {
        res.json().then(errors => console.error(errors));
      }
    });
  };

  return (
    <>
      <Box display="flex">
        <Button
          onClick={onOpen}
          variant="outline"
          colorScheme="red"
          alignSelf="left"
        >
          <DeleteIcon />
          &ensp;Delete Board
        </Button>
        <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Delete Board
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme='red' onClick={handleDeleteBoard} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
      </Box>
      <Box>
        <Heading>
          <Editable defaultValue={boardData.title} onSubmit={handleEditBoard}>
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
        <HStack>
          <ButtonGroup spacing={10}>
            {categories}

            <FormControl>
              {!show && <Button onClick={handleClick}>Add A Category</Button>}
              {show && (
                <InputGroup>
                  <Input
                    type="text"
                    name="title"
                    id="category_title_add"
                    placeholder="Enter Category Title"
                    value={formData}
                    onChange={e => setFormData(e.target.value)}
                  />
                  <Button type="submit" onClick={handleAddCategory}>
                    Create Category
                  </Button>
                </InputGroup>
              )}
            </FormControl>
          </ButtonGroup>
        </HStack>
      </Box>
    </>
  );
}

export default Board;
