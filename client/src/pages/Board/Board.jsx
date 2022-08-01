import React, {useEffect, useState} from 'react'
import { useNavigate, useParams} from 'react-router-dom'



function Board() {
  let { boardId } = useParams()

  const [boardData, setBoardData] = useState({})

useEffect(() => {
  fetch('boards/boardId')
  .then((res) => {
    if (res.ok) {
      res.json().then((data) => {
        setBoardData(data); 
      });
    }
    else {
      res.json().then(errors => {
        console.error(errors)
      })}
  });
})


console.log(boardId)



  return (
    <div>
      {/* actual board page */}
      board elements here: categories etc.
    </div>
  )
}

export default Board