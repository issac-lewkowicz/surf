import React, { useState } from 'react';
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Button,
  EditablePreview,
  Box,
  useColorModeValue,
  IconButton,
  Flex,
  Input,
  useDisclosure,
  useEditableControls,
  ButtonGroup,
  SlideFade,
  Editable,
  Tooltip,
  EditableInput,
  Heading,
} from '@chakra-ui/react';
import { CheckIcon, CloseIcon, EditIcon } from '@chakra-ui/icons';
import BoardButton from '../../Board/BoardButton';
import NewBoardButton from '../../Board/NewBoardButton';

function Team({ team }) {
  // const [name, setName] = useState(team.team_name)
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  // console.log(team)
  // const handleSubmit = () => setName(team.team_name)
  // const [boardList, setBoardList] = useState([])
  const boardList = team.boards.map(board => (
    <BoardButton board={board} key={board.id} />
  ));

  const handleEditTeam = value => {
    console.log(value);
    const patchConfig = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({ team_name: value }),
    };

    fetch(`/teams/${team.id}`, patchConfig).then(res => {
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
    <AccordionItem>
      <Heading fontSize="xl" >
        <AccordionButton>
          <Box flex="1" textAlign="left">
            <Editable defaultValue={team.team_name} onSubmit={handleEditTeam}>
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
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </Heading>
      <AccordionPanel pb={4}>
        {boardList}
        <NewBoardButton team={team} />
      </AccordionPanel>
    </AccordionItem>
  );
}
export default Team;
