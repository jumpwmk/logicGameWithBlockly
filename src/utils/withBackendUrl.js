export const withBackendUrl = url => {
  console.log(process.env.REACT_APP_NODE_ENV);
  if (process.env.REACT_APP_NODE_ENV === 'development') {
    return 'http://localhost:3001' + url;
  }
  if (process.env.REACT_APP_NODE_ENV === 'test') {
    // Wait for real url
    return 'http://localhost:3001' + url;
  }
};
