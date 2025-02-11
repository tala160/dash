export const persistUser = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
};

export const persistToken = (token) => {
  localStorage.setItem("accessToken", token);
};

export const readToken = () => {
  const currentaccessToken = localStorage.getItem("accessToken");

  return currentaccessToken;
};

export const readUser = () => {
  const userStr = localStorage.getItem("user");

  if (userStr) {
    try {
      const parsedUser = JSON.parse(userStr);
      return parsedUser;
    } catch (error) {
      localStorage.removeItem("user", error); // Clear corrupted data
      return null;
    }
  }

  return null; // Return null if no user is stored
};

export const deleteToken = () => localStorage.removeItem("accessToken");

// Delete user data from local storage
export const deleteUser = () => localStorage.removeItem("user");
