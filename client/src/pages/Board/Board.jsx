import React from 'react'
import { useNavigate, useParams} from 'react-router-dom'



function Board() {
  let { boardId } = useParams()
//fetch the board by id

  return (
    <div>
      {/* actual board page */}
    </div>
  )
}

export default Board