import React from 'react';
import useDocumentTitle from '@hooks/useDocumentTitle';
import { Box, Typography } from '@mui/material';
import styles from '@styles/Homepage.module.css';
import useMatchMedia from '@hooks/useMatchMedia';
import { SCREEN_BREAK_POINT } from '@utils/constants';

const HomePage = () => {
  useDocumentTitle();
  const screenWithinBreakpoint = useMatchMedia(SCREEN_BREAK_POINT);

  return (
    <Box
      className={`${screenWithinBreakpoint ? styles.homeContainerNarrow : styles.homeContainerWide}`}
    >
      <Box
        className={`${screenWithinBreakpoint ? styles.copyContainerNarrow : styles.copyContainerWide}`}
      >
        <Typography variant='h4'>
          Revolutionizing Learning: Intuitive Visualization for Complex Concepts
        </Typography>
        <Typography
          variant='body2'
          className={`${styles.bodyText}`}
        >
          Experience a new era of understanding, where concepts become clear and
          logic flows effortlessly, making the path from confusion to clarity
          both intuitive and accessible.
        </Typography>
      </Box>
      <Box
        className={`${screenWithinBreakpoint ? styles.imageContainerNarrow : styles.imageContainerWide}`}
      >
        <img
          className={`${screenWithinBreakpoint ? styles.homeImageNarrow : styles.homeImageWide}`}
          alt='A 3D model showing various gadgets and widgets.'
          src='/Linkta-Landing.png'
        ></img>
      </Box>
    </Box>
  );
};

export default HomePage;
