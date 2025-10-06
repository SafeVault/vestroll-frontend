"use client";

import React, { useState } from "react";

function Stepper({ steps = [], activeStep, setActiveStep }) {
  const handleReset = () => {
    setActiveStep(0);
  };
  return (
    <div className="w-full">
      <div className="flex gap-2">
        {steps.map((label, index) => {
          return (
            <div
              key={index}
              aria-label={`step of ${label}`}
              className={`w-16 sm:w-21 h-1 transition ease-in-out duration-300 ${index <= activeStep! ? " bg-primary-500" : "bg-border-primary"} rounded-lg `}
            ></div>
          );
          //   <h3 {...labelProps}>{label}</h3>;
        })}
      </div>
    </div>
  );
}

export default Stepper;
