// src/utils/auth/logout.ts

export const performLogout = (
  logout: () => void,
  navigate: (path: string) => void
) => {
  logout(); // Clear AuthContext & localStorage
  navigate("/login"); // Redirect to login
};