// Copyright 2025 PREM
// 
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
// 
//     https://www.apache.org/licenses/LICENSE-2.0
// 
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export const AppContext = createContext();

const AppContextProvider = (props) => {
    const [user, setUser] = useState(null);
    const [showLogin, setShowLogin] = useState(false);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [credit, setCredit] = useState(false);

    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const navigate = useNavigate();

    const loadCreditsData = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/user/credit', {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (data.success) {
                setCredit(data.credits);
                setUser(data.user);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || error.message);
        }
    };

    const generateImage = async (prompt) => {
      try {
          if (!user || !user._id) {
              toast.error("Please login first");
              setShowLogin(true);
              return;
          }
          
          // Show loading indicator
          toast.info("Generating image, please wait...", { autoClose: false, toastId: "generating" });
          
          const { data } = await axios.post(
              backendUrl + '/api/image/generate-image',
              { 
                  userId: user._id, // Include the user ID
                  prompt 
              },
              { headers: { Authorization: `Bearer ${token}` } }
          );
      
          // Dismiss the loading toast
          toast.dismiss("generating");
          
          if (data.success) {
              loadCreditsData();
              return data.resultImage;
          } else {
              toast.error(data.message);
              loadCreditsData();
              if (data.creditBalance === 0) {
                  navigate('/buy');
              }
          }
      } catch (error) {
          // Dismiss the loading toast if there's an error
          toast.dismiss("generating");
          console.error("Image generation error:", error);
          toast.error(error.response?.data?.message || "Failed to generate image. Try again!");
      }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setToken('');
        setUser(null);
    };

    useEffect(() => {
        if (token) {
            loadCreditsData();
        }
    }, [token]);

    const value = {
        user,
        setUser,
        showLogin,
        setShowLogin,
        backendUrl,
        token,
        setToken,
        credit,
        setCredit,
        loadCreditsData,
        logout,
        generateImage
    };

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    );
};

export default AppContextProvider;
