import React from "react";
import { Badge } from "./ui/badge";
import { Avatar, AvatarImage } from "./ui/avatar";
import { useNavigate } from "react-router-dom";
import { MapPin, Briefcase, DollarSign } from "lucide-react";

const LatestJobCards = ({ job }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/description/${job._id}`)}
      className="p-4 md:p-5 rounded-lg shadow-md bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 cursor-pointer hover:shadow-xl hover:border-[#0a66c2] dark:hover:border-[#70b5f9] transition-all duration-200 h-full flex flex-col"
    >
      <div className="flex items-start gap-3 mb-3">
        <Avatar className="h-12 w-12 md:h-14 md:w-14 border-2 border-gray-100 dark:border-gray-700 flex-shrink-0">
          <AvatarImage
            src={
              job?.company?.logo ||
              "https://via.placeholder.com/150?text=Company"
            }
            alt={job?.company?.name}
          />
        </Avatar>
        <div className="flex-1 min-w-0">
          <h2 className="font-semibold text-base md:text-lg text-gray-900 dark:text-gray-100 mb-1 truncate">
            {job?.company?.name}
          </h2>
          <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
            <MapPin className="h-3.5 w-3.5 flex-shrink-0" />
            <span className="truncate">{job?.location || "India"}</span>
          </div>
        </div>
      </div>

      <div className="flex-1 mb-3">
        <h3 className="font-bold text-lg md:text-xl mb-2 text-[#0a66c2] dark:text-[#70b5f9] line-clamp-2">
          {job?.title}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3">
          {job?.description}
        </p>
      </div>

      <div className="flex items-center gap-2 flex-wrap pt-3 border-t border-gray-100 dark:border-gray-700">
        <Badge className="text-xs bg-[#e8f3ff] text-[#0a66c2] dark:bg-[#0a66c2]/20 dark:text-[#70b5f9] font-semibold border-none px-2 py-1">
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
    </div>
  );
};

export default LatestJobCards;
