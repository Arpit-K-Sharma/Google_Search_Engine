import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ReactPlayer from 'react-player';
import { useResultContext } from '../contexts/ResultContextProvider';
import Loading from './Loading';

const Results = () => {
  const { results, isLoading, getResults, searchTerm } = useResultContext();
  const location = useLocation();

  useEffect(() => {
    if (searchTerm) {
      if (location.pathname === '/news') {
        getResults('news');
      }
      else if (location.pathname === '/videos') {
        getResults('videos');
      }
      else {
        getResults();
      }

    }
  }, [searchTerm, location.pathname]);


  if (isLoading) return <Loading />
  console.log(location.pathname);
  console.log('Results:', results);

  if (!results || results.length === 0) {
    return <div>No results found.</div>; // Handle no results case
  }

  switch (location.pathname) {
    case '/search':
      return (
        <div className='flex flex-wrap justify-between space-y-6 sm:px-56'>
          {results?.items?.map(({ link, displayLink, title, snippet }, index) => (
            <div key={index} className='md:w-2/5 w-full'>
              <a href={link} target='_blank' rel='noreferrer'>
                <p className='text-sm'>
                  {displayLink.length > 30 ? displayLink.substring(0, 30) : displayLink}
                </p>
                <p className='text-lg hover:underline dark:text-blue-300 text-blue-700'>
                  {title}
                </p>
                <p className='text-sm dark:text-grey-700 text-grey-200'>
                  {snippet}
                </p>
              </a>
            </div>
          ))}
        </div>
      );


    case '/images':
      return (
        <div className='flex flex-wrap justify-center items-center'>
          {results?.items?.map(({ pagemap, title }, index) => {
            const imageSrc = pagemap?.cse_image?.[0]?.src || pagemap?.cse_thumbnail?.[0]?.src;
    
            if (!imageSrc) {
              return null; // Skip rendering if imageSrc is not available
            }
    
            return (
              <div key={index} className='sm:p-3 p-5'>
                <a href={imageSrc} target='_blank' rel='noreferrer'>
                  <img
                    src={imageSrc}
                    alt={title}
                    className='w-full h-64 object-cover'
                    loading='lazy'
                  />
                </a>
                <p className='2-36 break-words text-sm mt-2'>
                  {title.length > 50 ? `${title.substring(0, 50)}...` : title}
                </p>
              </div>
            );
          })}
        </div>
      );

    case '/news':
      return (
        <div className='flex flex-wrap justify-between space-y-6 sm:px-56'>
          {results?.items?.map(({ link, displayLink, title, snippet }, index) => (
            <div key={index} className='md:w-2/5 w-full'>
              <a href={link} target='_blank' rel='noreferrer'>
                <p className='text-sm'>
                  {displayLink.length > 30 ? displayLink.substring(0, 30) : displayLink}
                </p>
                <p className='text-lg hover:underline dark:text-blue-300 text-blue-700'>
                  {title}
                </p>
                <p className='text-sm dark:text-grey-700 text-grey-200'>
                  {snippet}
                </p>
              </a>
            </div>
          ))}
        </div>
      );


      case '/videos':
  return (
    <div className='flex flex-wrap justify-center items-center'>
      {results?.items?.filter(({ id }) => id?.videoId).map(({ id, snippet }, index) => {
        const videoId = id.videoId;
        const videoLink = `https://www.youtube.com/watch?v=${videoId}`;
        const title = snippet?.title;

        return (
          <div key={index} className='sm:p-3 p-5'>
            <ReactPlayer url={videoLink} controls width="355px" height="200px" />
            <p className='2-36 break-words text-sm mt-2'>
              {title.length > 50 ? `${title.substring(0, 50)}...` : title}
            </p>
          </div>
        );
      })}
    </div>
  );

    default:
      return 'ERROR!';
  }
}

export default Results
