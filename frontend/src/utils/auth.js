

export const isLoggedIn = () => {
  return localStorage.getItem('token') == null ? true : false;
};
