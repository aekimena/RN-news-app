import axios from 'axios';
import {useState} from 'react';
import {KEYS} from '../../secretKeys.config';

export const useGetCategoryNews = () => {
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const getCategoryNews = ({
    topic,
  }: {
    topic:
      | 'WORLD'
      | 'BUSINESS'
      | 'ENTERTAINMENT'
      | 'TECHNOLOGY'
      | 'entertainment'
      | 'NATIONAL'
      | 'SPORTS'
      | 'SCIENCE'
      | 'HEALTH';
  }) => {
    return new Promise(async (resolve, reject) => {
      setLoading(true);
      setIsError(false);
      const options = {
        method: 'GET',
        url: 'https://real-time-news-data.p.rapidapi.com/topic-headlines',
        params: {
          lang: 'en',
          topic,
          country: 'NG',
          limit: 50,
        },
        headers: {
          'x-rapidapi-key': KEYS.radipApiKey,
          'x-rapidapi-host': 'real-time-news-data.p.rapidapi.com',
        },
      };

      try {
        const response = await axios.request(options);
        resolve({data: response.data});
      } catch (error) {
        console.error(error);
        reject(error);
        setIsError(true);
      } finally {
        setLoading(false);
      }
    });
  };

  return {getCategoryNews, loading, isError};
};
