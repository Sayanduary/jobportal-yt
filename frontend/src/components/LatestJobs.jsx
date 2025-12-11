import React from "react";
import LatestJobCards from "./LatestJobCards";
import { useSelector } from "react-redux";

// const randomJobs = [1, 2, 3, 4, 5, 6, 7, 8];

const LatestJobs = () => {
  const { jobs } = useSelector((store) => store.job);

  return (
    <div className="max-w-7xl mx-auto my-12 md:my-20 px-4 md:px-6 bg-gray-50 dark:bg-gray-950 py-8 md:py-12">
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2">
        <span className="text-[#0a66c2] dark:text-[#70b5f9]">
          Latest & Top{" "}
        </span>
        Job Openings
      </h1>
      <p className="text-gray-600 dark:text-gray-400 mb-6 md:mb-8">
        Explore the newest opportunities from top companies
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {jobs.length <= 0 ? (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              No jobs available at the moment
            </p>
            <p className="text-gray-500 dark:text-gray-500 text-sm mt-2">
              Check back later for new opportunities
            </p>
          </div>
        ) : (
          jobs
            ?.slice(0, 6)
            .map((job) => <LatestJobCards key={job._id} job={job} />)
        )}
      </div>
    </div>
  );
};

export default LatestJobs;
