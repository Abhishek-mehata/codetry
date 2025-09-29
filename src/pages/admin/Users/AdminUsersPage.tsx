import { useEffect, useState } from "react";
import { Table, TableColumnsType, Input } from "antd";
import { FC } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/useTypedSelectors";
import { RootAppState } from "../../../redux/store";
import { AllUsers } from "../../../redux/actions/user";
import dayjs from "dayjs";
import "../../../index.css"

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string | null;
  country: string | null;
  profilePicture: string | null;
  createdAt: string;
}

const AdminUsersPage: FC = () => {
  const dispatch = useAppDispatch();

  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    dispatch(AllUsers());
  }, [dispatch]);

  const { users } = useAppSelector((state: RootAppState) => state.users);

  const filteredUsers: User[] = users?.filter((user) => {
    const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
    return (
      fullName.includes(searchText.toLowerCase()) ||
      user.email.toLowerCase().includes(searchText.toLowerCase())
    );
  });

  const columns: TableColumnsType<User> = [
    {
      title: "Name",
      render: (_, record) => `${record.firstName} ${record.lastName}`,
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
      render: (phone: string | null) => phone || "N/A",
    },
    {
      title: "Country",
      dataIndex: "country",
      render: (country: string | null) => country || "N/A",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      render: (date: string) => dayjs(date).format("MMMM D, YYYY"),
    },
  ];

  return (
    <div>
      <div className="flex items-center justify-between w-full mb-5">
        <h1 className="text-2xl font-semibold text-dark-blue">
          {`${filteredUsers?.length || 0} Users`}
        </h1>
        <Input
          placeholder="Search by name or email"
          className="max-w-[250px] border border-primary shadow-md popins text-base"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          allowClear
        />
      </div>
      <Table columns={columns} dataSource={filteredUsers} rowKey="id" />
    </div>
  );
};

export default AdminUsersPage;
