import { useEffect, useState } from 'react';
import { useContentstore } from '../store/content';
import axios from 'axios';

const useGetTrendingContent = () => {
  const [trendingContent, setTrendingContent] = useState([]);
  const { contentType } = useContentstore();

  useEffect(() => {
    const getTrendingContent = async () => {
      try {
        console.log(contentType);
        const res = await axios.get(`/api/v1/${contentType}/trending`);
        setTrendingContent(res.data.content);
      } catch (error) {
        console.error('Error fetching trending content:', error);
      }
    };
    getTrendingContent();
  }, [contentType]);

  return { trendingContent };
};

export default useGetTrendingContent;
