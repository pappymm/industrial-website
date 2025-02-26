import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ChakraProvider, Box, Flex } from "@chakra-ui/react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./components/Home";
import CMSPage from "./components/CMSPage";
import Contact from "./components/Contact";

const App = () => {
  return (
    <ChakraProvider>
      <Router>
        <Flex direction="column" minH="100vh">
          <Navbar />
          <Box flex="1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<CMSPage endpoint="/api/about" title="About Us" />} />
              <Route path="/solutions" element={<CMSPage endpoint="/api/solutions" title="Our Solutions" />} />
              <Route path="/investors" element={<CMSPage endpoint="/api/investors" title="Investor Relations" />} />
              <Route path="/sustainability" element={<CMSPage endpoint="/api/sustainability" title="Sustainability" />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </Box>
          <Footer />
        </Flex>
      </Router>
    </ChakraProvider>
  );
};

export default App;
