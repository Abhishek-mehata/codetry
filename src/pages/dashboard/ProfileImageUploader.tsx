import { useRef, useState, FC, ChangeEvent } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";

import { FaTrash } from "react-icons/fa6";
import { message } from "antd";
import { Button } from "../../components";

interface ImageUploadProps {
  className?: string;
  onImageSelected?: (imageBase64: string) => void;
}

const ImageUploader: FC<ImageUploadProps> = ({ className, onImageSelected }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [base64, setBase64] = useState<string>("");
  console.log(base64); // fix this 

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        setImageUrl(URL.createObjectURL(file));
        setBase64(result);
        onImageSelected?.(result);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      message.error("Error loading image.");
    }
  };

  const handleDelete = () => {
    setImageUrl("");
    setBase64("");
    onImageSelected?.("");
  };

  return (
    <div className={`flex flex-col justify-center items-center w-full ${className}`}>
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        className="hidden"
        onChange={handleFileChange}
      />

      {!imageUrl ? (
        <div
          className="flex flex-col gap-2 justify-center items-center py-8 border-2 border-dashed border-fade-white hover:border-primary smooth bg-[#fafafa] cursor-pointer rounded shadow w-full"
          onClick={() => inputRef.current?.click()}
        >
          <AiOutlineCloudUpload className="text-4xl text-primary" />
          <h4 className="text-dark-gray text-md">Click to upload a photo</h4>
          <Button title="Upload Photo" variant="outline" />
        </div>
      ) : (
        <div className="relative shadow w-24 h-24">
          <img src={imageUrl} alt="Preview" className="object-cover w-full h-full rounded" />
          <button
            onClick={handleDelete}
            className="absolute top-2 right-2 bg-white rounded-full p-1 shadow"
          >
            <FaTrash className="text-danger text-sm" />
          </button>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
