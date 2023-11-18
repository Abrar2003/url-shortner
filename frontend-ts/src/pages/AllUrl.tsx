import React, { useState, useEffect } from "react";
import EditModal from "./EditModal";
import StickyButton from "../components/StickyButton";
import axios from "axios";
import { Link } from "react-router-dom";

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
    const [editModalData, setEditModalData] = useState<UrlItem>(
        {} as UrlItem
    );

    const openEditModal = (item: UrlItem) => {
        setIsEditModalOpen(true);
        setEditModalData(item);
    };

    const closeEditModal = () => {
        setIsEditModalOpen(false);
    };

    const handleEdit = async (id: string, formData: Record<string, string>) => {
        try {
            await axios.put(`http://localhost:8000/update/${id}`, formData);
            getAllUrl();
            closeEditModal();
        } catch (error) {
            console.log(error);
        }
    };

    const getAllUrl = async () => {
        setLoading(!loading);
        try {
            const res = await fetch(`http://localhost:8000/appid?page=${page}`);
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
            <div>
                <h1 className="text-3xl text-center font-bold">All Short Url Page</h1>
                <div className="container mx-auto mt-8">
                    <table className="min-w-full bg-white border border-gray-300 text-center">
                        <thead>
                            <tr>
                                <th className="py-2 px-4 border-b">Sl No.</th>
                                <th className="py-2 px-4 border-b">Short URL</th>
                                <th className="py-2 px-4 border-b">Title</th>
                                <th className="py-2 px-4 border-b">Status</th>
                                <th className="py-2 px-4 border-b">Edit</th>
                                <th className="py-2 px-4 border-b">View Details</th>
                            </tr>
                        </thead>
                        <tbody>
                            {allUrl.map((item, index) => (
                                <tr
                                    key={index}
                                    className={index % 2 === 0 ? "bg-gray-100" : ""}
                                >
                                    <td className="py-2 px-4 border-b">{index + 1}</td>
                                    <td className="py-2 px-4 border-b btn">
                                        <a href={`http://localhost:8000/${item.short_id}`} className="cursor-pointer text-blue-500 underline italic">
                                            {`localhost:8000/${item.short_id}`}
                                        </a>
                                    </td>
                                    <td className="py-2 px-4 border-b">{item.title}</td>
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
                                </tr>
                            ))}
                        </tbody>
                    </table>
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
                </div>
            </div>
            <EditModal
                isOpen={isEditModalOpen}
                onClose={closeEditModal}
                data={editModalData}
                handleEdit={handleEdit}
            />
            <Link to={"/"}>
                <StickyButton onClick={()=>{}} label={"Go back"} />
            </Link>
        </>
    );
};

export default AllUrl;
