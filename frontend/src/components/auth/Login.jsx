import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "@/redux/authSlice";
import { Loader2 } from "lucide-react";

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });
  const { loading, user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(res.data.user));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      dispatch(setLoading(false));
    }
  };
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, []);
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Navbar />
      <div className="flex items-center justify-center max-w-7xl mx-auto px-4 py-8">
        <form
          onSubmit={submitHandler}
          className="w-full max-w-md border border-gray-200 dark:border-gray-800 rounded-xl shadow-lg p-6 md:p-8 my-4 md:my-10 bg-white dark:bg-gray-900"
        >
          <h1 className="font-bold text-2xl md:text-3xl mb-6 text-center text-gray-900 dark:text-gray-100">
            Welcome Back
          </h1>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-6">
            Login to continue your job search
          </p>
          <div className="my-4">
            <Label className="text-gray-700 dark:text-gray-300 font-medium">
              Email
            </Label>
            <Input
              type="email"
              value={input.email}
              name="email"
              onChange={changeEventHandler}
              placeholder="your.email@example.com"
              className="mt-1.5 dark:bg-gray-800 dark:border-gray-700"
            />
          </div>

          <div className="my-4">
            <Label className="text-gray-700 dark:text-gray-300 font-medium">
              Password
            </Label>
            <Input
              type="password"
              value={input.password}
              name="password"
              onChange={changeEventHandler}
              placeholder="Enter your password"
              className="mt-1.5 dark:bg-gray-800 dark:border-gray-700"
            />
          </div>
          <div className="my-5">
            <Label className="text-gray-700 dark:text-gray-300 font-medium mb-3 block">
              I am a
            </Label>
            <div className="flex items-center gap-3 flex-wrap">
              <Button
                type="button"
                onClick={() => setInput({ ...input, role: "student" })}
                variant={input.role === "student" ? "default" : "outline"}
                className={`flex-1 min-w-[140px] h-11 ${
                  input.role === "student"
                    ? "bg-[#0a66c2] hover:bg-[#004182] dark:bg-[#70b5f9] dark:hover:bg-[#5a9ad8] text-white"
                    : "border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                }`}
              >
                Student
              </Button>
              <Button
                type="button"
                onClick={() => setInput({ ...input, role: "recruiter" })}
                variant={input.role === "recruiter" ? "default" : "outline"}
                className={`flex-1 min-w-[140px] h-11 ${
                  input.role === "recruiter"
                    ? "bg-[#0a66c2] hover:bg-[#004182] dark:bg-[#70b5f9] dark:hover:bg-[#5a9ad8] text-white"
                    : "border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                }`}
              >
                Recruiter
              </Button>
            </div>
          </div>
          {loading ? (
            <Button className="w-full my-6 bg-[#0a66c2] hover:bg-[#004182] dark:bg-[#70b5f9] dark:hover:bg-[#5a9ad8] h-11">
              {" "}
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait{" "}
            </Button>
          ) : (
            <Button
              type="submit"
              className="w-full my-6 bg-[#0a66c2] hover:bg-[#004182] dark:bg-[#70b5f9] dark:hover:bg-[#5a9ad8] h-11"
            >
              Login
            </Button>
          )}
          <div className="text-center">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-[#0a66c2] dark:text-[#70b5f9] font-semibold hover:underline"
              >
                Sign Up
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
