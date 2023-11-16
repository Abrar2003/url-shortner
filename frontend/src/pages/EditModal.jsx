import { useState } from "react";

const EditModal = ({ isOpen, onClose, data }) => {
    const [formData, setFormData] = useState(data);
    const handleEdit = async () => {
        console.log("from data",data)
        // onClose();
    }
    return (
        <>
            {isOpen && (
                <div className="fixed inset-0 overflow-y-auto border border-solid border-black">
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                        </div>

                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                            &#8203;
                        </span>

                        <div
                            className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
                            role="dialog"
                            aria-modal="true"
                            aria-labelledby="modal-headline"
                        >
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className="sm:flex sm:items-start">
                                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                        <h3 className="text-lg leading-6 font-medium text-gray-900">
                                            Update Status
                                        </h3>
                                        <div className="mt-2">
                                            <div className="mb-3">
                                                <label className="mr-2" htmlFor="title">Title:</label>
                                                <input type="text" value={data.title} />
                                            </div>
                                            <div className="mb-3">
                                                <label className="mr-2" htmlFor="expire">Expire Date:</label>
                                                <input type='date' value={data.expiration_date} />
                                            </div>
                                            <div  className="flex items-center ">
                                                <label className="mr-2" htmlFor="description">Description:</label>
                                                <textarea defaultValue={data.description}></textarea>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 flex justify-end">
                                <button
                                    onClick={handleEdit}
                                    type="button"
                                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
                                >
                                    Update
                                </button>
                                <button
                                    onClick={onClose}
                                    type="button"
                                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default EditModal;
