import AuthService from '../service/AuthService';

export const useIsAuthenticate = async () => {
  const token = localStorage.getItem('Token:');
  const authService = new AuthService();
  const validate = await authService.verifyUser(token);

  return {
    token,
    validate
  };
};
