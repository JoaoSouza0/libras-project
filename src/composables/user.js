export const useIsAuthenticate = () => {
  const token = JSON.parse(localStorage.getItem('Token:'));
  return {
    token,
    authenticate: !!token
  };
};
