import React from "react";

const VisitorInfo = () => {
  const data = {
    _id: "6555d73c46c74e2b331ed8a9",
    original_url: "https://youtu.be/t8E0pEc-FFY?si=3K2qnFIlzZvH-1DT",
    short_id: "V_N4QzmV-",
    expiration_date: "2023-11-25T00:00:00.000+00:00",
    starting_date: "2023-11-18T00:00:00.000+00:00",
    title: "YouTube",
    description: "All Info at One",
    status: "active",
  };

  const dummyVisitorData = [
    { id: 1, ipAddress: "192.168.1.1", totalVisitors: 100 },
    { id: 2, ipAddress: "192.168.1.2", totalVisitors: 75 },
    { id: 3, ipAddress: "192.168.1.3", totalVisitors: 120 },
    { id: 4, ipAddress: "192.168.1.4", totalVisitors: 90 },
    { id: 5, ipAddress: "192.168.1.5", totalVisitors: 110 },
  ];
  return (
    <div className="container mx-auto p-8">
      {/* Card Section */}
      <div className="max-w-md mx-auto mb-8 p-4 bg-white rounded-md shadow-md">
        <h2 className="text-2xl font-bold mb-4">URL Information</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="font-bold">_id</p>
            <p>{data._id}</p>
          </div>
          <div>
            <p className="font-bold">Original URL</p>
            <p>{data.original_url}</p>
          </div>
          <div>
            <p className="font-bold">Short ID</p>
            <p>{data.short_id}</p>
          </div>
          <div>
            <p className="font-bold">Expiration Date</p>
            <p>{data.expiration_date}</p>
          </div>
          <div>
            <p className="font-bold">Starting Date</p>
            <p>{data.starting_date}</p>
          </div>
          <div>
            <p className="font-bold">Title</p>
            <p>{data.title}</p>
          </div>
          <div>
            <p className="font-bold">Description</p>
            <p>{data.description}</p>
          </div>
          <div>
            <p className="font-bold">Status</p>
            <p>{data.status}</p>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="max-w-full mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <h2 className="text-2xl font-bold mb-4 p-4">Visitors Information</h2>
        <table className="min-w-full bg-gray-200">
          <thead>
            <tr>
              <th className="py-2 px-4">IP Address</th>
              <th className="py-2 px-4">Total Visitors</th>
            </tr>
          </thead>
          <tbody>
            {/* Map over your data here */}
            {dummyVisitorData.map((item) => (
              <tr key={item.id} className="border-b">
                <td className="py-2 px-4">
                  <button className="text-blue-500 hover:underline">
                    {item.ipAddress}
                  </button>
                </td>
                <td className="py-2 px-4">{item.totalVisitors}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VisitorInfo;
