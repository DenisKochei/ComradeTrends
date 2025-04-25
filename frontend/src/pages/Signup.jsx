import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Oauth from "../components/Oauth";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { refresh } from "../../redux/user/userSlice";
import { Helmet } from "react-helmet";
import { HiEye, HiEyeOff } from "react-icons/hi";

export function Signup() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(refresh());
  }, []);

  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.email || !formData.password) {
      setLoading(false);
      return setError("Please fill out all fields.");
    }
    try {
      setLoading(true);
      setError(null);
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        setLoading(false);
        return setError(data.message);
      }
      setLoading(false);
      if (res.ok) {
        navigate("/sign-in");
      }
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen mt-20">
      <Helmet>
        <title>{`ComradeTrends | SignUp Page`}</title>
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
            <span className=" px-2 py-1 bg-gradient-to-r text-3xl from-cyan-500 to-blue-600 rounded-md text-white">
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
            <Label value="Your username" />
            <div className="flex flex-col">
              <input
                className=" border dark:border-none border-slate-400 dark:bg-slate-700 rounded-lg w-full focus:ring-0"
                type="text"
                placeholder="user"
                id="username"
                onChange={changeHandler}
              />
            </div>
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
            {error && (
              <Alert className="mt-5" color="failure">
                {error}
              </Alert>
            )}
            <Button
              className="bg-gradient-to-r focus:ring-0 from-cyan-500 to-blue-600"
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner size="sm" />
                  <span className="pl-3">Loading...</span>
                </>
              ) : (
                "Signup"
              )}
            </Button>
            <Oauth />
          </form>
          <div className="flex gap-2 mt-5 text-sm">
            <span>Have an account?</span>
            <div></div>
            <Link to="/sign-in" className="text-cyan-500">
              Signin
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
