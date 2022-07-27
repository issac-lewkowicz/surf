// import React, {useEffect, useState} from 'react'
// import Team from './Team/Team'

// function OwnedTeamList({currentUser}) {

//   // const [tList, setTList] = useState([])
  
// // useEffect(() => {
// //   fetch('/my-teams')
// //       .then(res => res.json())
// //       .then(console.log)
// //   }, [])
// console.log(currentUser)
//   const ownedTeams = currentUser.owned_teams.map(team => <Team team={team} key={team.id} />)
//   if (ownedTeams === undefined) return <p>Loading ownedTeams...</p>;

//   return (
//     <div>{ownedTeams}</div>
//   )
// }

// export default OwnedTeamList