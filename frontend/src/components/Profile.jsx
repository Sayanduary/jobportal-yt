import React, { useState, useEffect } from "react";
import Navbar from "./shared/Navbar";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Bell, Contact, Mail, Pen } from "lucide-react";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import AppliedJobTable from "./AppliedJobTable";
import SavedJobsTable from "./SavedJobsTable";
import UpdateProfileDialog from "./UpdateProfileDialog";
import { useSelector } from "react-redux";
import useGetAppliedJobs from "@/hooks/useGetAppliedJobs";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";

// const skills = ["Html", "Css", "Javascript", "Reactjs"]
const isResume = true;

const Profile = () => {
  useGetAppliedJobs();
  const [open, setOpen] = useState(false);
  const [savedJobs, setSavedJobs] = useState([]);
  const { user } = useSelector((store) => store.auth);

  useEffect(() => {
    const fetchSavedJobs = async () => {
      try {
        const res = await axios.get(`${USER_API_END_POINT}/saved-jobs`, {
          withCredentials: true,
        });
        if (res.data.success) {
          setSavedJobs(res.data.savedJobs || []);
        }
      } catch (error) {
        console.log(error);
        toast.error("Failed to fetch saved jobs");
      }
    };
    if (user && user.role === "student") {
      fetchSavedJobs();
    }
  }, [user]);

  const handleRemoveSavedJob = (jobId) => {
    setSavedJobs(savedJobs.filter((job) => job._id !== jobId));
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Navbar />
      <div className="max-w-5xl mx-auto px-4 py-6">
        {/* Profile Card */}
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-md my-4 md:my-5 p-4 md:p-8">
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
              <Avatar className="h-20 w-20 md:h-24 md:w-24 border-4 border-gray-100 dark:border-gray-800">
                <AvatarImage
                  src={
                    user?.profile?.profilePhoto ||
                    "https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg"
                  }
                  alt="profile"
                />
              </Avatar>
              <div className="text-center sm:text-left">
                <h1 className="font-bold text-xl md:text-2xl text-gray-900 dark:text-gray-100">
                  {user?.fullname}
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                  {user?.profile?.bio || "No bio added"}
                </p>
              </div>
            </div>
            <Button
              onClick={() => setOpen(true)}
              className="self-end sm:self-start bg-[#0a66c2] hover:bg-[#004182] dark:bg-[#70b5f9] dark:hover:bg-[#5a9ad8]"
              size="icon"
            >
              <Pen className="h-4 w-4" />
            </Button>
          </div>

          {/* Contact Info */}
          <div className="my-6 space-y-3">
            <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
              <Mail className="h-5 w-5 text-[#0a66c2] dark:text-[#70b5f9]" />
              <span className="text-sm md:text-base break-all">
                {user?.email}
              </span>
            </div>
            <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
              <Contact className="h-5 w-5 text-[#0a66c2] dark:text-[#70b5f9]" />
              <span className="text-sm md:text-base">{user?.phoneNumber}</span>
            </div>
          </div>

          {/* Skills */}
          <div className="my-6">
            <h2 className="font-semibold text-lg mb-3 text-gray-900 dark:text-gray-100">
              Skills
            </h2>
            <div className="flex flex-wrap gap-2">
              {user?.profile?.skills.length !== 0 ? (
                user?.profile?.skills.map((item, index) => (
                  <Badge
                    key={index}
                    className="bg-[#e8f3ff] text-[#0a66c2] dark:bg-[#0a66c2]/20 dark:text-[#70b5f9] border-none px-3 py-1"
                  >
                    {item}
                  </Badge>
                ))
              ) : (
                <span className="text-gray-500 dark:text-gray-400 text-sm">
                  No skills added
                </span>
              )}
            </div>
          </div>

          {/* Resume */}
          <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-800">
            <Label className="text-base md:text-lg font-semibold text-gray-900 dark:text-gray-100 block mb-2">
              Resume
            </Label>
            {isResume && user?.profile?.resume ? (
              <a
                target="_blank"
                href={`${USER_API_END_POINT}/download-resume/${user?._id}`}
                rel="noopener noreferrer"
                className="text-[#0a66c2] dark:text-[#70b5f9] hover:underline cursor-pointer text-sm md:text-base inline-flex items-center gap-2"
              >
                📄 {user?.profile?.resumeOriginalName}
              </a>
            ) : (
              <span className="text-gray-500 dark:text-gray-400 text-sm">
                No resume uploaded
              </span>
            )}
          </div>
        </div>

        {/* Notifications Section - Only for students */}
        {user?.role === "student" &&
          user?.notifications &&
          user.notifications.length > 0 && (
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-md my-4 md:my-5 p-4 md:p-8">
              <div className="flex items-center gap-2 mb-4">
                <Bell className="h-5 w-5 text-[#0a66c2] dark:text-[#70b5f9]" />
                <h2 className="font-bold text-lg md:text-xl text-gray-900 dark:text-gray-100">
                  Notifications
                </h2>
              </div>
              <div className="space-y-3">
                {user.notifications
                  .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                  .slice(0, 10)
                  .map((notification, index) => (
                    <div
                      key={index}
                      className={`p-3 md:p-4 rounded-lg border ${
                        notification.read
                          ? "bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                          : "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800"
                      }`}
                    >
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        {notification.message}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {new Date(notification.createdAt).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          }
                        )}
                      </p>
                    </div>
                  ))}
              </div>
            </div>
          )}

        {/* Applied Jobs Section */}
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-md my-4 md:my-5 p-4 md:p-8">
          <h2 className="font-bold text-lg md:text-xl mb-5 text-gray-900 dark:text-gray-100">
            Applied Jobs
          </h2>
          <div className="overflow-x-auto">
            <AppliedJobTable />
          </div>
        </div>

        {/* Saved Jobs Section */}
        {user?.role === "student" && (
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-md my-4 md:my-5 p-4 md:p-8">
            <h2 className="font-bold text-lg md:text-xl mb-5 text-gray-900 dark:text-gray-100">
              Saved Jobs
            </h2>
            <div className="overflow-x-auto">
              <SavedJobsTable
                savedJobs={savedJobs}
                onRemove={handleRemoveSavedJob}
              />
            </div>
          </div>
        )}

        <UpdateProfileDialog open={open} setOpen={setOpen} />
      </div>
    </div>
  );
};

export default Profile;
