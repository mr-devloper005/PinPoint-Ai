// // components/CustomGoogleLogin.jsx
// "use client";
// import React, { useEffect } from "react";
// import axios from "axios";


// function CustomGoogleLogin({text}) {
//  useEffect(() => {
//     if (window.google) {
//       window.google.accounts.id.initialize({
//         client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
//         callback: (response) => {
//           // response.credential contains the ID token
//           handleGoogleLogin(response.credential);
//         },
//       });

//       window.google.accounts.id.renderButton(
//         document.getElementById("google-signin-button"),
//         {
//           theme: "filled_blue",
//           size: "large",
//           text: "signin_with",
//           shape: "",
//           logo_alignment: "right",
//         }
//       );

      
//     }
//   }, []);

//   const handleGoogleLogin = async (idToken) => {
//     console.log("Received ID Token:", idToken);

//     // Send token to backend
//     const res = await fetch("http://localhost:8000/api/auth/googleauth", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       credentials: "include",
//       body: JSON.stringify({ token: idToken }),
//     });

//     const data = await res.json();
//     console.log("User data from backend:", data.user);
//   };

//   return (
//    <button 
//             type="button"
//             id="google-signin-button"
//             className="pl-4 min-h-16 w-3/4   cursor-pointer active:scale-95 ">
//             {text}
//           </button>
//   );
// }

// export default CustomGoogleLogin;


// "use client";
// import { useEffect } from "react";

// export default function CustomGoogleLogin() {
//   useEffect(() => {
//     /* Initialize GSI */
//     window.google.accounts.id.initialize({
//       client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
//       callback: (response) => {
//         const idToken = response.credential;
//         console.log("✅ ID Token mila:", idToken);

//         // Send to backend here if needed
//       },
//     });
//   }, []);

//   const handleClick = () => {
//     window.google.accounts.id.prompt(); // 👈 opens the One Tap popup
//   };

//   return (
//     <button
//       onClick={handleClick}
//       className=" cursor-pointer text-2xl active:scale-95 flex items-center justify-center pl-4 min-h-14 w-3/4 border-2 rounded-xl bg-white text-black gap-5"
//     >
//       <img
//         src="google.png"
//         alt="Google icon"
//         className="w-6 h-6"
//       />
//       Continue with Google
//     </button>
//   );
// }


// "use client";
// import { useEffect } from "react";

// export default function CustomGoogleLogin() {
//   useEffect(() => {
//     if (window.google) {
//       window.google.accounts.id.initialize({
//         client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
//         callback: (response) => {
//           const idToken = response.credential;
//           console.log("✅ ID Token mila:", idToken);

//           // Backend bhejna chaahe to yahan fetch karo
//         },
//       });

//       window.google.accounts.id.renderButton(
//         document.getElementById("google-signin-button"),
//         {
//           theme: "outline", // or filled_blue
//           size: "large",    // small, medium, large
//           text: "signin_with", // or continue_with
//           shape: "pill",    // rectangular, pill, circle
//           logo_alignment: "left",
//         }
//       );
//     }
//   }, []);

//   return (
//     <div
//       id="google-signin-button"
//       className="custom-google-button"
//     ></div>
//   );
// }




// "use client";
// import { useEffect } from "react";
// import axios from "axios";

// export default function CustomGoogleLogin() {


//   const handleCredentialResponse =async (response) => {
//     const idToken = response.credential;

// try {
//    const response = await axios.post("http://localhost:8000/api/auth/googleauth",{
//     token:idToken
//    })

//    console.log(response)
// } catch (error) {
//   console.log(error)
// }
//   };
//   useEffect(() => {
//     if (window.google) {
//       window.google.accounts.id.initialize({
//         client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
//         callback: handleCredentialResponse,
//       });

//       window.google.accounts.id.renderButton(
//         document.getElementById("google-signin-button"),
//         {
//           theme: "filled_blue",     
//           size: "large",            
//           text: "signin_with",     
//           shape: "pill",            
//           logo_alignment: "left",   
//         }
//       );
//     }
//   }, []);


//   return (
//     <div className="flex justify-center">
//       <div id="google-signin-button" className="custom-google-button" />
//     </div>
//   );
// }



"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { googleAuthThunk } from "@/slices/auth/authSlice";
import { useDispatch } from "react-redux";
import AuthLoading from "./loaders/AuthLoading";

export default function CustomGoogleLogin() {

  const dispatch = useDispatch()
  const isLoading = false
  const router = useRouter()

  async function handleCredentialResponse(response) {

dispatch(googleAuthThunk({response,toast,router}))
  }

  useEffect(() => {
    if (window.google) {
      window.google.accounts.id.initialize({
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
        callback: handleCredentialResponse,
      });

      window.google.accounts.id.renderButton(
        document.getElementById("google-signin-button"),
        {
          theme: "filled_blue",     
          size: "large",                            
          logo_alignment: "center",   
        }
      );
    }
  }, []);

  return (
    <>  
    {isLoading && <AuthLoading/>}
    <div className="flex justify-center">
      <div id="google-signin-button" className="custom-google-button" />
    </div></>
  );
}
