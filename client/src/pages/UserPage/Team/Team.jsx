import React, {useState} from 'react'
import { Button, EditablePreview, Box, useColorModeValue, IconButton, Flex, Input, useDisclosure, useEditableControls, ButtonGroup, SlideFade, Editable, Tooltip, EditableInput } from "@chakra-ui/react";
import { CheckIcon, CloseIcon, EditIcon, } from "@chakra-ui/icons";

function Team({team}) {
  // const [name, setName] = useState(team.team_name)
  const [show, setShow] = useState(false)
  const handleClick = () => setShow(!show)

  // const handleSubmit = () => setName(team.team_name)

  function EditableControls() {
    const {
      isEditing,
      getSubmitButtonProps,
      getCancelButtonProps,
      getEditButtonProps,
    } = useEditableControls()
    

    return isEditing ? (
      <ButtonGroup justifyContent='end' size='sm' w="full" spacing={2} mt={2}>
        <IconButton icon={<CheckIcon />} {...getSubmitButtonProps()} />
        <IconButton icon={<CloseIcon />} {...getCancelButtonProps()} />
      </ButtonGroup>
    ) : (
      <Flex justifyContent='right'>
        <IconButton size='sm' icon={<EditIcon />} {...getEditButtonProps()} />
      </Flex>
    )
  }
  return (

    <Editable
      textAlign='left'
      defaultValue={team.team_name}
      fontSize='2xl'
      isPreviewFocusable={false}
    >
      {!show && <Button onClick={handleClick}><EditablePreview /></Button>}
      {show && <EditablePreview />}
      <Input as={EditableInput} />
      {show && <EditableControls />}
    </Editable>
  )
}
export default Team