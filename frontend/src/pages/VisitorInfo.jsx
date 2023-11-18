import { useEffect, useState } from "react";
import StickyButton from "../components/StickyButton";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const VisitorInfo = () => {
  // const data = {
  //   _id: "6555d73c46c74e2b331ed8a9",
  //   original_url: "https://youtu.be/t8E0pEc-FFY?si=3K2qnFIlzZvH-1DT",
  //   short_id: "V_N4QzmV-",
  //   expiration_date: "2023-11-25T00:00:00.000+00:00",
  //   starting_date: "2023-11-18T00:00:00.000+00:00",
  //   title: "YouTube",
  //   description: "All Info at One",
  //   status: "active",
  // };
  const [url_details, setDetails] = useState({});
  const [visitors, setVisitors] = useState([]);
  const [page, setPage] = useState(1);
  const { short_id } = useParams();

  
const getUrlDetails = async (id) => {
  try {
    const { data } = await axios.get(`http://localhost:8000/analytics/${id}`);
    setDetails(data.url_details);
  } catch (error) {
    console.log(error);
  }
};
const getLogsData = async (id, page) => {
  try {
    const { data } = await axios.get(`http://localhost:8000/analytics/visitors/${id}?page=${page}`);
    setVisitors(data);
  } catch (error) {
    console.log(error);
  }
};
  const dummyVisitorData = [
    { id: 1, ipAddress: "192.168.1.1", totalVisitors: 100 },
    { id: 2, ipAddress: "192.168.1.2", totalVisitors: 75 },
    { id: 3, ipAddress: "192.168.1.3", totalVisitors: 120 },
    { id: 4, ipAddress: "192.168.1.4", totalVisitors: 90 },
    { id: 5, ipAddress: "192.168.1.5", totalVisitors: 110 },
  ];

  useEffect(() => {
    getUrlDetails(short_id);
    getLogsData(short_id, page);
  }, [page, short_id])

  return (
    <div className="container mx-auto p-8">
      {/* Card Section */}
      <div className="max-w-md mx-auto mb-8 p-4 bg-white rounded-md shadow-md">
        <h2 className="text-2xl font-bold mb-4">URL Information</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="font-bold">Short ID</p>
            <p>{url_details.short_id}</p>
          </div>
          <div>
            <p className="font-bold">Expiration Date</p>
            <p>{url_details.expiration_date || "No expiration date"}</p>
          </div>
          <div>
            <p className="font-bold">Title</p>
            <p>{url_details.title || "No Title"}</p>
          </div>
          <div>
            <p className="font-bold">Description</p>
            <p>{url_details.description || "No Description"}</p>
          </div>
          <div>
            <p className="font-bold">Status</p>
            <p>{url_details.status}</p>
          </div>
          <div>
            <p className="font-bold">Total Visitors</p>
            <p>{url_details?.stats?.total_visitors || 0}</p>
          </div>
          <div>
            <p className="font-bold">Total Unique Visitors</p>
            <p>{url_details?.stats?.unique_visitors || 0}</p>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="max-w-full mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <h2 className="text-2xl font-bold mb-4 p-4">Visitors Information</h2>
        <table className="min-w-full bg-gray-200">
          <thead>
            <tr className="bg-white border-b">
              <th className="py-2 px-4">IP Address</th>
              <th className="py-2 px-4">Visit Time</th>
            </tr>
          </thead>
          <tbody>
            {/* Map over your data here */}
            {visitors.map((item, index) => (
              <tr
                key={item._id}
                className={index % 2 === 0 ? "bg-gray-100" : ""}
              >
                <td className="py-2 px-4 text-center">{item.ip_address}</td>
                <td className="py-2 px-4 text-center">{item.visit_time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="m-auto mt-3 flex justify-center items-center">
            <button
              className="border bottom-1 border-gray-500 rounded px-2 py-1"
              disabled={page === 1}
              onClick={() => {
                setPage((pre) => pre - 1);
              }}
            >
              Previous
            </button>
            <button className="mx-6">{page}</button>
            <button
              className="border bottom-1 border-gray-500 rounded px-2 py-1"
              onClick={() => {
                setPage((pre) => pre + 1);
              }}
            >
              Next
            </button>
          </div>
      <Link to={"/all-urls"}>
        <StickyButton label={"Go back"} />
      </Link>
    </div>
  );
};

export default VisitorInfo;
