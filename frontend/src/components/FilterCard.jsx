import React, { useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { useDispatch } from "react-redux";
import { setFilters, clearFilters } from "@/redux/jobSlice";
import { Search, ChevronDown } from "lucide-react";

const filterData = [
  {
    filterType: "Location",
    array: [
      "Delhi NCR",
      "Bangalore",
      "Hyderabad",
      "Pune",
      "Mumbai",
      "Chennai",
      "Kolkata",
      "Ahmedabad",
    ],
  },
  {
    filterType: "Industry",
    array: [
      "IT",
      "Finance",
      "Healthcare",
      "E-commerce",
      "Manufacturing",
      "Retail",
      "Education",
    ],
  },
  {
    filterType: "Job Type",
    array: ["Full-time", "Part-time", "Contract", "Temporary", "Freelance"],
  },
  {
    filterType: "Experience Level",
    array: ["Fresher", "1-2 Years", "2-5 Years", "5-10 Years", "10+ Years"],
  },
  {
    filterType: "Salary Range",
    array: ["0-40k", "40k-1lakh", "1lakh-5lakh", "5lakh-10lakh", "10lakh+"],
  },
];

const skillsData = [
  "Python",
  "JavaScript",
  "Java",
  "SQL",
  "AWS",
  "React",
  "Node.js",
  "Docker",
  "Kubernetes",
  "Excel",
  "Git",
  "Azure",
  "Data Analysis",
  "Power BI",
  "C++",
  "C#",
  ".NET",
  "Spring",
  "Django",
  "Flask",
];

const FilterCard = () => {
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState("");
  const [selectedJobType, setSelectedJobType] = useState("");
  const [selectedExperience, setSelectedExperience] = useState("");
  const [selectedSalary, setSelectedSalary] = useState("");
  const [searchText, setSearchText] = useState("");
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [expandedSections, setExpandedSections] = useState({
    skills: true,
    location: true,
    industry: false,
    jobtype: false,
    experiencelevel: false,
    salaryrange: false,
  });
  const dispatch = useDispatch();

  const changeHandler = (filterType, value) => {
    switch (filterType) {
      case "Location":
        setSelectedLocation(value);
        break;
      case "Industry":
        setSelectedIndustry(value);
        break;
      case "Job Type":
        setSelectedJobType(value);
        break;
      case "Experience Level":
        setSelectedExperience(value);
        break;
      case "Salary Range":
        setSelectedSalary(value);
        break;
      default:
        break;
    }
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchText(value);
  };

  const handleSkillToggle = (skill) => {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleClearFilters = () => {
    setSelectedLocation("");
    setSelectedIndustry("");
    setSelectedJobType("");
    setSelectedExperience("");
    setSelectedSalary("");
    setSearchText("");
    setSelectedSkills([]);
    dispatch(clearFilters());
    setExpandedSections({
      skills: true,
      location: true,
      industry: false,
      jobtype: false,
      experiencelevel: false,
      salaryrange: false,
    });
  };

  useEffect(() => {
    // Dispatch all filters to Redux
    dispatch(
      setFilters({
        location: selectedLocation,
        industry: selectedIndustry,
        jobType: selectedJobType,
        experience: selectedExperience,
        salary: selectedSalary,
        skills: selectedSkills,
        searchText: searchText,
      })
    );
  }, [
    selectedLocation,
    selectedIndustry,
    selectedJobType,
    selectedExperience,
    selectedSalary,
    selectedSkills,
    searchText,
    dispatch,
  ]);

  return (
    <div className="w-full bg-white dark:bg-gray-900 p-3 rounded-md border border-gray-100 dark:border-gray-800 shadow-md max-h-[85vh] overflow-y-auto">
      <div className="flex justify-between items-center mb-3">
        <h1 className="font-bold text-lg text-gray-900 dark:text-gray-100">
          Filter Jobs
        </h1>
        {(selectedLocation ||
          selectedIndustry ||
          selectedJobType ||
          selectedExperience ||
          selectedSalary ||
          searchText ||
          selectedSkills.length > 0) && (
          <button
            onClick={handleClearFilters}
            className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
          >
            Clear All
          </button>
        )}
      </div>
      <hr className="mb-3 border-gray-200 dark:border-gray-700" />

      {/* Search Box */}
      <div className="mb-4">
        <Label className="text-gray-700 dark:text-gray-300 font-semibold mb-2 block text-sm">
          Search by Company or Role
        </Label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 h-4 w-4" />
          <Input
            type="text"
            placeholder="e.g., Google, Developer..."
            value={searchText}
            onChange={handleSearchChange}
            className="pl-10 text-sm bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100"
          />
        </div>
      </div>

      <hr className="my-3 border-gray-200 dark:border-gray-700" />

      {/* Skills Filter */}
      <div className="mb-4">
        <button
          onClick={() => toggleSection("skills")}
          className="flex items-center justify-between w-full font-bold text-gray-900 dark:text-gray-100 text-sm mb-2 hover:text-blue-600 dark:hover:text-blue-400"
        >
          <span>Skills</span>
          <ChevronDown
            size={16}
            className={`transform transition ${
              expandedSections.skills ? "rotate-180" : ""
            }`}
          />
        </button>
        {expandedSections.skills && (
          <div className="space-y-2 mb-3">
            {skillsData.slice(0, 8).map((skill) => (
              <div key={skill} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id={`skill-${skill}`}
                  checked={selectedSkills.includes(skill)}
                  onChange={() => handleSkillToggle(skill)}
                  className="w-4 h-4 accent-blue-600 dark:accent-blue-400 cursor-pointer"
                />
                <Label
                  htmlFor={`skill-${skill}`}
                  className="text-gray-700 dark:text-gray-300 text-sm cursor-pointer"
                >
                  {skill}
                </Label>
              </div>
            ))}
            <details className="text-gray-600 dark:text-gray-400 cursor-pointer">
              <summary className="text-xs hover:text-blue-600 dark:hover:text-blue-400">
                View More Skills
              </summary>
              <div className="space-y-2 mt-2">
                {skillsData.slice(8).map((skill) => (
                  <div key={skill} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id={`skill-${skill}`}
                      checked={selectedSkills.includes(skill)}
                      onChange={() => handleSkillToggle(skill)}
                      className="w-4 h-4 accent-blue-600 dark:accent-blue-400 cursor-pointer"
                    />
                    <Label
                      htmlFor={`skill-${skill}`}
                      className="text-gray-700 dark:text-gray-300 text-sm cursor-pointer"
                    >
                      {skill}
                    </Label>
                  </div>
                ))}
              </div>
            </details>
          </div>
        )}
        <hr className="my-3 border-gray-200 dark:border-gray-700" />
      </div>

      {/* Other Radio Filters */}
      {filterData.map((data, index) => {
        const sectionKey = data.filterType.toLowerCase().replace(" ", "");

        // Determine which state value to use based on filter type
        let currentValue = "";
        switch (data.filterType) {
          case "Location":
            currentValue = selectedLocation;
            break;
          case "Industry":
            currentValue = selectedIndustry;
            break;
          case "Job Type":
            currentValue = selectedJobType;
            break;
          case "Experience Level":
            currentValue = selectedExperience;
            break;
          case "Salary Range":
            currentValue = selectedSalary;
            break;
          default:
            currentValue = "";
        }

        return (
          <div key={index} className="mb-4">
            <button
              onClick={() => toggleSection(sectionKey)}
              className="flex items-center justify-between w-full font-bold text-gray-900 dark:text-gray-100 text-sm mb-2 hover:text-blue-600 dark:hover:text-blue-400"
            >
              <span>{data.filterType}</span>
              <ChevronDown
                size={16}
                className={`transform transition ${
                  expandedSections[sectionKey] ? "rotate-180" : ""
                }`}
              />
            </button>
            {expandedSections[sectionKey] && (
              <RadioGroup
                value={currentValue}
                onValueChange={(value) => changeHandler(data.filterType, value)}
              >
                <div className="space-y-2 mb-2">
                  {data.array.map((item, idx) => {
                    const itemId = `id${index}-${idx}`;
                    return (
                      <div key={itemId} className="flex items-center space-x-2">
                        <RadioGroupItem
                          value={item}
                          id={itemId}
                          className="dark:border-gray-600"
                        />
                        <Label
                          htmlFor={itemId}
                          className="text-gray-700 dark:text-gray-300 text-sm cursor-pointer"
                        >
                          {item}
                        </Label>
                      </div>
                    );
                  })}
                </div>
              </RadioGroup>
            )}
            <hr className="my-3 border-gray-200 dark:border-gray-700" />
          </div>
        );
      })}
    </div>
  );
};

export default FilterCard;
