import React from 'react';
import NextHead from 'next/head';

interface HeadProps {
  title: string;
  description?: string;
}

const head: React.FC<HeadProps> = ({ title, description }) => {
  return (
    <NextHead>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>{title}</title>
      {description && <meta name="description" content={description} />}
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,1,0" />
      {/* Add other meta tags, stylesheets, scripts, etc., as needed */}
    </NextHead>
  );
};

export default head;