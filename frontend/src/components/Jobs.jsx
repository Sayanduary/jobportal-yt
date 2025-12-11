import React, { useEffect, useState } from "react";
import Navbar from "./shared/Navbar";
import FilterCard from "./FilterCard";
import Job from "./Job";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import useGetAllJobs from "@/hooks/useGetAllJobs";

// const jobsArray = [1, 2, 3, 4, 5, 6, 7, 8];

const Jobs = () => {
  useGetAllJobs();
  const { jobs, filters } = useSelector((store) => store.job);
  const [filterJobs, setFilterJobs] = useState(jobs);

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
      <div className="max-w-7xl mx-auto mt-5 px-4">
        <div className="flex gap-5">
          <div className="w-20%">
            <FilterCard />
          </div>
          {filterJobs.length <= 0 ? (
            <span className="text-gray-900 dark:text-gray-100 text-xl">
              Job not found
            </span>
          ) : (
            <div className="flex-1 h-[88vh] overflow-y-auto pb-5">
              <div className="grid grid-cols-3 gap-4">
                {filterJobs.map((job) => (
                  <motion.div
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
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
