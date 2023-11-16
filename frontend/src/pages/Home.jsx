import React, { useState } from "react";
import Form from "../components/Form";
import axios from "axios";
import StickyButton from "../components/StickyButton";
import { Link } from "react-router-dom";

const Home = () => {
  const [output, setOutput] = useState("");

  const handleGenerate = async (formData) => {
    // Handle the logic for generating output based on the form data
    // You can use the formData to generate the output as per your requirements
    // For now, let's just set it to a string representation of the form data
    try {
      const { originalUrl, title, description, starting, expiring } = formData;
      const res = await axios.post("http://localhost:8000/url/short", {
        original_url: originalUrl,
        starting_date: starting,
        expiration_date: expiring,
        title,
        description,
      });
      setOutput(res.data.short_url);
    } catch (error) {
      console.log(error);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Home Page</h1>
      <Form onGenerate={handleGenerate} />
      <div className="mx-auto mt-8 p-4 bg-white rounded-lg shadow-lg">
        <pre className="bg-gray-200 p-4 rounded overflow-x-auto">
          <h2 className="text-2xl font-bold mb-4">Output:</h2>
          {output}
        </pre>
      </div>
      {/* Integrate the StickyButton component */}
      <Link to={"/all-urls"}>
        <StickyButton onClick={scrollToTop} label="All URL's" />
      </Link>
    </div>
  );
};

export default Home;
