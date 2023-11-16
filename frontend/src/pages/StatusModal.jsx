import { useState } from "react";

const StatusModal = ({ isOpen, onClose, data }) => {
    const [status, setStatus] = useState(data.status);
    const updateStatus = async () => {
        onClose();
    }
    return (
        <>
            {isOpen && (
                <div className="fixed inset-0 overflow-y-auto border border-solid  border-black">
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
                                <div>
                                    <div className="mt-3 text-center">
                                        <h3 className="text-lg leading-6 font-medium text-gray-900">
                                            Update Status
                                        </h3>
                                        <div className="mt-2 flex flex-col justify-center items-center">
                                            <div className="flex gap-3">
                                                <label htmlFor="">Title:</label>
                                                <span>{data?.title}</span>
                                            </div>
                                            <div className="flex gap-3">
                                                <label htmlFor="">Short Url:</label>
                                                <span>{data?.short_url}</span>
                                            </div>
                                            <div className="flex gap-3">
                                                <label htmlFor="">Status:</label>
                                                <select
                                                    value={status}
                                                    onChange={(e) => setStatus(e.target.value)}
                                                    className="border border-solid border-gray-500"
                                                >
                                                    <option value="draft">Draft</option>
                                                    <option value="active">Active</option>
                                                    <option value="expired">Expired</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 flex justify-center">
                                <button
                                    type="button"
                                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
                                    onClick={updateStatus}
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

export default StatusModal;
