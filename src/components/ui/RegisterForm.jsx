"use client";

import React from "react";
import Heading from "../smallComp/Heading";
import Link from "next/link";
import { useForm } from "react-hook-form";
import CustomGoogleLogin from "../smallComp/DemoLogin";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import {  registerThunk } from "@/slices/auth/authSlice";
import AuthLoading from "../smallComp/loaders/AuthLoading";

function RegisterForm() {
  const dispatch = useDispatch()
 const isLoading = useSelector(state => state.auth.isLoading)
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {

    dispatch(registerThunk({...data,toast,router}))
  };
  return (

    <>  

    {isLoading && <AuthLoading></AuthLoading>}
    <div className="h-full   w-full bg-gray-950  flex justify-center items-center font-bold">
      <div className="h-3/4  w-1/4  flex items-center justify-around flex-col text-white min-w-lg">
        <Heading heading={"Register"} />
        <form
          onSubmit={handleSubmit(onSubmit)}
          action=""
          className="h-[70%] text-xl w-full  flex items-center gap-5  flex-col">

            {errors.name && <p className="text-red-500 text-lg">{errors.name.message}</p>}

            <input
            {...register("name", {
              required: "* Name is Required",
            
            })}
            className="pl-4 min-h-14 w-3/4 border-2 rounded-xl"
            placeholder="Name"
          />
          {errors.email && (
            <p className="text-red-500 text-lg ">{errors.email.message}</p>
          )}

          <input
            {...register("email", {
              required: "* Email is Required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Enter a valid email address",
              },
            })}
            className="pl-4 min-h-14 w-3/4 border-2 rounded-xl"
            placeholder="Email"
          />

          {errors.password && (
            <p className="text-red-500 text-center  text-lg w-[90%]">{errors.password.message}</p>
          )}
          <input
            type="password"
            {...register("password", {
              required: "*Password is required",
              pattern: {
  value: /^(?=.*\d).{6,}$/,
  message: "Password must be at least 6 characters and include a number",
}

            })}
            autoComplete="current-password"
            className="pl-4 min-h-14 w-3/4 border-2 rounded-xl"
            placeholder="Password"
          />

          <button
            type="submit"
            className="pl-4 min-h-14 w-3/4 border-2 text-2xl  cursor-pointer active:scale-95 rounded-xl bg-emerald-500 text-black">
            Register
          </button>
          <CustomGoogleLogin text={" Google "}/>

          <p className="font-serif text-xl text-stone-600">
            Already have an account?
          </p>
          <Link
            href="/login"
            className=" cursor-pointer text-2xl active:scale-95 flex items-center justify-center pl-4 min-h-14 w-3/4 border-2 rounded-xl bg-orange-800 text-black">
            Login
          </Link>
        </form>
      </div>
    </div></>
  );
}

export default RegisterForm;
