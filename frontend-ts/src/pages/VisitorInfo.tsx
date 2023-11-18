import React, { useEffect, useState } from "react";
import StickyButton from "../components/StickyButton";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

interface UrlDetails {
  _id: string;
  original_url: string;
  short_id: string;
  expiration_date: string;
  starting_date: string;
  title: string;
  description: string;
  status: string;
  stats: {
    total_visitors: number;
    unique_visitors: number;
  };
}
interface  AxiosResponse{
  url_details:UrlDetails
}

interface VisitorData {
  _id: string;
  ip_address: string;
  visit_time: string;
}

const VisitorInfo: React.FC = () => {
  const { short_id } = useParams<{ short_id: string }>();
  const [urlDetails, setUrlDetails] = useState<UrlDetails>({} as UrlDetails);
  const [visitors, setVisitors] = useState<VisitorData[]>([]);
  const [page, setPage] = useState<number>(1);

  const getUrlDetails = async (id: string) => {
    try {
      const { data } = await axios.get<AxiosResponse>(`http://localhost:8000/analytics/${id}`);
      setUrlDetails(data.url_details);
    } catch (error) {
      console.log(error);
    }
  };

  const getLogsData = async (id: string, page: number) => {
    try {
      const { data } = await axios.get<VisitorData[]>(`http://localhost:8000/analytics/visitors/${id}?page=${page}`);
      setVisitors(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (short_id) {
      getUrlDetails(short_id);
      getLogsData(short_id, page);
    }
  }, [page, short_id]);
  console.log(urlDetails);

  return (
    <div className="container mx-auto p-8">
      {/* Card Section */}
      <div className="max-w-md mx-auto mb-8 p-4 bg-white rounded-md shadow-md">
        <h2 className="text-2xl font-bold mb-4">URL Information</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="font-bold">Short ID</p>
            <p>{urlDetails.short_id}</p>
          </div>
          <div>
            <p className="font-bold">Expiration Date</p>
            <p>{urlDetails.expiration_date || "No expiration date"}</p>
          </div>
          <div>
            <p className="font-bold">Title</p>
            <p>{urlDetails.title || "No Title"}</p>
          </div>
          <div>
            <p className="font-bold">Description</p>
            <p>{urlDetails.description || "No Description"}</p>
          </div>
          <div>
            <p className="font-bold">Status</p>
            <p>{urlDetails.status}</p>
          </div>
          <div>
            <p className="font-bold">Total Visitors</p>
            <p>{urlDetails?.stats?.total_visitors || 0}</p>
          </div>
          <div>
            <p className="font-bold">Total Unique Visitors</p>
            <p>{urlDetails?.stats?.unique_visitors || 0}</p>
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
        <StickyButton onClick={()=>{}} label={"Go back"} />
      </Link>
    </div>
  );
};

export default VisitorInfo;
