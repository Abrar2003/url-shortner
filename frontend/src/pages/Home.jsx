import React, { useState } from "react";
import Form from "../components/Form";
import StickyButton from "../components/StickyButton";

const Home = () => {
  const [output, setOutput] = useState("");

  const handleGenerate = (formData) => {
    // Handle the logic for generating output based on the form data
    // You can use the formData to generate the output as per your requirements
    // For now, let's just set it to a string representation of the form data
    setOutput(JSON.stringify(formData, null, 2));
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Home Page</h1>
      <Form onGenerate={handleGenerate} />
      <div className="mt-8">
        <pre className="bg-gray-200 p-4 rounded">
          <h2 className="text-2xl font-bold mb-4">Output:</h2>
          {output}
        </pre>
      </div>

      {/* Integrate the StickyButton component */}
      <StickyButton onClick={scrollToTop} label="All URL's" />
    </div>
  );
};

export default Home;
