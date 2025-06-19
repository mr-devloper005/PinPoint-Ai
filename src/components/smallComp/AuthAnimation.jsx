// src/components/Loader.jsx

import React from "react";
import Lottie from "lottie-react";
import loadingAnimation from "@/assets/animations/.json"; 

const AuthAnimation = () => {
  return (
    <div className="w-64 h-64 flex justify-center items-center">
      <Lottie
        animationData={loadingAnimation}
        loop
        autoplay
      />
    </div>
  );
};

export default AuthAnimation;
