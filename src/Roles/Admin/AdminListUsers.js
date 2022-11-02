import React from "react";
import { useSelector } from "react-redux";

import AdminSingleUser from "./AdminSingleUser";

const AdminListUsers = (props) => {
  const { UsersState } = useSelector((state) => state);
  return (
    <div className="admin-list-users container">
      <h4 className="text-center fw-bold text-black my-3">User's</h4>
      {UsersState.users.map((user) => {
        return <AdminSingleUser key={user.id} user={user} />;
      })}
    </div>
  );
};
export default AdminListUsers;
