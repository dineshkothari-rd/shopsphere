import { useEffect, useState } from "react";

import { getAllUsers, updateUserRole } from "@/services/firebase/userMethods";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const AdminUsersPage = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const data = await getAllUsers();

      queueMicrotask(() => {
        setUsers(data);
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleRoleChange = async (userId, role) => {
    try {
      await updateUserRole(userId, role);

      fetchUsers();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="space-y-8 p-8">
      <div>
        <h1 className="text-4xl font-bold">Users Management</h1>

        <p className="text-muted-foreground">Manage users and permissions</p>
      </div>

      <div className="overflow-hidden rounded-3xl border bg-card">
        <table className="w-full">
          <thead className="border-b bg-muted/50">
            <tr>
              <th className="px-6 py-4 text-left">User</th>

              <th className="px-6 py-4 text-left">Role</th>

              <th className="px-6 py-4 text-left">Change Role</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b">
                <td className="px-6 py-4">
                  <div>
                    <p className="font-medium">{user.name || "No Name"}</p>

                    <p className="text-sm text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </td>

                <td className="px-6 py-4">
                  <span className="rounded-full bg-secondary px-3 py-1 text-xs">
                    {user.role}
                  </span>
                </td>

                <td className="px-6 py-4">
                  <Select
                    value={user.role}
                    onValueChange={(value) => handleRoleChange(user.id, value)}
                  >
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectItem value="customer">Customer</SelectItem>

                      <SelectItem value="admin">Admin</SelectItem>
                    </SelectContent>
                  </Select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminUsersPage;
