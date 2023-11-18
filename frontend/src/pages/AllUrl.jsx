import { useState, useEffect } from "react";
import EditModal from "./EditModal.jsx";
import StickyButton from "../components/StickyButton.jsx";
import axios from "axios";
import { Link } from "react-router-dom";
export const AllUrl = () => {
  const [page, setPage] = useState(1);
  const [allUrl, setAllUrl] = useState([]);
  const [loading, setLoading] = useState(false);
  const [index, setIndex] = useState();
  // State Management For Status Change;
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [statusModalData, setStatusModalData] = useState({});
  // State Management For All Change;
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editModalData, setEditModalData] = useState({});

  // Opening And Closing Of Status Modal
  const openStatusModal = () => {
    setIsStatusModalOpen(true);
  };

  const closeStatusModal = () => {
    setIsStatusModalOpen(false);
  };
  // Opening And Closing Of Edit Modal
  const openEditModal = () => {
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };

  // const handleEdit = (data, )

  const updateStatus = async (status, short_id, index) => {
    const res = await axios.put(`http://localhost:8000/update/${short_id}`, {
      status,
    });
    allUrl[index].status = res.data.status;
    const updatedData = allUrl;
    setAllUrl(updatedData);
    getAllUrl();
  };

  const handleEdit = async (id, formData) => {
    console.log('calling',id,formData);

    try {
      const res = await axios.put(`http://localhost:8000/update/${id}`, formData);
      getAllUrl();
    } catch (error) {
      console.log(error);
    }
  }

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

                  {/* <td className="py-2 px-4 border-b" >{`localhost:8000/url/${item.short_id}`}</td> */}
                  <td className="py-2 px-4 border-b btn">
                    <a href={`http://localhost:8000/${item.short_id}`} className="text-decor-none cursor-pointer">
                      {`localhost:8000/${item.short_id}`}
                    </a>
                  </td>
                  <td className="py-2 px-4 border-b">{item.title}</td>
                  <td className="py-2 px-4 border-b">{item.status}</td>
                  <td className="py-2 px-4 border-b">
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                      onClick={() => {
                        openEditModal();
                        setEditModalData(item);
                        setIndex(index);
                      }}
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
        <StickyButton label={"Go back"} />
      </Link>
    </>
  );
};
