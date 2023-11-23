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
interface AxiosResponse {
  url_details: UrlDetails;
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
      const { data } = await axios.get<AxiosResponse>(
        `http://localhost:8000/analytics/${id}`
      );
      setUrlDetails(data.url_details);
    } catch (error) {
      console.log(error);
    }
  };

  const getLogsData = async (id: string, page: number) => {
    try {
      const { data } = await axios.get<VisitorData[]>(
        `http://localhost:8000/analytics/visitors/${id}?page=${page}`
      );
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
  // console.log(urlDetails);

  return (
    <div className="container mx-auto p-8">
      {/* Card Section */}
      <section className="text-gray-600 body-font rounded mb-4 ">
        <div className="container pl-5 pb-3 mx-auto flex">
          <div className="flex flex-wrap mx-auto w-full shadow-2xl pt-3 px-4 pb-6">
            <div className="w-full  mb-1">
              <h1 className="title-font font-medium text-2xl mb-2 text-gray-900 capitalize pl-4">
                {urlDetails?.title}
              </h1>
              <div className="leading-relaxed mb-3 pl-4">
                {urlDetails?.description}
              </div>
            </div>
            <div className="flex flex-wrap gap-2 w-full">
            <div className="p-4 relative shadow-lg">
                <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"></span>
                <span className="title-font font-medium text-[1.3rem] text-gray-900">
                  Original url:
                </span>
                <a href="" className="cursor-pointer underline">
                  {urlDetails?.original_url}
                </a>
              </div>
               <div className="p-4 relative shadow-lg">
                <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"></span>
                <span className="title-font font-medium text-[1.3rem] text-gray-900">
                  Short url:
                </span>
                <a
                  href=""
                  className="cursor-pointer underline"
                >{`http://localhost:8080/${urlDetails?.short_id}`}</a>
              </div>
               <div className="p-4 relative shadow-lg">
                <span className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"></span>
                <h2 className="title-font font-medium text-[1.3rem] text-gray-900">
                  Expiration Date
                </h2>
                <p className="leading-relaxed">{urlDetails?.expiration_date}</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 w-full">
              <div className="p-4 relative shadow-lg">
                <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"></span>
                <h2 className="title-font font-medium text-[1.3rem] text-gray-900">
                  Short Id
                </h2>
                <p className="leading-relaxed">{urlDetails?.short_id}</p>
              </div>           
              <div className="p-4 relative shadow-lg">
                <span className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"></span>
                <h2 className="title-font font-medium text-[1.3rem] text-gray-900">
                  Status
                </h2>
                <p className="leading-relaxed">{urlDetails?.status}</p>
              </div>
              <div className="p-4 relative shadow-lg">
                <span className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"></span>
                <h2 className="title-font font-medium text-[1.3rem] text-gray-900">
                  Total Visitors
                </h2>
                <p className="leading-relaxed">
                  {urlDetails?.stats?.total_visitors}
                </p>
              </div>
              <div className="p-4 relative shadow-lg">
                <span className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"></span>
                <h2 className="title-font font-medium text-[1.3rem] text-gray-900">
                  Unique Visitors
                </h2>
                <p className="leading-relaxed">
                  {urlDetails?.stats?.unique_visitors}
                </p>
              </div>
            </div>
          </div>
          {/* <div className="lg:w-1/2 sm:w-1/3 w-full rounded-lg overflow-hidden mt-6 sm:mt-0 lg:block hidden">
            <img
              className="object-cover object-center w-full h-full"
              src="https://cdn.pixabay.com/photo/2019/04/18/13/26/a-random-lake-4136935_960_720.jpg"
              alt="stats"
            />
          </div> */}
        </div>
      </section>

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
        <StickyButton onClick={() => {}} label={"Go back"} />
      </Link>
    </div>
  );
};

export default VisitorInfo;
