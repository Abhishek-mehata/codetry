import { useState, ChangeEvent, useRef, FC, useEffect } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { Button } from "../..";
import { FaTrash } from "react-icons/fa6";
import { message, Modal } from "antd";

interface ImageUploadProps {
  imageFiles?: File[];
  existingImages?: Array<{ url: string; original_name: string; id: string }>;
  className?: string;
  onImagesSelected?: (data: { files: File[]; base64Images?: string[] }) => void;
  onExistingImagesChange?: (images: Array<{ url: string; original_name: string; id: string }>) => void;
  deletingImages?: string[];
  maxImages?: number;
}

interface Image {
  file: File;
  url: string;
  base64?: string;
}

interface ExistingImage {
  url: string;
  original_name: string;
  id: string;
}

const ImageUploader: FC<ImageUploadProps> = ({
  className,
  imageFiles,
  existingImages = [],
  onImagesSelected,
  onExistingImagesChange,
  deletingImages,
  maxImages,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [images, setImages] = useState<Image[]>([]);
  const [existingImagesState, setExistingImagesState] = useState<ExistingImage[]>(existingImages);

  useEffect(() => {
    if (imageFiles && imageFiles?.length > 0) {
      convertFileToImage(imageFiles as File[]);
    }
  }, []);

  useEffect(() => {
    setExistingImagesState(existingImages);
  }, [existingImages]);

  useEffect(() => {
    if (onImagesSelected) {
      onImagesSelected({
        files: images.map((img) => img.file),
        base64Images: images
          .map((img) => img.base64)
          .filter(Boolean) as string[],
      });
    }
  }, [images]);

  const convertFileToImage = async (files: File[]) => {
    const newImages: Image[] = [];

    // Check if adding these files would exceed the maximum limit
    if (maxImages && (images.length + files.length) > maxImages) {
      message.error(`You can only upload a maximum of ${maxImages} images. You currently have ${images.length} images.`);
      return;
    }

    for (const file of files) {
      if (!(file instanceof File)) {
        message.error(`Invalid Image file object`);
        continue;
      }

      const isDuplicate = images.some(
        ({ file: imgFile }) => imgFile.name === file.name
      );
      if (isDuplicate) {
        message.error(`${file.name} is already uploaded`);
        continue;
      }

      try {
        const base64 = await fileToBase64(file);
        newImages.push({
          file,
          url: URL.createObjectURL(file),
          base64,
        });
      } catch (error) {
        console.error("Error converting file to base64:", error);
        message.error(`Error converting ${file.name} to base64`);
      }
    }

    const updatedImages = [...images, ...newImages];
    setImages(updatedImages);
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    convertFileToImage(files);
    // Clear the input value to allow selecting the same file again
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  const handleDeleteNewImage = (url: string) => {
    const imageToDelete = images.find(img => img.url === url);
    
    Modal.confirm({
      title: 'Remove Image',
      content: `Are you sure you want to remove "${imageToDelete?.file.name || 'this image'}"?`,
      okText: 'Remove',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk() {
        const updatedImages = images.filter((image) => image.url !== url);
        setImages(updatedImages);
      },
    });
  };

  const handleDeleteExistingImage = (id: string) => {
    const imageToDelete = existingImagesState.find(img => img.id === id);
    
    Modal.confirm({
      title: 'Delete Image',
      content: `Are you sure you want to delete "${imageToDelete?.original_name || 'this image'}"? This action cannot be undone.`,
      okText: 'Delete',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk() {
        const updatedExistingImages = existingImagesState.filter((image) => image.id !== id);
        setExistingImagesState(updatedExistingImages);
        if (onExistingImagesChange) {
          onExistingImagesChange(updatedExistingImages);
        }
      },
    });
  };

  const fileToBase64 = (file: File): Promise<string | undefined> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  };

  return (
    <div
      className={`flex flex-col justify-center items-center w-full ${className}`}
    >
      <input
        ref={inputRef}
        type="file"
        multiple
        accept="image/*"
        onChange={handleFileChange}
        className={`hidden w-full text-sm text-gray-500
        file:mr-4 file:py-2 file:px-4
        file:rounded-full file:border-0
        file:text-sm file:font-semibold
        file:bg-blue-50 file:text-blue-700
        hover:file:bg-blue-100`}
      />
      <div
        className={`flex flex-col gap-2 justify-center items-center py-8 border-2 border-dashed ${
          maxImages && images.length >= maxImages 
            ? 'border-gray-300 bg-gray-100 cursor-not-allowed' 
            : 'border-fade-white hover:border-primary smooth bg-[#fafafa] cursor-pointer'
        } rounded shadow w-full`}
        onClick={() => {
          if (!maxImages || images.length < maxImages) {
            inputRef.current?.click();
          }
        }}
      >
        <AiOutlineCloudUpload className={`text-4xl ${maxImages && images.length >= maxImages ? 'text-gray-400' : 'text-primary'}`} />
        <h4 className={`text-md ${maxImages && images.length >= maxImages ? 'text-gray-400' : 'text-dark-gray'}`}>
          {maxImages && images.length >= maxImages 
            ? `Maximum ${maxImages} images reached` 
            : 'Click to add your photos here'
          }
        </h4>
        <Button 
          title={maxImages && images.length >= maxImages ? "Maximum Reached" : "Upload Photos"} 
          variant="outline" 
          disabled={!!(maxImages && images.length >= maxImages)}
        />
      </div>
      
      {/* Existing Images Section */}
      {existingImagesState.length > 0 && (
        <div className="mt-6 w-full">
          <h6 className="text-sm font-medium text-gray-700 mb-3">Existing Images:</h6>
          <div className="flex gap-2 justify-start items-center flex-wrap w-full">
            {existingImagesState.map((image) => {
              const isDeleting = deletingImages?.includes(image.id);
              return (
                <div key={image.id} className="relative shadow rounded overflow-hidden">
                  <img
                    src={image.url}
                    alt={image.original_name}
                    className={`w-20 h-20 object-cover object-center ${isDeleting ? 'opacity-50' : ''}`}
                  />
                  <button
                    onClick={() => handleDeleteExistingImage(image.id)}
                    disabled={isDeleting}
                    className={`absolute top-1 right-1 ${
                      isDeleting 
                        ? 'bg-gray-400 cursor-not-allowed' 
                        : 'bg-red-500 hover:bg-red-600'
                    } text-white rounded-full w-6 h-6 flex items-center justify-center transition-colors`}
                    title={isDeleting ? "Deleting..." : "Delete image"}
                  >
                    {isDeleting ? (
                      <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <FaTrash className="text-xs" />
                    )}
                  </button>
                  <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-1 text-center truncate">
                    {image.original_name}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* New Images Section */}
      {images.length > 0 && (
        <div className="mt-6 w-full">
          <h6 className="text-sm font-medium text-gray-700 mb-3">New Images:</h6>
          <div className="flex gap-2 justify-start items-center flex-wrap w-full">
            {images.map((image) => (
              <div key={image.url} className="relative shadow rounded overflow-hidden">
                <img
                  src={image.url}
                  alt="Preview"
                  className="w-20 h-20 object-cover object-center"
                />
                <button
                  onClick={() => handleDeleteNewImage(image.url)}
                  className="absolute top-1 right-1 bg-red-500 hover:bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center transition-colors"
                  title="Delete image"
                >
                  <FaTrash className="text-xs" />
                </button>
                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-1 text-center truncate">
                  {image.file.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
