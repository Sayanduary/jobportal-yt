import React, { useState } from "react";
import { Button } from "./ui/button";
import { Search } from "lucide-react";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = () => {
    dispatch(setSearchedQuery(query));
    navigate("/jobs");
  };

  return (
    <div className="text-center py-8 md:py-12 lg:py-16 bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-950 px-4">
      <div className="flex flex-col gap-4 md:gap-5 my-6 md:my-10 max-w-4xl mx-auto">
        <span className="mx-auto px-3 md:px-4 py-1.5 md:py-2 text-xs md:text-sm rounded-full bg-[#e8f3ff] dark:bg-[#0a66c2]/20 text-[#0a66c2] dark:text-[#70b5f9] font-medium shadow-sm">
          🏆 No. 1 Job Hunt Website
        </span>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-gray-100 leading-tight px-4">
          Search, Apply & <br className="hidden sm:block" /> Get Your{" "}
          <span className="text-[#0a66c2] dark:text-[#70b5f9]">Dream Jobs</span>
        </h1>
        <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 px-4">
          Join millions of professionals finding their perfect career
          opportunity
        </p>
        <div className="flex w-full max-w-2xl shadow-lg border border-gray-200 dark:border-gray-700 rounded-full items-center gap-2 md:gap-4 mx-auto bg-white dark:bg-gray-800 overflow-hidden">
          <input
            type="text"
            placeholder="Search jobs..."
            onChange={(e) => setQuery(e.target.value)}
            className="outline-none border-none w-full px-4 md:px-6 py-2.5 md:py-3 bg-transparent text-sm md:text-base text-gray-900 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400"
          />
          <Button
            onClick={searchJobHandler}
            className="rounded-full bg-[#0a66c2] hover:bg-[#004182] dark:bg-[#70b5f9] dark:hover:bg-[#5a9ad8] mr-1 px-4 md:px-8 h-9 md:h-10"
          >
            <Search className="h-4 w-4 md:h-5 md:w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
