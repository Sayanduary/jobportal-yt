import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Badge } from "./ui/badge";
import { Trash2 } from "lucide-react";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import PropTypes from "prop-types";

const SavedJobsTable = ({ savedJobs, onRemove }) => {
  const handleRemoveSavedJob = async (jobId) => {
    try {
      const res = await axios.post(
        `${USER_API_END_POINT}/save-job/${jobId}`,
        {},
        {
          withCredentials: true,
        }
      );
      if (res.data.success) {
        toast.success("Job removed from saved jobs");
        onRemove(jobId);
      }
    } catch (error) {
      console.log(error);
      toast.error(
        error.response?.data?.message || "Failed to remove saved job"
      );
    }
  };

  return (
    <div>
      <Table>
        <TableCaption>A list of your saved jobs</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Date Saved</TableHead>
            <TableHead>Job Role</TableHead>
            <TableHead>Company</TableHead>
            <TableHead>Job Type</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {savedJobs && savedJobs.length > 0 ? (
            savedJobs.map((job) => (
              <TableRow key={job._id}>
                <TableCell>{job?.createdAt?.split("T")[0]}</TableCell>
                <TableCell>{job?.title}</TableCell>
                <TableCell>{job?.company?.name}</TableCell>
                <TableCell>
                  <Badge variant="outline">{job?.jobType}</Badge>
                </TableCell>
                <TableCell className="text-right">
                  <button
                    onClick={() => handleRemoveSavedJob(job._id)}
                    className="text-red-600 hover:text-red-800 transition"
                    title="Remove from saved jobs"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan="5" className="text-center py-4">
                You have not saved any jobs yet.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default SavedJobsTable;

SavedJobsTable.propTypes = {
  savedJobs: PropTypes.array,
  onRemove: PropTypes.func.isRequired,
};
