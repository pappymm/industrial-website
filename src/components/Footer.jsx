import React from "react";
import { Box, Text } from "@chakra-ui/react";

const Footer = () => (
  <Box bg="gray.800" color="white" py={4} textAlign="center" mt={8}>
    <Text>&copy; {new Date().getFullYear()} MUSAPAPPY. All rights reserved.</Text>
  </Box>
);

export default Footer;
