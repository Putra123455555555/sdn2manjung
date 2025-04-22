import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import apiClient from '../../../services/apiClient';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await apiClient.get('/api/auth/token');
      const decoded = jwtDecode(response.data.accessToken);
      setUsername(decoded.username);
      setEmail(decoded.email);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  return (
    <div className='p-4'>
      <div className="p-6 bg-white shadow-md rounded-lg flex justify-between items-center">
        {/* Welcome Message */}
        <div>
          <h1 className="text-sm">Welcome Back</h1>
          <p className="text-3xl  tracking-wide font-bold text-red-700">{username}</p>
        </div>

        {/* Profile & Logout Section */}
        <div className="flex items-center space-x-5">
          {/* User Info */}
          <div className="hidden md:flex items-center space-x-3">
            <p className="font-medium ">{email}</p>
            <div className="bg-red-600  rounded-full w-14 h-14 flex items-center justify-center">
              <FontAwesomeIcon icon={faUserCircle} className="text-xl text-white" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
