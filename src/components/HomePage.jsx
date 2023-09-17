/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { logo } from '../assets';
import { loginUrl } from '../redux/services/Sp';

export default function HomePage() {
  return (
    <div className="h-screen w-screen flex items-center justify-center bg-[#191624]">
      <div className="text-center ">
        <img src={logo} className="w-60 h-32 mx-auto" alt="" />
        <p className="text-white mt-5 mb-5 font-semibold text-lg">Currently we are fetching data from Spotify API and are going to make our own database Soon. So you have to authenticate with your Spotify account to keep listening music with us. Sorry for inconvenience</p>
        <a href={loginUrl} className="bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-pink-500 hover:to-purple-500 text-white px-6 py-3 rounded-full shadow-lg transition-all duration-600 ease-in-out transform hover:scale-110 cursor-pointer">Login with Spotify</a>
      </div>
    </div>
  );
}
