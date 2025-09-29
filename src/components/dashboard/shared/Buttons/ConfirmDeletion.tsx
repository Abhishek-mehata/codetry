import { IoIosWarning } from "react-icons/io";

interface ConfirmDeletionProps {
  onDelete: () => void;
  onCancel: () => void;
}

const ConfirmDeletion: React.FC<ConfirmDeletionProps> = ({ onDelete, onCancel }) => {
  return (
    <div className="fixed flex justify-center items-center top-0 left-0 w-full h-full bg-[#4743438c] z-[9999999999] overscroll-contain">
      <div
        className="rounded-xl p-8 border border-[#9427F7] bg-white shadow-sm shadow-[#75757754] max-w-sm w-full  overscroll-contain"

      >
        <h1 className=" text-xl font-semibold mb-3 -mt-3 text-red-500">
          <IoIosWarning className="text-2xl inline-flex items-center -mt-1" />
          Warning
        </h1>
        <h1 className="text-lg font-semibold mb-2">
          Are you sure you want to delete this item?
        </h1> 
        <div className="flex justify-end gap-4 mt-5 font-[500]">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-200 rounded border border-fuchsia-600 hover:bg-fuchsia-600 hover:text-white transition"
          >
            Cancel
          </button>
          <button
            onClick={onDelete}
            className="px-4 py-2 bg-red-500 border border-red-600 text-white rounded hover:bg-red-600 transition"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeletion;
