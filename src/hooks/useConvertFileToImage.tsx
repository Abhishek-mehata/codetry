import { message } from "antd";

const useConvertFileToImage = () => {
  const convertToImage = (file: File) => {
    if (!(file instanceof File)) {
      return message.error(`Invalid Image file object`);
    }

    return URL.createObjectURL(file);
  };

  return { convertToImage };
};

export default useConvertFileToImage;
