import React from 'react'
import EditTeam from './EditTeam'

function Team({team}) {
  return (
    <div>
      <h4>{team.team_name}</h4>
      <EditTeam team={team} />
    </div>
  )
}

export default Team