import React, { useEffect, useState } from "react";
import StickyButton from "../components/StickyButton";
import { useParams,Link } from "react-router-dom";
import axios from "axios";
import {
  CalendarIcon,
  ExternalLinkIcon,
  Link2Icon,
  PersonIcon,
  StarIcon,
  StackIcon,
  EyeOpenIcon,
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
    <div className="container mx-auto md:p-8 p-2">
      {/* Url card */}
      <section className="text-gray-600 body-font rounded mb-4">
        <div className="container md:pl-5 md:pb-3 mx-auto flex">
          <div className="mx-auto w-full shadow-2xl md:p-6 p-2 border-[2px] rounded border-blue-600">
            <div className="w-full mb-1 px-4 py-2 relative shadow-md">
              <h1 className="title-font font-medium text-2xl mb-2 text-blue-600 capitalize">
                {urlDetails?.title}
              </h1>
              <div className="leading-relaxed mb-3">
                {urlDetails?.description}
              </div>
            </div>
            <div className="md:grid md:grid-cols-3 gap-2 m-auto lg:w-full">
              <div className="p-4 relative shadow-md w-full">
                <div className="title-font md:text-lg text-sm font-medium flex  justify-start  items-center gap-2">
                  <ExternalLinkIcon width={20} height={20} color="blue" />
                  <span className="text-blue-600">Original Url</span>
                </div>
                <a href="" className="cursor-pointer underline">
                  {urlDetails?.original_url}
                </a>
              </div>
              <div className="p-4 relative shadow-md w-full">
                <div className="title-font md:text-lg text-sm font-medium flex  justify-start  items-center gap-2">
                  <Link2Icon width={20} height={20} color="blue" />
                  <span className="text-blue-600">Short Url</span>
                </div>
                <a
                  href=""
                  className="cursor-pointer underline"
                >{`http://localhost:8080/${urlDetails?.short_id}`}</a>
              </div>
              <div className="p-4 relative shadow-md w-full">
                <div className="title-font md:text-lg text-sm font-medium flex  justify-start  items-center gap-2">
                  <CalendarIcon width={20} height={20} color="blue" />
                  <span className="text-blue-600">Expiration Date</span>
                </div>
                <p className="leading-relaxed">
                  {urlDetails?.expiration_date?.split("T")[0]}
                </p>
              </div>
              <div className="p-4 relative shadow-md w-full">
                <div className="title-font md:text-lg text-sm font-medium flex  justify-start  items-center gap-2">
                  <StarIcon width={20} height={20} color="blue" />
                  <span className="text-blue-600">Short Id</span>
                </div>
                <p className="leading-relaxed">{urlDetails?.short_id}</p>
              </div>
              <div className="p-4 relative shadow-md w-full">
                <div className="title-font md:text-lg text-sm font-medium flex  justify-start  items-center gap-2">
                  <StackIcon width={20} height={20} color="blue" />
                  <span className="text-blue-600">Status</span>
                </div>
                <p className="leading-relaxed">{urlDetails?.status}</p>
              </div>
              <div className="p-4 relative shadow-md w-full">
                <div className="title-font md:text-lg text-sm font-medium flex  justify-start  items-center gap-2">
                  <EyeOpenIcon width={20} height={20} color="blue" />
                  <span className="text-blue-600">Total Visitors</span>
                </div>
                <p className="leading-relaxed">
                  {urlDetails?.stats?.total_visitors}
                </p>
              </div>
              <div className="p-4 relative shadow-md md:w-1/3 md:col-span-3 mx-auto">
                <div className="title-font md:text-lg text-sm font-medium flex  justify-start  items-center gap-2">
                  <PersonIcon width={20} height={20} color="blue" />
                  <span className="text-blue-600">Unique Visitors</span>
                </div>
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
        <div className="container md:pl-5 md:pb-3 mx-auto flex">
          <div className="flex flex-wrap mx-auto w-full shadow-2xl p-6 border-[2px] rounded border-blue-600">
            <div className="w-full mx-auto bg-white rounded-lg md:mt-4">
              <h1 className="title-font font-medium text-[1.6rem] mb-2 text-blue-600 capitalize">
                Visitors analytics:
              </h1>
              <div className="w-full overflow-x-scroll">
                <table className="bg-gray-200 w-full">
                  <thead>
                    <tr className="bg-white border-b">
                      <th className="py-2 px-4 text-blue-500 font-medium capitalize whitespace-nowrap">
                        Sl No
                      </th>
                      <th className="py-2 px-4 text-blue-500 font-medium capitalize whitespace-nowrap">
                        IP Address
                      </th>
                      <th className="py-2 px-4 text-blue-500 font-medium capitalize whitespace-nowrap">
                        Visit Date
                      </th>
                      <th className="py-2 px-4 text-blue-500 font-medium capitalize whitespace-nowrap">
                        Visit Time
                      </th>
                      <th className="py-2 px-4 text-blue-500 font-medium capitalize whitespace-nowrap">
                        Blocked Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {visitors.map((item, index) => (
                      <tr
                        key={index}
                        className={index % 2 === 0 ? "bg-gray-100" : ""}
                      >
                        <td className="py-2 px-4 text-center whitespace-nowrap">
                          {(page - 1) * 10 + index + 1}
                        </td>
                        <td className="py-2 px-4 text-center whitespace-nowrap">
                          {item?.ip_address}
                        </td>
                        <td className="py-2 px-4 text-center whitespace-nowrap">
                          {item?.visit_time?.split("T")[0]}
                        </td>
                        <td className="py-2 px-4 text-center whitespace-nowrap">
                          {item?.visit_time?.split("T")[1]}
                        </td>
                        <td className="py-2 px-4 text-center whitespace-nowrap">
                          Not Blocked
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="m-auto mt-3 flex justify-end items-center">
                <button
                  style={{
                    opacity: page == 1 ? "0.5" : "1",
                    cursor: page == 1 ? "not-allowed" : "pointer",
                  }}
                  disabled={page == 1}
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
                    opacity: visitors.length < 6 ? "0.5" : "1",
                    cursor: visitors.length < 6 ? "not-allowed" : "pointer",
                  }}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  disabled={visitors.length < 6}
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
      <Link to={"/all-urls"}>
        <StickyButton onClick={() => {}} label={"Go back"} />
      </Link>
    </div>
  );
};

export default VisitorInfo;

// Bottom border radiant color
{
  /* <span className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"></span> */
}
