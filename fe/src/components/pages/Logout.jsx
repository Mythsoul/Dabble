import React from 'react'
import useAuthStore from '@/store/AuthStore'
import axios from "axios"; 
function Logout() {
  const logout = useAuthStore((state) => state.resetAuth); 
axios.defaults.withCredentials = true; // Ensure cookies are sent with requests
  const handleLogout = () => {
    axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/logout`, {Credential: true }, { withCredentials: true })
      .then(response => {
        if (response.status === 200) {
          console.log("Logout successful");
        } else {
          console.error("Logout failed");
        }
      })
      .catch(error => {
        console.error("Error during logout:", error);
      });
    logout();
  };

  return (
    <div>
      <h1>Logout</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Logout