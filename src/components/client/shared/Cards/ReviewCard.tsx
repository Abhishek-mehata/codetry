import { Avatar } from "antd";
import { FC } from "react";
import { UserOutlined } from "@ant-design/icons";

interface Props {
  avatar: string;
  name: string;
  date: string;
  description: string;
}

const ReviewCard: FC<Props> = ({ avatar, name, date, description }) => {
  return (
    <div className={`flex items-start justify-start flex-col gap-4`}>
      <div className={`flex gap-2`}>
        <Avatar src={avatar} size={64} icon={<UserOutlined />} />
        <div className={``}>
          <h3 className={`text-lg text-dark-blue font-semibold`}>{name}</h3>
          <h4 className={`text-base text-gray font-medium`}>{date}</h4>
        </div>
      </div>
      <p className={`text-dark-gray font-medium`}>
        {description.length > 200
          ? `${description.slice(0, 200)}...`
          : description}
      </p>
    </div>
  );
};

export default ReviewCard;
