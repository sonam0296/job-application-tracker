import { useEffect, useState } from "react";
import { createJob, deleteJob, getJobs } from "../../service/api";
import { useNavigate } from "react-router-dom";

interface JobsProps {
  id: number;
  title: string;
  company: string;
  status: "applied" | "interview" | "offer" | "rejected";
  notes: string;
}

export const Jobs = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState<JobsProps[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [newJob, setNewJob] = useState({
    title: "",
    company: "",
    status: "applied",
    notes: "",
  });

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const resp = await getJobs();
      setJobs(resp.data);
    } catch (error: any) {
      console.error("Failed to fetch jobs->", error);
      if (error.status === 403) {
        navigate("/auth");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleAddJob = async () => {
    if (!newJob.title || !newJob.company)
      return alert("Title and Company required");
    try {
      await createJob(newJob);
      setNewJob({ title: "", company: "", status: "applied", notes: "" });
      fetchJobs();
    } catch (err) {
      console.error("Failed to add job", err);
    }
  };

  const handleDeleteJob = async (id: number) => {
    try {
      await deleteJob(id);
      setJobs((prev) => prev.filter((j) => j.id !== id));
    } catch (err) {
      console.error("Failed to delete job", err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white p-8">
      <h1 className="text-3xl font-bold mb-6">My Jobs</h1>

      {/* Add Job Form */}
      <div className="mb-6 p-4 bg-slate-800 rounded-xl">
        <h2 className="text-xl font-semibold mb-4">Add a Job</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Job Title"
            value={newJob.title}
            onChange={(e) => setNewJob({ ...newJob, title: e.target.value })}
            className="p-2 rounded bg-slate-700 text-white"
          />
          <input
            type="text"
            placeholder="Company"
            value={newJob.company}
            onChange={(e) => setNewJob({ ...newJob, company: e.target.value })}
            className="p-2 rounded bg-slate-700 text-white"
          />
          <select
            value={newJob.status}
            onChange={(e) => setNewJob({ ...newJob, status: e.target.value })}
            className="p-2 rounded bg-slate-700 text-white"
          >
            <option value="applied">Applied</option>
            <option value="interview">Interview</option>
            <option value="offer">Offer</option>
            <option value="rejected">Rejected</option>
          </select>
          <input
            type="text"
            placeholder="Notes"
            value={newJob.notes}
            onChange={(e) => setNewJob({ ...newJob, notes: e.target.value })}
            className="p-2 rounded bg-slate-700 text-white"
          />
        </div>
        <button
          onClick={handleAddJob}
          className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded"
        >
          Add Job
        </button>
      </div>

      {/* Jobs List */}
      {loading ? (
        <p>Loading jobs...</p>
      ) : jobs.length === 0 ? (
        <p>No jobs found.</p>
      ) : (
        <ul className="space-y-4">
          {jobs.map((job) => (
            <li
              key={job.id}
              className="p-4 bg-slate-800 rounded-xl flex justify-between items-center"
            >
              <div>
                <h3 className="font-bold text-lg">{job.title}</h3>
                <p className="text-slate-400">{job.company}</p>
                <p className="text-sm text-slate-500">Status: {job.status}</p>
                {job.notes && <p className="text-sm italic">{job.notes}</p>}
              </div>
              <button
                onClick={() => handleDeleteJob(job.id)}
                className="px-3 py-1 bg-red-600 hover:bg-red-700 rounded"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
