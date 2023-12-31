import React, { useState, useEffect } from "react";
// import "./AllUrl.css";
import EditModal from "./EditModal";
import StickyButton from "../components/StickyButton";
import axios from "axios";
import { Link } from "react-router-dom";
const server=import.meta.env.VITE_SERVER

interface UrlItem {
    short_id: string;
    title: string;
    status: string;
    description: string;
    expiration_date: string;
}

const AllUrl: React.FC = () => {
    const [page, setPage] = useState<number>(1);
    const [allUrl, setAllUrl] = useState<UrlItem[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
    const [editModalData, setEditModalData] = useState<UrlItem>({} as UrlItem);

    const openEditModal = (item: UrlItem) => {
        setIsEditModalOpen(true);
        setEditModalData(item);
    };

    const handleRemove = async (item: UrlItem) => {
        try {
            await axios.delete(`${server}/delete/${item.short_id}`);
            getAllUrl();
        } catch (error) {
            console.log(error);
        }
    };

    const closeEditModal = () => {
        setIsEditModalOpen(false);
    };

    const handleEdit = async (id: string, formData: Record<string, string>) => {
        try {
            await axios.put(`${server}/update/${id}`, formData);
            getAllUrl();
            closeEditModal();
        } catch (error) {
            console.log(error);
        }
    };

    const getAllUrl = async () => {
        setLoading(!loading);
        try {
            const res = await fetch(`${server}/appid?page=${page}`);
            const data = await res.json();
            if (data) {
                setAllUrl(data);
            }
        } catch (err) {
            console.log(err);
        }
        setLoading(!loading);
    };

    useEffect(() => {
        getAllUrl();
    }, [page]);

    return (
        <>
            <div className="container mx-auto md:mt-10 mt-4">
                <h1 className="text-[1.7rem] font-bold text-blue-600 mb-2 md:ml-0 ml-2">Shorten Links:-</h1>
                <hr className="border-1 border-blue-400 mb-3" />
                <table className="min-w-full bg-white border border-gray-300 text-center hidden md:table mt-2">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 border-b">Sl No.</th>
                            <th className="py-2 px-4 border-b">Short URL</th>
                            <th className="py-2 px-4 border-b">Title</th>
                            <th className="py-2 px-4 border-b">Status</th>
                            <th className="py-2 px-4 border-b">Edit</th>
                            <th className="py-2 px-4 border-b">View Details</th>
                            <th className="py-2 px-4 border-b">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allUrl.map((item, index) => (
                            <tr
                                key={index}
                                className={index % 2 === 0 ? "bg-gray-100" : ""}
                            >
                                <td className="py-2 px-4 border-b">{index + 1 + (page * 10 - 10)}</td>
                                <td className="py-2 px-4 border-b btn">
                                    <a href={`${server}/${item.short_id}`} target="blank"  className="cursor-pointer text-blue-500 underline italic">
                                        {`${server}/${item.short_id}`}
                                    </a>
                                </td>
                                <td className="py-2 px-4 border-b capitalize font-normal">{item.title}</td>
                                <td className="py-2 px-4 border-b">{item.status}</td>
                                <td className="py-2 px-4 border-b">
                                    <button
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                        onClick={() => openEditModal(item)}
                                    >
                                        Edit
                                    </button>
                                </td>
                                <td className="py-2 px-4 border-b">
                                    <Link to={`/visitor-info/${item.short_id}`}>
                                        <button
                                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                        >
                                            Details
                                        </button>
                                    </Link>
                                </td>
                                <td className="py-2 px-4 border-b">
                                   <button
                                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                        onClick={() => handleRemove(item)}
                                    >
                                        Remove
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {/* For small screen */}
                <div className="h-[80vh] overflow-y-scroll scrollbar-hide px-1 md:hidden">
                    {allUrl.map((item, index) => (
                        <div className="max-w-md mx-auto bg-white rounded-md overflow-hidden border border-solid border-gray-500 mx-2 my-2" key={index}>
                            <div className="p-4">
                                <h2 className="text-xl font-bold capitalize pb-2">{item.title}</h2>
                                <div className="flex flex-col text-sm">
                                    <span className="mr-2 flex">
                                        <a href={`${server}/${item.short_id}`} className="cursor-pointer text-blue-500 underline italic">${server}/{item.short_id}</a>
                                    </span>
                                    <span className="mr-2">
                                        status: {item.status}
                                    </span>

                                </div>
                                <div className="flex justify-start gap-4 mt-2">
                                    <Link to={`/visitor-info/${item.short_id}`}>
                                        <button
                                            className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-1 rounded focus:outline-none focus:shadow-outline"
                                        >
                                            Details
                                        </button>
                                    </Link>
                                    <button
                                        className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-4 rounded focus:outline-none focus:shadow-outline"
                                        onClick={() => openEditModal(item)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="bg-red-500 hover:bg-red-700 text-white py-1 px-4 rounded focus:outline-none focus:shadow-outline"
                                        onClick={() => handleRemove(item)}
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        </div>

                    ))}
                </div>
                {/*  */}
                <div className="m-auto mt-3 flex md:justify-end justify-center items-center">
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
                        Previous
                    </button>
                    <button className="mx-6">{page}</button>
                    <button
                        style={{
                            opacity: allUrl.length < 10 ? "0.5" : "1",
                            cursor: allUrl.length < 10 ? "not-allowed" : "pointer",
                        }}
                        disabled={allUrl.length < 10}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        onClick={() => {
                            setPage((pre) => pre + 1);
                        }}
                        >
                        Next
                    </button>
                </div>
            </div>
            <EditModal
                isOpen={isEditModalOpen}
                onClose={closeEditModal}
                data={editModalData}
                handleEdit={handleEdit}
            />
            <Link to={"/"}>
                <StickyButton onClick={() => { }} label={"Go back"} />
            </Link>
        </>
    );
};

export default AllUrl;
