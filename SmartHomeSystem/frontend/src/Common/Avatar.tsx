import React from 'react';

const Avatar = ({ imageUrl, altText, size }: any) => {
  return (
    <img
      src={imageUrl}
      alt={altText}
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        objectFit: 'cover',
      }}
    />
  );
};

export default Avatar;
