import React, { useEffect, useState } from "react";
import Navbar from "./shared/Navbar";
import FilterCard from "./FilterCard";
import Job from "./Job";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import useGetAllJobs from "@/hooks/useGetAllJobs";
import { Filter, X } from "lucide-react";
import { Button } from "./ui/button";

const Jobs = () => {
  useGetAllJobs();
  const { jobs, filters } = useSelector((store) => store.job);
  const [filterJobs, setFilterJobs] = useState(jobs);
  const [showMobileFilter, setShowMobileFilter] = useState(false);

  useEffect(() => {
    let filteredJobs = [...jobs];

    // Apply search text filter
    if (filters.searchText) {
      const searchLower = filters.searchText.toLowerCase();
      filteredJobs = filteredJobs.filter((job) => {
        return (
          job.title?.toLowerCase().includes(searchLower) ||
          job.description?.toLowerCase().includes(searchLower) ||
          job.location?.toLowerCase().includes(searchLower) ||
          job.company?.name?.toLowerCase().includes(searchLower)
        );
      });
    }

    // Apply location filter
    if (filters.location) {
      filteredJobs = filteredJobs.filter((job) =>
        job.location?.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    // Apply industry filter (match against job title or company)
    if (filters.industry) {
      const industryLower = filters.industry.toLowerCase();
      filteredJobs = filteredJobs.filter(
        (job) =>
          job.title?.toLowerCase().includes(industryLower) ||
          job.description?.toLowerCase().includes(industryLower)
      );
    }

    // Apply job type filter
    if (filters.jobType) {
      filteredJobs = filteredJobs.filter(
        (job) => job.jobType?.toLowerCase() === filters.jobType.toLowerCase()
      );
    }

    // Apply experience filter
    if (filters.experience) {
      filteredJobs = filteredJobs.filter((job) => {
        const jobExp = job.experience || 0;
        switch (filters.experience) {
          case "Fresher":
            return jobExp === 0;
          case "1-2 Years":
            return jobExp >= 1 && jobExp <= 2;
          case "2-5 Years":
            return jobExp >= 2 && jobExp <= 5;
          case "5-10 Years":
            return jobExp >= 5 && jobExp <= 10;
          case "10+ Years":
            return jobExp >= 10;
          default:
            return true;
        }
      });
    }

    // Apply salary filter
    if (filters.salary) {
      filteredJobs = filteredJobs.filter((job) => {
        const salary = job.salary || 0;
        switch (filters.salary) {
          case "0-40k":
            return salary >= 0 && salary <= 40000;
          case "40k-1lakh":
            return salary > 40000 && salary <= 100000;
          case "1lakh-5lakh":
            return salary > 100000 && salary <= 500000;
          case "5lakh-10lakh":
            return salary > 500000 && salary <= 1000000;
          case "10lakh+":
            return salary > 1000000;
          default:
            return true;
        }
      });
    }

    // Apply skills filter (check if job requirements match any selected skills)
    if (filters.skills && filters.skills.length > 0) {
      filteredJobs = filteredJobs.filter((job) => {
        const requirements = Array.isArray(job.requirements)
          ? job.requirements.join(" ").toLowerCase()
          : job.requirements?.toLowerCase() || "";
        const title = job.title?.toLowerCase() || "";
        const description = job.description?.toLowerCase() || "";

        return filters.skills.some(
          (skill) =>
            requirements.includes(skill.toLowerCase()) ||
            title.includes(skill.toLowerCase()) ||
            description.includes(skill.toLowerCase())
        );
      });
    }

    setFilterJobs(filteredJobs);
  }, [jobs, filters]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Navbar />
      <div className="max-w-7xl mx-auto mt-3 md:mt-5 px-3 md:px-4 lg:px-6">
        {/* Mobile Filter Button */}
        <div className="lg:hidden mb-4">
          <Button
            onClick={() => setShowMobileFilter(!showMobileFilter)}
            className="w-full bg-[#0a66c2] hover:bg-[#004182] dark:bg-[#70b5f9] dark:hover:bg-[#5a9ad8] flex items-center justify-center gap-2"
          >
            <Filter className="h-4 w-4" />
            {showMobileFilter ? "Hide Filters" : "Show Filters"}
          </Button>
        </div>

        <div className="flex gap-4 lg:gap-5">
          {/* Desktop Filter - Always visible on large screens */}
          <div className="hidden lg:block w-64 xl:w-72 flex-shrink-0">
            <FilterCard />
          </div>

          {/* Mobile Filter - Shown as overlay */}
          {showMobileFilter && (
            <div
              className="lg:hidden fixed inset-0 bg-black/50 z-40"
              onClick={() => setShowMobileFilter(false)}
            >
              <div
                className="absolute left-0 top-0 bottom-0 w-80 max-w-[85vw] bg-white dark:bg-gray-900 overflow-y-auto shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="sticky top-0 bg-white dark:bg-gray-900 p-4 border-b dark:border-gray-800 flex justify-between items-center z-10">
                  <h2 className="font-bold text-lg text-gray-900 dark:text-gray-100">
                    Filters
                  </h2>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowMobileFilter(false)}
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>
                <FilterCard onFilterApply={() => setShowMobileFilter(false)} />
              </div>
            </div>
          )}

          {/* Jobs Grid */}
          {filterJobs.length <= 0 ? (
            <div className="flex-1 flex items-center justify-center py-20">
              <div className="text-center">
                <h3 className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  No Jobs Found
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Try adjusting your filters to see more results
                </p>
              </div>
            </div>
          ) : (
            <div className="flex-1 h-auto lg:h-[88vh] lg:overflow-y-auto pb-5">
              <div className="mb-4">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Showing{" "}
                  <span className="font-semibold text-gray-900 dark:text-gray-100">
                    {filterJobs.length}
                  </span>{" "}
                  jobs
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-3 md:gap-4">
                {filterJobs.map((job) => (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    key={job?._id}
                  >
                    <Job job={job} />
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Jobs;
