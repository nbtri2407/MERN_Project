import React, { useEffect, useState } from "react";
import SummaryApi from "../../common";
import { MdModeEdit } from "react-icons/md";
import moment from "moment";
import { toast } from "react-toastify";
import UpdateUserForm from "../../components/Form/UpdateUserForm";

const AllUsers = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [openUpdateUser, setOpenUpdateUser] = useState(false);
  const [updateUserDetail, setUpdateUserDetail] = useState({
    email: "",
    name: "",
    role: "",
    _id: "",
  });

  const fetchAllUsers = async () => { 
    const dataResponse = await fetch(SummaryApi.allUsers.url, {
      method: "post",
      credentials: "include",
    });

    const dataApi = await dataResponse.json(); 
    if (dataApi.status) {
      setAllUsers(dataApi.data);
    } else {
      toast.error(dataApi.message);
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []); 

  return (
    <div className="w-full h-[calc(100vh-100px)] relative">
      <h1 className="text-3xl font-semibold px-4">All Users</h1>
      <table class="w-full userTable mt-12">
        <thead>
          <tr>
            <th className="">Name</th>
            <th className="">Email</th>
            <th className="">Role</th>
            <th className="">Create At</th>
            <th className="">Action</th>
          </tr>
        </thead>
        <tbody>
          {allUsers.map((user) => {
            return (
              <tr>
                <td className="text-center">{user?.name}</td>
                <td className="text-center">{user?.email}</td>
                <td className="text-center">{user?.role}</td>
                <td className="text-center">
                  {moment(user?.createdAt).format("LL")}
                </td>
                <td className="text-center">
                  <p
                    className="cursor-pointer hover:text-red-500"
                    onClick={() => {
                      setOpenUpdateUser(true);
                      setUpdateUserDetail(user);
                    }}
                  >
                    Edit
                  </p>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {openUpdateUser && (
        <UpdateUserForm
          onClose={() => setOpenUpdateUser(false)}
          name={updateUserDetail.name}
          email={updateUserDetail.email}
          role={updateUserDetail.role}
          userId={updateUserDetail._id}
          callFunc={fetchAllUsers}
        />
      )}
    </div>
  );
};

export default AllUsers;
