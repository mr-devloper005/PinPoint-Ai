"use client";

import React from "react";
import Heading from "../smallComp/Heading";
import Link from "next/link";
import { useForm } from "react-hook-form";
import CustomGoogleLogin from "../smallComp/DemoLogin";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { loginThunk } from "@/slices/auth/authSlice";
import AuthLoading from "../smallComp/loaders/AuthLoading";

function LoginForm() {

  const dispatch = useDispatch()
  const isLoading = useSelector(state => state.auth.isLoading)
  console.log(isLoading)
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {

   dispatch(loginThunk({...data,toast,router}))

  };


  return (<>  
{isLoading && <AuthLoading/>}
    <div className="h-full w-full bg-stone-950  flex justify-center items-center font-bold">
      <div className="h-2/3  w-1/4  flex items-center justify-between flex-col text-white min-w-lg">
        <Heading heading={"Login"} />
        <form
          onSubmit={handleSubmit(onSubmit)}
          action=""
          className="h-[70%] text-xl w-full  flex items-center gap-5  flex-col">
          {errors.email && (
            <p className="text-red-500 text-lg">{errors.email.message}</p>
          )}
          <input
            {...register("email", {
              required: "* Email is Required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Enter a valid email address",
              },
            })}
            className="pl-4 min-h-14 w-3/4 lg:w-full border-2 rounded-xl"
            placeholder="Email"
          />

          {errors.password && (
            <p className="text-red-500 text-center  text-lg w-[90%]">{errors.password.message}</p>
          )}
          <input
            type="password"
            {...register("password", {
              required: "Password is required",
            })}
            autocomplete="current-password"
            className="pl-4 min-h-14 w-3/4 lg:w-full border-2 rounded-xl"
            placeholder="Password"
          />

          <button
            type="submit"
            className="pl-4 min-h-14 w-3/4 lg:w-full border-2 text-2xl  cursor-pointer active:scale-95 rounded-xl bg-zinc-500 text-black">
            Login
          </button>
          
          <div className="flex min-h-14 flex-col md:flex-row w-3/4 lg:w-full gap-6 justify-around p-3 items-center">  
          <CustomGoogleLogin text={" Google "}/>

        or
          <Link
            href="/register"
            className=" cursor-pointer w-1/3 h-full p-3 bg-gray-600 rounded-lg flex items-center justify-center   text-white">
           Register
          </Link></div>
        </form>
      </div>
    </div></>
  );
}

export default LoginForm;
