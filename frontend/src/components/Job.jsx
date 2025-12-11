import React from "react";
import { Button } from "./ui/button";
import { Bookmark, MapPin, Briefcase, DollarSign, Clock } from "lucide-react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";

const Job = ({ job }) => {
  const navigate = useNavigate();

  const daysAgoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;
    return Math.floor(timeDifference / (1000 * 24 * 60 * 60));
  };

  const daysAgo = daysAgoFunction(job?.createdAt);

  return (
    <div className="p-4 md:p-5 rounded-lg shadow-md bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:shadow-xl hover:border-[#0a66c2] dark:hover:border-[#70b5f9] transition-all duration-200 h-full flex flex-col">
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
          <Clock className="h-3.5 w-3.5" />
          <span>
            {daysAgo === 0
              ? "Today"
              : daysAgo === 1
              ? "Yesterday"
              : `${daysAgo} days ago`}
          </span>
        </div>
        <Button
          variant="ghost"
          className="rounded-full h-8 w-8 p-0 hover:bg-blue-50 dark:hover:bg-gray-800"
          size="icon"
        >
          <Bookmark className="h-4 w-4 text-gray-600 dark:text-gray-400" />
        </Button>
      </div>

      {/* Company Info */}
      <div className="flex items-center gap-3 mb-3">
        <Avatar className="h-12 w-12 border-2 border-gray-100 dark:border-gray-800">
          <AvatarImage
            src={
              job?.company?.logo ||
              "https://via.placeholder.com/150?text=Company"
            }
            alt={job?.company?.name}
          />
        </Avatar>
        <div className="flex-1 min-w-0">
          <h2 className="font-semibold text-base text-gray-900 dark:text-gray-100 truncate">
            {job?.company?.name}
          </h2>
          <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
            <MapPin className="h-3.5 w-3.5" />
            <span className="truncate">{job?.location || "India"}</span>
          </div>
        </div>
      </div>

      {/* Job Title & Description */}
      <div className="flex-1 mb-4">
        <h3 className="font-bold text-lg mb-2 text-[#0a66c2] dark:text-[#70b5f9] line-clamp-2">
          {job?.title}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
          {job?.description}
        </p>
      </div>

      {/* Badges */}
      <div className="flex items-center gap-2 flex-wrap mb-4">
        <Badge className="text-xs bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400 font-semibold border-none px-2 py-1">
          <Briefcase className="h-3 w-3 mr-1" />
          {job?.position} Positions
        </Badge>
        <Badge className="text-xs bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400 font-semibold border-none px-2 py-1">
          {job?.jobType}
        </Badge>
        <Badge className="text-xs bg-purple-50 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400 font-semibold border-none px-2 py-1">
          <DollarSign className="h-3 w-3 mr-1" />
          {job?.salary} LPA
        </Badge>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-2 pt-3 border-t border-gray-100 dark:border-gray-800">
        <Button
          onClick={() => navigate(`/description/${job?._id}`)}
          variant="outline"
          className="flex-1 text-sm border-[#0a66c2] text-[#0a66c2] hover:bg-[#e8f3ff] dark:border-[#70b5f9] dark:text-[#70b5f9] dark:hover:bg-gray-800"
        >
          View Details
        </Button>
        <Button className="flex-1 text-sm bg-[#0a66c2] hover:bg-[#004182] dark:bg-[#70b5f9] dark:hover:bg-[#5a9ad8] text-white">
          Apply Now
        </Button>
      </div>
    </div>
  );
};

export default Job;
