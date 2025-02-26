import { useState, useEffect } from 'react';
import axios from 'axios';

const useCMSContent = (endpoint) => {
  const [content, setContent] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(endpoint)
      .then(response => setContent(response.data.content))
      .catch(() => setError('Content not available'));
  }, [endpoint]);

  return error ? error : content;
};

export default useCMSContent;
