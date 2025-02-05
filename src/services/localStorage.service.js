// Persist access token
export const persistToken = (token) => {
  localStorage.setItem("accessToken", token);
};

// Read access token from local storage
export const readToken = () => {
  return localStorage.getItem("accessToken");
};

// Persist user object into local storage
export const persistUser = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
};

// Read user from local storage
export const readUser = () => {
  const userStr = localStorage.getItem("user");

  if (userStr) {
    try {
      const parsedUser = JSON.parse(userStr);
      return parsedUser;
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      localStorage.removeItem("user"); // Clear corrupted data
      return null;
    }
  }

  return null; // Return null if no user is stored
};

// Delete access token from local storage
export const deleteToken = () => localStorage.removeItem("accessToken");

// Delete user data from local storage
export const deleteUser = () => localStorage.removeItem("user");
