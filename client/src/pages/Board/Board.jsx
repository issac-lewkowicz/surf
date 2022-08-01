import React, {useEffect, useState} from 'react'
import { useNavigate, useParams} from 'react-router-dom'
import CategoryColumn from '../../components/Board/CategoryColumn'



function Board() {
  let { boardId } = useParams()

  const [boardData, setBoardData] = useState({})

useEffect(() => {
  fetch(`/boards/${boardId}`)
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


// const categories = boardData.categories.map( category => <CategoryColumn category={category} key={category.id})
// console.log(boardId)



  return (
    <div>
      <h1> {boardData.title} </h1>

      {/* {categories} */}
    </div>
  )
}

export default Board