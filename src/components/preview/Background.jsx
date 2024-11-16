import React from 'react';

const Background = ({ styles }) => (
  <>
    <div
      style={{
        ...styles.decorativeBlob,
        width: '200px',
        height: '200px',
        background: 'linear-gradient(45deg, #FF59F8, #BD00FF)',
        top: '10%',
        left: '20%',
      }}
    />
    <div
      style={{
        ...styles.decorativeBlob,
        width: '250px',
        height: '250px',
        background: 'linear-gradient(45deg, #FFB86C, #FF4D4D)',
        bottom: '20%',
        right: '15%',
      }}
    />
    <div
      style={{
        ...styles.decorativeBlob,
        width: '180px',
        height: '180px',
        background: 'linear-gradient(45deg, #4DD4FF, #4DFF91)',
        top: '40%',
        right: '25%',
      }}
    />
  </>
);

export default Background;