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
  Grid,
  GridItem,
} from '@chakra-ui/react';
import CategoryColumn from '../../components/Board/CategoryColumn';
import { DeleteIcon } from '@chakra-ui/icons';
import DeleteBoardButton from './DeleteBoardButton';

function Board() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();
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
    onClose();
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

  const preview = (
    <EditablePreview
      py={2}
      px={4}
      _hover={{
        background: useColorModeValue('gray.100', 'gray.700'),
      }}
    />
  );

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
    <div margin="auto" padding="10px">
      <Box overflowX="auto" p="30px" height="94.5vh" overflowY="hidden">
        <DeleteBoardButton handleDeleteBoard={handleDeleteBoard} />
        <Heading>
          <Editable defaultValue={boardData.title} onSubmit={handleEditBoard}>
            <Tooltip label="Click to edit">{preview}</Tooltip>
            <EditableInput />
          </Editable>
        </Heading>
        <Grid row={1} display="inline-flex" gap={5} justifySelf='start' minWidth="98vw">
          {/* <ButtonGroup spacing={10}> */}
            {categories}

          {/* </ButtonGroup> */}
            <GridItem>
              {!show && <Button onClick={handleClick}>Add A List</Button>}
              {show && (
                <InputGroup>
              <VStack>
                  <Input
                    // htmlSize={4}
                    width="auto"
                    type="text"
                    name="title"
                    id="category_title_add"
                    placeholder="Enter Category Title"
                    value={formData}
                    onChange={e => setFormData(e.target.value)}
                  />
                  <Button type="submit" onClick={handleAddCategory}>
                    Create List
                  </Button>
              </VStack>
                </InputGroup>
              )}
            </GridItem>
        </Grid>
      </Box>
    </div>
  );
}

export default Board;
