import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  theme,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import Landing from './pages/Landing/Landing';
import Signup from './pages/Signup/Signup';
import UserPage from './pages/UserPage/UserPage';
import Board from './pages/Board/Board';
import JoinableTeams from './pages/UserPage/Team/JoinableTeams';
import Navbar from './components/Navbar/Navbar';
// import { Logo } from './assets/Logo';

function App() {

  const [currentUser, setCurrentUser] = useState(null)
  const handleSetUser = (activeUser) => setCurrentUser(activeUser)
  // const handleLogout = () => setCurrentUser(null)

  useEffect(() => {
    fetch("/me")
    .then((res) => {
      if (res.ok) {
        res.json().then((user) => {
          setCurrentUser(user); 
        });
      }
      else {
        res.json().then(errors => {
          console.error(errors)
        })}
    });
  }, []);

  return (
    <ChakraProvider theme={theme}>
          <Navbar currentUser={currentUser} setActiveUser={handleSetUser} />
      <Box textAlign="center" fontSize="xl">
        {/* <Grid minH="100vh" p={3}> */}
            <Routes>
              <Route exact path="/" element={<Landing setActiveUser={handleSetUser} currentUser={currentUser}/>} />
              <Route exact path="/user-page" element={<UserPage currentUser={currentUser} setActiveUser={handleSetUser} />} />
              <Route exact path="/board/:boardId" element={<Board />} />
              <Route exact path="/join-teams" element={<JoinableTeams currentUser={currentUser} />} />
            </Routes>
        {/* </Grid> */}
      </Box>
    </ChakraProvider>
  );
}

export default App;
