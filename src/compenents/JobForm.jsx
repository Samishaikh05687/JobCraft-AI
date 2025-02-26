import React, { useCallback } from "react";
import { Wand2Icon, LoaderIcon } from "lucide-react";

const JobForm =({ jobDetails, setJobDetails, onGenerate, isLoading })=> {
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setJobDetails((prev) => ({ ...prev, [name]: value }));
  }, [setJobDetails]);

  const isFormValid = Object.values(jobDetails).every((value) => value.trim() !== "");

  return (
    <div className="bg-white h-screen rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Job Details</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onGenerate();
        }}
        className="space-y-4"
      >
        {[
          { id: "title", label: "Job Title", placeholder: "e.g. Senior Software Engineer" },
          { id: "industry", label: "Industry", placeholder: "e.g. Technology" },
          { id: "experience", label: "Required Experience", placeholder: "e.g. 5+ years" },
          { id: "location", label: "Location", placeholder: "e.g. New York, NY" }
        ].map(({ id, label, placeholder }) => (
          <div key={id}>
            <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
              {label}
            </label>
            <input
              type="text"
              id={id}
              name={id}
              value={jobDetails[id]}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder={placeholder}
            />
          </div>
        ))}

        <div>
          <label htmlFor="skills" className="block text-sm font-medium text-gray-700 mb-1">
            Required Skills
          </label>
          <textarea
            id="skills"
            name="skills"
            value={jobDetails.skills}
            onChange={handleChange}
            rows="3"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            placeholder="e.g. React, Node.js, TypeScript"
          />
        </div>

        <button
          type="submit"
          disabled={!isFormValid || isLoading}
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <LoaderIcon className="w-5 h-5 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Wand2Icon className="w-5 h-5" />
              Generate Description
            </>
          )}
        </button>
      </form>
    </div>
  );
}

export default JobForm;