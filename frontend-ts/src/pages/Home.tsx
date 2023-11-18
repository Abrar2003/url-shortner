import React, { useState} from "react";
import Form from "../components/Form";
import axios from "axios";
import StickyButton from "../components/StickyButton";
import { Link } from "react-router-dom";

interface FormData {
  originalUrl: string;
  title: string;
  description: string;
  expiring: string;
}

const Home: React.FC = () => {
  const [output, setOutput] = useState<string>("");

  const handleGenerate = async (formData: FormData) => {
    try {
      const { originalUrl, title, description, expiring } = formData;
      const res = await axios.post("http://localhost:8000/short", {
        original_url: originalUrl,
        title,
        description,
        expiration_date: expiring,
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
      {/* Adjusted types for onGenerate */}
      <Form onGenerate={(formData: FormData) => handleGenerate(formData)} />
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
