import React, { useEffect, useState, ChangeEvent } from "react";

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: {
    title: string;
    description: string;
    expiration_date: string;
    short_id: string;
  };
  handleEdit: (id: string, formData: Record<string, string>) => void;
}

const EditModal: React.FC<EditModalProps> = ({
  isOpen,
  onClose,
  data,
  handleEdit,
}) => {
  const [formData, setFormData] = useState({
    title: data.title,
    description: data.description,
    expiration_date: data.expiration_date,
  });
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name: key, value } = e.target;
    const expireTimestamp =
      key == "expiration_date" ? new Date(value).getTime() : null;
    const startTimestamp = new Date().getTime();
    if (
      expireTimestamp &&
      expireTimestamp - startTimestamp < 24 * 60 * 60 * 1000
    ) {
      setErrorMessage(
        "The difference between starting and expiring dates must be at least 24 hours"
      );
      // Clear error message after 2 seconds
      setTimeout(() => {
        setErrorMessage("");
      }, 4000);

      return;
    }
    setFormData({
      ...formData,
      [key]: value,
    });
  };

  useEffect(() => {
    setFormData(data);
  }, [data]);

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 overflow-y-auto border border-solid border-black">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
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
                        <label className="mr-2" htmlFor="title">
                          Title:
                        </label>
                        <input
                          name="title"
                          type="text"
                          onChange={handleChange}
                          value={formData.title}
                        />
                      </div>
                      <div className="mb-3">
                        <label className="mr-2" htmlFor="expire">
                          Expire Date:
                        </label>
                        <input
                          type="date"
                          name="expiration_date"
                          onChange={handleChange}
                          value={formData.expiration_date}
                        />
                      </div>
                      <div className="flex items-center ">
                        <label className="mr-2" htmlFor="description">
                          Description:
                        </label>
                        <textarea
                          name="description"
                          onChange={handleChange}
                          value={formData.description}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {errorMessage && (
                <p className="text-red-500 text-sm mb-4">{errorMessage}</p>
              )}
              <div className="bg-gray-50 px-4 py-3 flex justify-end">
                <button
                  onClick={() => handleEdit(data.short_id, formData)}
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
