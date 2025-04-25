import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  signinFailure,
  signinSuccess,
  signinStart,
} from "../../redux/user/userSlice";
import { HiEye, HiEyeOff } from "react-icons/hi";
import Oauth from "../components/Oauth";
import { refresh } from "../../redux/user/userSlice";
import { Helmet } from "react-helmet";

export function Signin() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(refresh());
  }, []);
  const [formData, setFormData] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const { loading, error: errorMessage } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      return dispatch(signinFailure("Please fill out all fields"));
    }
    try {
      dispatch(signinStart());
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        return dispatch(signinFailure(data.message));
      }

      if (res.ok) {
        dispatch(signinSuccess(data));
        navigate("/");
      }
    } catch (err) {
      dispatch(signinFailure(err.message));
    }
  };

  return (
    <div className="min-h-screen mt-20">
      <Helmet>
        <title>{`ComradeTrends | SignIn Page`}</title>
        <meta
          name="description"
          content="We're your trusted source for the latest news, insightful analysis, and trending stories from around the world."
        />
      </Helmet>
      <div className="flex flex-col md:flex-row md:items-center p-3 max-w-3xl mx-auto gap-5">
        <div className="flex-1 ">
          <Link
            to="/"
            className=" whitespace-nowrap sm:text-4xl text-xl  font-bold dark:text-white"
          >
            <span className=" px-2 py-1 bg-gradient-to-r text-lg sm:text-3xl from-cyan-500 to-blue-600 rounded-md text-white">
              Comrade
            </span>
            Trends
          </Link>
          <p className="text-sm mt-5">
            A bustling hub of breaking news, Kenya's heartbeat echoing across
            the digital savanna.
          </p>
        </div>
        <div className="flex-1">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <Label value="Your email" />
            <div className="flex flex-col">
              <input
                className=" border dark:border-none border-slate-400 dark:bg-slate-700 rounded-lg w-full focus:ring-0"
                type="email"
                placeholder="name@gmail.com"
                id="email"
                onChange={changeHandler}
              />
            </div>
            <Label value="Your password" />
            <div className="flex justify-between border dark:border-none border-slate-400 items-center rounded-lg  dark:bg-slate-700">
              <input
                className="bg-transparent border-none w-full focus:ring-0"
                type={showPassword ? "text" : "password"}
                placeholder="*******"
                id="password"
                onChange={changeHandler}
              />
              <div>
                {showPassword ? (
                  <HiEyeOff
                    className="text-slate-500 cursor-pointer mr-2 w-4 h-4"
                    onClick={() => setShowPassword((prev) => !prev)}
                  />
                ) : (
                  <HiEye
                    className="text-slate-500 cursor-pointer mr-2 w-4 h-4"
                    onClick={() => setShowPassword((prev) => !prev)}
                  />
                )}
              </div>
            </div>
              {errorMessage && (
                <Alert className="mt-5" color="failure">
                  {errorMessage}
                </Alert>
              )}
            <Button
              className="bg-gradient-to-r from-cyan-500 to-blue-600 focus:ring-0"
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner size="sm" />
                  <span className="pl-3">Loading...</span>
                </>
              ) : (
                "Signin"
              )}
            </Button>
            <Oauth />
          </form>
          <div className="flex gap-2 mt-5 text-sm">
            <span>Don't have an account?</span>
            <Link to="/sign-up" className="text-cyan-500">
              Signup
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
