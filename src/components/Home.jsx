import React from 'react';
import { Container, Heading, Text, Button, Box } from '@chakra-ui/react';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

const Home = () => {
  return (
    <>
      <MotionBox bg="blue.700" color="white" textAlign="center" py={20} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
        <Heading as="h1" size="2xl" mb={4}>Industrial Solutions</Heading>
        <Text fontSize="xl" mb={6}>Delivering innovative solutions for a better tomorrow.</Text>
        <Button colorScheme="teal" size="lg">Get Started</Button>
      </MotionBox>
      <Container maxW="container.md" mt={10} textAlign="center">
        <Text>We provide top-tier industrial solutions to drive your business forward.</Text>
      </Container>
    </>
  );
};

export default Home;
