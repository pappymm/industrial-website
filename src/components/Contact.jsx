import React, { useState } from "react";
import { 
  Box, Button, Container, Flex, Heading, Input, Text, Textarea, VStack 
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import axios from "axios";

// Motion-wrapped components for smooth animations
const MotionBox = motion(Box);
const MotionButton = motion(Button);

const ContactForm = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post("/api/contact", formData);
      setStatus("Message sent successfully!");
    } catch {
      setStatus("Failed to send message.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <MotionBox
      as="form"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
      w="full"
      maxW="400px"
      bg="gray.700"
      p={6}
      borderRadius="lg"
      boxShadow="lg"
    >
      <VStack spacing={4}>
        <Input 
          name="name" 
          placeholder="Name" 
          onChange={handleChange} 
          bg="gray.800" 
          color="white"
          _placeholder={{ color: "gray.400" }} 
          borderColor="gray.600"
          _focus={{ borderColor: "blue.400" }}
        />
        <Input 
          name="email" 
          placeholder="Email" 
          type="email" 
          onChange={handleChange} 
          bg="gray.800" 
          color="white"
          _placeholder={{ color: "gray.400" }} 
          borderColor="gray.600"
          _focus={{ borderColor: "blue.400" }}
        />
        <Textarea 
          name="message" 
          placeholder="Message" 
          onChange={handleChange} 
          bg="gray.800" 
          color="white"
          _placeholder={{ color: "gray.400" }} 
          borderColor="gray.600"
          _focus={{ borderColor: "blue.400" }}
        />
        <MotionButton 
          type="submit" 
          colorScheme="blue"
          w="full"
          isLoading={loading}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.2 }}
        >
          Submit
        </MotionButton>
        {status && <Text color="gray.300">{status}</Text>}
      </VStack>
    </MotionBox>
  );
};

const Contact = () => (
  <Container maxW="container.md" p={10} textAlign="center">
    <Heading as="h1" size="xl" mb={6} color="white">Contact Us</Heading>
    <Flex justify="center">
      <ContactForm />
    </Flex>
  </Container>
);

export default Contact;
