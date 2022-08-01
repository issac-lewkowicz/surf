import React, { useState } from 'react';
import { Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, Button, EditablePreview, Box, useColorModeValue, IconButton, Flex, Input, useDisclosure, useEditableControls, ButtonGroup, SlideFade, Editable, Tooltip, EditableInput, } from '@chakra-ui/react';
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
  const boardList = team.boards.map(board => <BoardButton board={board} key={board.id}/>)

  // useEffect(() => {
  //   setBoardList()
  //   }, [])

  function EditableControls() {
    const {
      isEditing,
      getSubmitButtonProps,
      getCancelButtonProps,
      getEditButtonProps,
    } = useEditableControls();

    return isEditing ? (
      <ButtonGroup justifyContent="end" size="sm" w="full" spacing={2} mt={2}>
        <IconButton icon={<CheckIcon />} {...getSubmitButtonProps()} />
        <IconButton icon={<CloseIcon />} {...getCancelButtonProps()} />
      </ButtonGroup>
    ) : (
      <Flex justifyContent="right">
        <IconButton size="sm" icon={<EditIcon />} {...getEditButtonProps()} />
      </Flex>
    );
  }
  return (
    <AccordionItem>
      <h2>
        <AccordionButton>
          <Box flex="1" textAlign="left">
            <Editable
              textAlign="left"
              defaultValue={team.team_name}
              fontSize="2xl"
              isPreviewFocusable={false}
            >
              {!show && (
                <Button onClick={handleClick}>
                  <EditablePreview />
                </Button>
              )}
              {show && <EditablePreview />}
              <Input as={EditableInput} />
              {show && <EditableControls />}
            </Editable>
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel pb={4}>
        {boardList}
        <NewBoardButton team={team} />
      </AccordionPanel>
    </AccordionItem>
  );
}
export default Team;
