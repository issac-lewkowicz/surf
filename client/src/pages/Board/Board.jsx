import React, {useEffect, useState} from 'react'
import { useNavigate, useParams} from 'react-router-dom'



function Board() {
  let { boardId } = useParams()

  // const [boardData, setBoardData] = useState({})

//fetch the board by id

// useEffect(() => {
//   fetch('boards/boardId?')???????????????????????
//       .then(res => res.json())
//       .then(console.log)
//   }, [])



console.log(boardId)

  return (
    <div>
      {/* actual board page */}
      board elements here: categories etc.
    </div>
  )
}

export default Board