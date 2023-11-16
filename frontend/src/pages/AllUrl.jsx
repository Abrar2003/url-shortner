import { useState, useEffect } from 'react';
import { demoData } from '../components/DemoData.jsx'
import StatusModal from '../components/StatusModal.jsx';
import EditModal from '../components/EditModal.jsx';
import {useNavigate} from 'react-router-dom'
export const AllUrl = () => {
    // State Management
    const [page, setPage] = useState(1);
    const [allUrl, setAllUrl] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate=useNavigate();
    // State Management For Status Change;
    const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
    const [statusModalData,setStatusModalData]=useState({});
    // State Management For All Change;
    const [isEditModalOpen,setIsEditModalOpen]=useState(false);
    const [editModalData,setEditModalData]=useState({});

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

    const getAllUrl = async () => {
        setLoading(!loading);
        setAllUrl(demoData);
        // try {
        //     const res = await fetch(`http://localhost:3000?page=${page}&app_id=${app_id}`);
        //     const data = await res.json();
        //     if (data) {
        //         setAllUrl(data)
        //     }
        // } catch (err) {
        //     console.log(err)
        // }
        setLoading(!loading);
    }
    useEffect(() => {
        getAllUrl();
    }, [page]);
    return (
        <>
            <div>
                <h1 className='text-3xl text-center font-bold'>All Short Url Page</h1>
                <div className="container mx-auto mt-8">
                    <table className="min-w-full bg-white border border-gray-300 text-center">
                        <thead>
                            <tr>
                            <th className="py-2 px-4 border-b">Sl No.</th>
                                <th className="py-2 px-4 border-b">Short URL</th>
                                <th className="py-2 px-4 border-b">Title</th>
                                <th className="py-2 px-4 border-b">Status</th>
                                <th className="py-2 px-4 border-b">Update Status</th>
                                <th className="py-2 px-4 border-b">Edit</th>
                            </tr>
                        </thead>
                        <tbody>
                            {allUrl.map((item, index) => (
                                <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : ''}>
                                    <td className="py-2 px-4 border-b">{index+1}</td>
                                    <td className="py-2 px-4 border-b">
                                        <a href={item.short_url}>{item.short_url}</a>
                                    </td>
                                    <td className="py-2 px-4 border-b">
                                        <button onClick={()=>navigate(`/analytics/${item?._id}`)}>{item.title}</button>
                                    </td>
                                    <td className="py-2 px-4 border-b">{item.status}</td>
                                    <td className="py-2 px-4 border-b">
                                        <button onClick={()=>{
                                            setStatusModalData(item)
                                            openStatusModal()
                                        }}>Update</button>
                                    </td>
                                    <td className="py-2 px-4 border-b">
                                        <button onClick={()=>{
                                            setEditModalData({...item});
                                            openEditModal();
                                        }}>Edit</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className='m-auto mt-3 flex justify-center items-center' >
                        <button className='border bottom-1 border-gray-500 rounded px-2 py-1'
                            disabled={page === 1}
                            onClick={() => {
                                setPage(pre => pre - 1)
                            }}>Previous</button>
                        <button className='mx-6'>{page}</button>
                        <button className='border bottom-1 border-gray-500 rounded px-2 py-1'
                            onClick={() => {
                                setPage(pre => pre + 1)
                            }}>Next</button>
                    </div>
                </div>
            </div>
            <StatusModal isOpen={isStatusModalOpen} onClose={closeStatusModal} data={statusModalData} />
            <EditModal isOpen={isEditModalOpen} onClose={closeEditModal} data={editModalData}/>
        </>
    )
}
