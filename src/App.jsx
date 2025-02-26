import React, { useState } from 'react';
import { BriefcaseIcon, Wand2Icon, LoaderIcon } from 'lucide-react';
import {CohereClientV2} from "cohere-ai";
import JobForm  from './compenents/JobForm';
import JobDescription from './compenents/JobDescription';

function App() {
  const [jobDetails, setJobDetails] = useState({
    title: '',
    industry: '',
    experience: '',
    skills: '',
    location: '',
  });
  const [generatedDescription, setGeneratedDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = async (details) => {
    setIsLoading(true);

    // Initialize Cohere AI client
    const cohere = new CohereClientV2({
      token:'p1CJ8sxqEhxbNsvfh60THxk2F3qc1YRwb1Re3q89',
    });

    try {
      // Construct the prompt for the job description
      const prompt = `Generate a professional job description for a ${details.title} role located in ${details.location}. 
The ideal candidate should have ${details.experience} of experience in the ${details.industry} industry. 
Required skills: ${details.skills}.`;

      // Call Cohere AI's chat endpoint
      const response = await cohere.chat({
        model: "command-r-plus",
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
      });

      // Set the generated description in the state
      console.log(response.message.content[0]?.text);
      setGeneratedDescription(response.message.content[0]?.text);
    } catch (error) {
      console.error("Error generating job description:", error);
      setGeneratedDescription("Failed to generate job description. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <BriefcaseIcon className="w-8 h-8 text-indigo-600" />
            <h1 className="text-4xl font-bold text-gray-900">JobCraft AI</h1>
          </div>
          <p className="text-lg text-gray-600">Create professional job descriptions in seconds</p>
        </header>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <JobForm
            jobDetails={jobDetails}
            setJobDetails={setJobDetails}
            onGenerate={() => handleGenerate(jobDetails)}
            isLoading={isLoading}
          />
          <JobDescription description={generatedDescription} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
}

export default App;
