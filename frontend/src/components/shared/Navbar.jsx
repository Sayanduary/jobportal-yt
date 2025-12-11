import React, { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Avatar, AvatarImage } from "../ui/avatar";
import { LogOut, User2, Moon, Sun, Briefcase, Menu, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { setUser } from "@/redux/authSlice";
import { toast } from "sonner";
import { useTheme } from "../theme-provider";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogoClick = () => {
    navigate("/");
  };

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 border-b dark:border-gray-800 sticky top-0 z-50 shadow-sm">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16 px-4 md:px-6">
        {/* Logo */}
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={handleLogoClick}
        >
          <Briefcase className="h-6 w-6 md:h-8 md:w-8 text-[#0a66c2]" />
          <h1 className="text-xl md:text-2xl font-bold text-[#0a66c2] dark:text-[#70b5f9]">
            careerX
          </h1>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6 lg:gap-8">
          <ul className="flex font-medium items-center gap-5 lg:gap-6 text-gray-700 dark:text-gray-300">
            {user && user.role === "recruiter" ? (
              <>
                <li className="hover:text-[#0a66c2] dark:hover:text-[#70b5f9] cursor-pointer transition-colors">
                  <Link to="/admin/companies">Companies</Link>
                </li>
                <li className="hover:text-[#0a66c2] dark:hover:text-[#70b5f9] cursor-pointer transition-colors">
                  <Link to="/admin/jobs">Jobs</Link>
                </li>
              </>
            ) : (
              <>
                <li className="hover:text-[#0a66c2] dark:hover:text-[#70b5f9] cursor-pointer transition-colors">
                  <Link to="/">Home</Link>
                </li>
                <li className="hover:text-[#0a66c2] dark:hover:text-[#70b5f9] cursor-pointer transition-colors">
                  <Link to="/jobs">Jobs</Link>
                </li>
              </>
            )}
          </ul>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5 text-gray-600 dark:text-gray-300" />
            ) : (
              <Moon className="h-5 w-5 text-gray-600" />
            )}
          </Button>
          {!user ? (
            <div className="flex items-center gap-3">
              <Link to="/login">
                <Button
                  variant="ghost"
                  className="text-[#0a66c2] hover:bg-[#e8f3ff] dark:text-[#70b5f9] dark:hover:bg-gray-800 font-semibold"
                >
                  Sign In
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-[#0a66c2] hover:bg-[#004182] dark:bg-[#70b5f9] dark:hover:bg-[#5a9ad8] text-white font-semibold rounded-full px-6">
                  Join now
                </Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage
                    src={
                      user?.profile?.profilePhoto ||
                      "https://github.com/shadcn.png"
                    }
                    alt="@shadcn"
                  />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="">
                  <div className="flex gap-2 space-y-2">
                    <Avatar className="cursor-pointer">
                      <AvatarImage
                        src={
                          user?.profile?.profilePhoto ||
                          "https://github.com/shadcn.png"
                        }
                        alt="@shadcn"
                      />
                    </Avatar>
                    <div>
                      <h4 className="font-medium">{user?.fullname}</h4>
                      <p className="text-sm text-muted-foreground">
                        {user?.profile?.bio}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col my-2 text-gray-600">
                    {user && user.role === "student" && (
                      <div className="flex w-fit items-center gap-2 cursor-pointer">
                        <User2 />
                        <Button variant="link">
                          <Link to="/profile">View Profile</Link>
                        </Button>
                      </div>
                    )}
                    <div className="flex w-fit items-center gap-2 cursor-pointer">
                      <LogOut />
                      <Button onClick={logoutHandler} variant="link">
                        Logout
                      </Button>
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5 text-gray-600 dark:text-gray-300" />
            ) : (
              <Moon className="h-5 w-5 text-gray-600" />
            )}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6 text-gray-600 dark:text-gray-300" />
            ) : (
              <Menu className="h-6 w-6 text-gray-600 dark:text-gray-300" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-t dark:border-gray-800 px-4 py-4">
          <ul className="flex flex-col gap-4 text-gray-700 dark:text-gray-300 font-medium">
            {user && user.role === "recruiter" ? (
              <>
                <li className="hover:text-[#0a66c2] dark:hover:text-[#70b5f9] cursor-pointer transition-colors">
                  <Link
                    to="/admin/companies"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Companies
                  </Link>
                </li>
                <li className="hover:text-[#0a66c2] dark:hover:text-[#70b5f9] cursor-pointer transition-colors">
                  <Link
                    to="/admin/jobs"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Jobs
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="hover:text-[#0a66c2] dark:hover:text-[#70b5f9] cursor-pointer transition-colors">
                  <Link to="/" onClick={() => setMobileMenuOpen(false)}>
                    Home
                  </Link>
                </li>
                <li className="hover:text-[#0a66c2] dark:hover:text-[#70b5f9] cursor-pointer transition-colors">
                  <Link to="/jobs" onClick={() => setMobileMenuOpen(false)}>
                    Jobs
                  </Link>
                </li>
              </>
            )}
          </ul>
          <div className="mt-4 pt-4 border-t dark:border-gray-800">
            {!user ? (
              <div className="flex flex-col gap-3">
                <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                  <Button
                    variant="outline"
                    className="w-full text-[#0a66c2] dark:text-[#70b5f9] font-semibold"
                  >
                    Sign In
                  </Button>
                </Link>
                <Link to="/signup" onClick={() => setMobileMenuOpen(false)}>
                  <Button className="w-full bg-[#0a66c2] hover:bg-[#004182] dark:bg-[#70b5f9] dark:hover:bg-[#5a9ad8] text-white font-semibold">
                    Join now
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <Avatar className="cursor-pointer">
                  <AvatarImage
                    src={
                      user?.profile?.profilePhoto ||
                      "https://github.com/shadcn.png"
                    }
                    alt="@shadcn"
                  />
                </Avatar>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900 dark:text-gray-100">
                    {user?.fullname}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {user?.profile?.bio || "No bio"}
                  </p>
                </div>
              </div>
            )}
            {user && (
              <div className="flex flex-col gap-2 mt-3">
                {user.role === "student" && (
                  <Link to="/profile" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="outline" className="w-full justify-start">
                      <User2 className="mr-2 h-4 w-4" />
                      View Profile
                    </Button>
                  </Link>
                )}
                <Button
                  variant="outline"
                  className="w-full justify-start text-red-600 dark:text-red-400"
                  onClick={() => {
                    logoutHandler();
                    setMobileMenuOpen(false);
                  }}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
