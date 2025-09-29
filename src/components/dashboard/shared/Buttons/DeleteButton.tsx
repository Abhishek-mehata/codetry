import { FC, useState } from "react";
import { FaTrash } from "react-icons/fa6";
import ConfirmDeletion from "./ConfirmDeletion";

interface Props {
  onClick: () => void;
}




const DeleteButton: FC<Props> = ({ onClick }) => {

  const [click, setClick] = useState(false);

  const confirmDeletion = () => {
    return click ? (
      <ConfirmDeletion
        onDelete={() => {
          onClick();
          setClick(!click);
        }}
        onCancel={() => setClick(!click)}
      />
    ) : null;
  };

  return (
    <button
      type="button"
      className={`p-3 rounded-full`}
      onClick={() => {
        setClick(!click); 
      }}
    >
      <div>{confirmDeletion()}</div>
      <FaTrash className={`text-red-500 text-base`} />
    </button>
  );
};

export default DeleteButton;
