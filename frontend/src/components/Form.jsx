// components/Form.js
import React, { useState } from "react";

const Form = ({ onGenerate }) => {
  const [originalUrl, setOriginalUrl] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [starting, setStarting] = useState("");
  const [expiring, setExpiring] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleGenerate = () => {
    // Validate the input
    if (!originalUrl || !title || !description || !starting || !expiring) {
      setErrorMessage("All fields are required");

      // Clear error message after 2 seconds
      setTimeout(() => {
        setErrorMessage("");
      }, 2000);

      return;
    }

    // Check if the starting and expiring dates have a minimum difference of 24 hours
    const startTimestamp = new Date(starting).getTime();
    const expireTimestamp = new Date(expiring).getTime();

    if (expireTimestamp - startTimestamp < 24 * 60 * 60 * 1000) {
      setErrorMessage(
        "The difference between starting and expiring dates must be at least 24 hours"
      );
      // Clear error message after 2 seconds
      setTimeout(() => {
        setErrorMessage("");
      }, 2000);

      return;
    }

    // Clear error message
    setErrorMessage("");

    // Assuming here that you have a function passed as a prop to handle the generate action
    onGenerate({
      originalUrl,
      title,
      description,
      starting,
      expiring,
    });
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-4 bg-white rounded-md shadow-md">
      <form>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="originalUrl"
          >
            Original URL:
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="originalUrl"
            type="text"
            value={originalUrl}
            onChange={(e) => setOriginalUrl(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="title"
          >
            Title:
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="description"
          >
            Description:
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="description"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="starting"
          >
            Starting Date:
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="starting"
            type="date"
            value={starting}
            onChange={(e) => setStarting(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="expiring"
          >
            Expiring Date:
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="expiring"
            type="date"
            value={expiring}
            onChange={(e) => setExpiring(e.target.value)}
          />
        </div>
        {errorMessage && (
          <p className="text-red-500 text-sm mb-4">{errorMessage}</p>
        )}
        <div className="mb-4">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={handleGenerate}
          >
            Generate
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
