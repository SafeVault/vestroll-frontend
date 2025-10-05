"use client";

import React, { useState } from "react";
import Stepper from "./ui/stepper";
import { ProjectDetails } from "./contracts/project-details";
import { ContractType } from "./contracts/contract-type";
import { EmployeeDetails } from "./contracts/employee-details";
import ContractDetails from "./contracts/contract-details";
import Compliance from "./contracts/compliance";

const steps = [
  { id: 1, title: "Choose Contract type", content: <ContractType /> },
  { id: 2, title: "Project Details", content: <ProjectDetails /> },
  { id: 3, title: "Employee Details", content: <EmployeeDetails /> },
  { id: 4, title: "Contract Details", content: <ContractDetails /> },
  { id: 5, title: "Compliance", content: <Compliance /> },
  { id: 6, title: "Review & Sign", content: <EmployeeDetails /> },
];

function Contracts() {
  const [activeStep, setActiveStep] = useState(0);
  const onSubmit = (data) => console.log(data);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="min-h-[50vh] rounded-xl border border-[#e5e7eb] bg-white p-6 shadow-sm"
    >
      <div className="space-y-5">
        <div className="space-y-2">
          <h2 className="font-semibold text-xl text-gray-900">
            {steps[activeStep].title}
          </h2>
          <Stepper
            steps={steps}
            activeStep={activeStep}
            setActiveStep={setActiveStep}
          />
        </div>
        <StepContent steps={steps} activeStep={activeStep} />
        <StepControls
          steps={steps}
          activeStep={activeStep}
          handleBack={handleBack}
          handleNext={handleNext}
        />
      </div>
    </form>
  );
}

function StepContent({ steps, activeStep }) {
  if (!steps[activeStep]) return;
  return <div className="py-10">{steps[activeStep].content}</div>;
}

function StepControls({ steps, activeStep, handleBack, handleNext }) {
  return (
    <div className="flex items-center">
      <button
        disabled={activeStep === 0}
        onClick={handleBack}
        className="flex-1 text-purple-700 hover:text-white border border-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-purple-400 dark:text-purple-400 dark:hover:text-white dark:hover:bg-purple-500 dark:focus:ring-purple-900"
      >
        Back
      </button>
      <button
        onClick={handleNext}
        className="flex-1 focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
      >
        {activeStep === steps.length - 1 ? "Finish" : "Next"}
      </button>
    </div>
  );
}

export default Contracts;
