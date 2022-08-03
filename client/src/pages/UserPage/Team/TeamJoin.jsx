import React from 'react';
import { useNavigate } from "react-router-dom";
import { Button } from '@chakra-ui/react';

function TeamJoin({ team, currentUser }) {
  let navigate = useNavigate()


  const handleJoin = e => {
    // console.log(team);
    e.currentTarget.disabled = true;
    //display toast/redirect?
    // const currentTeamMembers = team.members

    // const patchConfig = {
    //   method: "PATCH",
    //   headers: {
    //     "Content-Type": "application/json",
    //     "Accept": "application/json",
    //   },
    //   body: JSON.stringify({key: "updatedValue"})
    // };

    // fetch(`/teams/${team.id}`, patchConfig).then...

    const postConfig = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        member_id: currentUser.id,
        team_id: team.id,
      }),
    };

    fetch(`/team_assignments`, postConfig).then(res => {
      if (res.ok) {
        res.json().then(item => {
          console.log(item)
          navigate(`/user-page`, { replace: true })
        });
      } else {
        res.json().then(errors => {
          console.error(errors);
        });
      }
    });
  };

  return <Button onClick={handleJoin}>{team.team_name}</Button>;
}

export default TeamJoin;
