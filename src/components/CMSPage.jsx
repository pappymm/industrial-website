import React, { useEffect, useState } from "react";
import { Box, Container, Heading, Spinner, Text } from "@chakra-ui/react";
import axios from "axios";

const API_BASE_URL = "http://localhost:5000"; // Ensure this matches your backend

const useCMSContent = (endpoint) => {
  const [content, setContent] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${API_BASE_URL}${endpoint}`)
      .then(response => {
        setContent(response.data.content);
        setLoading(false);
      })
      .catch(err => {
        setError("Content not available");
        setLoading(false);
      });
  }, [endpoint]);

  if (loading) return <Spinner />;
  return error ? error : content;
};

const CMSPage = ({ endpoint, title }) => {
  const content = useCMSContent(endpoint);

  return (
    <Container maxW="container.md" p={10} textAlign="center">
      <Heading as="h1" size="xl">{title}</Heading>
      <Box mt={4} dangerouslySetInnerHTML={{ __html: content }} />
    </Container>
  );
};

export default CMSPage;

