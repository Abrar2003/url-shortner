import React, { useEffect, useState } from "react";
// import StickyButton from "../components/StickyButton";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  CalendarIcon,
  ExternalLinkIcon,
  Link2Icon,
  PersonIcon,
  StarIcon,
  StackIcon,
  EyeOpenIcon
} from "@radix-ui/react-icons";

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
      {/* Url card */}
      <section className="text-gray-600 body-font rounded mb-4 ">
        <div className="container pl-5 pb-3 mx-auto flex">
          <div className="mx-auto w-full shadow-2xl pt-3 px-4 pb-6 border-[3px] rounded border-gray-500">
            <div className="w-full mb-1">
              <h1 className="title-font font-medium text-2xl mb-2 text-gray-900 capitalize">
                {urlDetails?.title}
              </h1>
              <div className="leading-relaxed mb-3">
                {urlDetails?.description}
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2 m-auto lg:w-full">
              <div className="p-4 relative shadow-md w-full">
                <div>
                  <ExternalLinkIcon width={20} height={20}/>
                </div>
                <span className="title-font text-lg text-gray-900">
                  Original Url
                </span>
                <a href="" className="cursor-pointer underline">
                  {urlDetails?.original_url}
                </a>
              </div>
              <div className="p-4 relative shadow-md w-full">
                <div>
                  <Link2Icon width={20} height={20}/>
                </div>
                <span className="title-font text-lg text-gray-900">
                  Short Url
                </span>
                <a
                  href=""
                  className="cursor-pointer underline"
                >{`http://localhost:8080/${urlDetails?.short_id}`}</a>
              </div>
              <div className="p-4 relative shadow-md w-full">
                <div>
                  <CalendarIcon width={20} height={20}/>
                </div>
                <h2 className="title-font text-lg text-gray-900">
                  Expiration Date
                </h2>
                <p className="leading-relaxed">
                  {urlDetails?.expiration_date}
                </p>
              </div>
              <div className="p-4 relative shadow-md w-full">
                <div>
                  <StarIcon width={20} height={20}/>
                </div>
                <h2 className="title-font text-lg text-gray-900">
                  Short Id
                </h2>
                <p className="leading-relaxed">{urlDetails?.short_id}</p>
              </div>
              <div className="p-4 relative shadow-md w-full">
                <div>
                  <StackIcon width={20} height={20}/>
                </div>
                <h2 className="title-font text-lg text-gray-900">
                  Status
                </h2>
                <p className="leading-relaxed">{urlDetails?.status}</p>
              </div>
              <div className="p-4 relative shadow-md w-full">
                <div>
                  <EyeOpenIcon width={20} height={20}/>
                </div>
                <h2 className="title-font text-lg text-gray-900">
                  Total Visitors
                </h2>
                <p className="leading-relaxed">
                  {urlDetails?.stats?.total_visitors}
                </p>
              </div>
              <div className="p-4 relative shadow-md w-1/3 col-span-3 mx-auto">
                <div>
                  <PersonIcon width={20} height={20}/>
                </div>
                <h2 className="title-font text-lg text-gray-900">
                  Unique Visitors
                </h2>
                <p className="leading-relaxed">
                  {urlDetails?.stats?.unique_visitors}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Visitors Analytics */}
      <section className="text-gray-600 body-font rounded mb-4 ">
        <div className="container pl-5 pb-3 mx-auto flex">
          <div className="flex flex-wrap mx-auto w-full shadow-2xl pt-3 px-4 pb-6 border-[3px] rounded border-gray-500">
            <div className="w-full mx-auto bg-white rounded-lg mt-4">
              <h1 className="title-font font-medium text-[1.6rem] mb-2 text-gray-900 capitalize">
                Visitors analytics:
              </h1>
              <table className="min-w-full bg-gray-200">
                <thead>
                  <tr className="bg-white border-b">
                    <th className="py-2 px-4">Sl No</th>
                    <th className="py-2 px-4">IP Address</th>
                    <th className="py-2 px-4">Visit Date</th>
                    <th className="py-2 px-4">Visit Time</th>
                    <th className="py-2 px-4">Blocked Status</th>
                  </tr>
                </thead>
                <tbody>
                  {visitors.map((item, index) => (
                    <tr
                      key={index}
                      className={index % 2 === 0 ? "bg-gray-100" : ""}
                    >
                      <td className="py-2 px-4 text-center">
                        {(page - 1) * 10 + index + 1}
                      </td>
                      <td className="py-2 px-4 text-center">
                        {item?.ip_address}
                      </td>
                      <td className="py-2 px-4 text-center">
                        {item?.visit_time?.split("T")[0]}
                      </td>
                      <td className="py-2 px-4 text-center">
                        {item?.visit_time?.split("T")[1]}
                      </td>
                      <td className="py-2 px-4 text-center">Not Blocked</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="m-auto mt-3 flex justify-end items-center">
                <button
                  style={{
                    opacity: page==1 ? "0.5" : "1",
                    cursor: page==1 ? "not-allowed" : "pointer",
                }}
                disabled={page==1}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  onClick={() => {
                    setPage((pre) => pre - 1);
                  }}
                >
                  Prev
                </button>
                <button className="mx-6">{page}</button>
                <button
                  style={{
                    opacity: visitors.length < 10 ? "0.5" : "1",
                    cursor: visitors.length < 10 ? "not-allowed" : "pointer",
                }}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  disabled={visitors.length < 10}
                  onClick={() => {
                    setPage((pre) => pre + 1);
                  }}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <Link to={"/all-urls"}>
        <StickyButton onClick={() => {}} label={"Go back"} />
      </Link> */}
    </div>
  );
};

export default VisitorInfo;

// Bottom border radiant color
{
  /* <span className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"></span> */
}
