import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import  { Button, Stack, HStack, VStack,  FormControl, FormLabel, FormErrorMessage, FormHelperText, Input, InputGroup, InputRightElement } from '@chakra-ui/react'
import CategoryColumn from '../../components/Board/CategoryColumn';

function Board() {
  let { boardId } = useParams();
  const [formData, setFormData] = useState('');
  const [boardData, setBoardData] = useState({});
  const [categoryList, setCategoryList] = useState([]);

  const [show, setShow] = useState(false)
  const handleClick = () => setShow(!show)

  useEffect(() => {
    fetch(`/boards/${boardId}`).then(res => {
      if (res.ok) {
        res.json().then(data => {
          setBoardData(data);
          setCategoryList(boardData.categories);
        });
      } else {
        res.json().then(errors => {
          console.error(errors);
        });
      }
    });
  });

  const onAddCategory = (newCategory) => {
    const updatedCategoryList = [...categoryList, newCategory];
    setCategoryList(updatedCategoryList)
    }

  const handleAddCategory = (e) => {
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
  }

  if (!boardData) return <p>Loading...</p>;
  if (!categoryList) return <p>Loading...</p>;

  const categories = categoryList.map(category => (
    <CategoryColumn category={category} key={category.id} />
  ));

  return (
    <div>
      <h1> {boardData.title} </h1>
    <HStack>

      {categories}

      <FormControl>
        {!show && (<Button onClick={handleClick}>Add A Category</Button>)}
        {show && (<InputGroup><Input type="text" name="team_name" id="team_name_add" placeholder="Enter Team Name" value={formData} onChange={(e) => setFormData(e.target.value)} /> 
        <Button type='submit' onClick={handleAddCategory}>Create Category</Button></InputGroup>)}
      </FormControl>
    </HStack>
    </div>
  );
}

export default Board;
