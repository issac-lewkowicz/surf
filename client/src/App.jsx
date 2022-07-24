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
// import { Logo } from './assets/Logo';

function App() {
  // const [count, setCount] = useState(0);

  // useEffect(() => {
  //   fetch('/hello')
  //     .then(r => r.json())
  //     .then(data => setCount(data.count));
  // }, []);

  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <Grid minH="100vh" p={3}>
          <ColorModeSwitcher justifySelf="flex-end" />
            <Routes>
              <Route exact path="/" element={<Landing />} />
              <Route exact path="/signup" element={<Signup />} />
            </Routes>
        </Grid>
      </Box>
    </ChakraProvider>
  );
}

export default App;
