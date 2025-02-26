import React from "react";
import { Flex, Link, Text } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

const Navbar = () => (
  <Flex as="nav" bg="blue.800" color="white" p={4} justify="space-between" align="center">
    <Text fontSize="xl" fontWeight="bold">MUSAPAPPY.</Text>
    <Flex gap={6}>
      <Link as={RouterLink} to="/">Home</Link>
      <Link as={RouterLink} to="/about">About</Link>
      <Link as={RouterLink} to="/solutions">Solutions</Link>
      <Link as={RouterLink} to="/investors">Investors</Link>
      <Link as={RouterLink} to="/sustainability">Sustainability</Link>
      <Link as={RouterLink} to="/contact">Contact</Link>
    </Flex>
  </Flex>
);

export default Navbar;
