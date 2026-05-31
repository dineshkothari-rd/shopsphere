import { useEffect, useState } from "react";

import {
  subscribeToUsers,
  updateUserRole,
} from "@/features/auth/services/user.service";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ROLES } from "@/constants/roles";
import { toast } from "sonner";

const AdminUsersPage = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const unsubscribe = subscribeToUsers((data) => {
      setUsers(data);
    });

    return () => unsubscribe();
  }, []);

  const handleRoleChange = async (userId, role) => {
    try {
      await updateUserRole(userId, role);

      toast.success("Role updated successfully");
    } catch (error) {
      console.log(error);

      toast.error("Failed to update role");
    }
  };

  return (
    <div className="space-y-6 p-4 sm:p-6 lg:p-8">
      <div>
        <h1 className="page-title">
          Users Management
        </h1>

        <p className="text-muted-foreground">Manage users and permissions</p>
      </div>
      <div className="space-y-4 lg:hidden">
        {users.map((user) => (
          <div
            key={user.id}
            className="soft-card p-5"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-lg font-black text-primary">
                  {user.name?.charAt(0)?.toUpperCase() || "U"}
                </div>

                <div>
                  <h2 className="font-bold">{user.name || "No Name"}</h2>

                  <p className="text-sm text-muted-foreground break-all">
                    {user.email}
                  </p>
                </div>
              </div>

              <span className="rounded-full bg-primary/10 capitalize px-3 py-1 text-xs font-medium text-primary">
                {user.role}
              </span>
            </div>

            <div className="mt-5 flex items-center justify-between gap-4">
              <p className="text-sm text-muted-foreground">Change Role</p>

              <Select
                value={user.role}
                onValueChange={async (value) => {
                  await handleRoleChange(user.id, value);
                }}
              >
                <SelectTrigger className="h-12 min-h-12 rounded-xl border-border/70 bg-background/70">
                  <SelectValue />
                </SelectTrigger>

                <SelectContent position="popper">
                  <SelectItem value={ROLES.CUSTOMER}>Customer</SelectItem>

                  <SelectItem value={ROLES.ADMIN}>Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        ))}
      </div>
      <div className="hidden overflow-x-auto rounded-2xl border border-border/70 bg-card lg:block">
        <table className="min-w-[700px] w-full">
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
                  <span className="rounded-full bg-secondary capitalize px-3 py-1 text-xs">
                    {user.role}
                  </span>
                </td>

                <td className="px-6 py-4">
                  <Select
                    value={user.role}
                    onValueChange={async (value) => {
                      await handleRoleChange(user.id, value);
                    }}
                  >
                    <SelectTrigger className="h-11 min-h-11 w-full min-w-[140px] rounded-xl border-border/70 bg-background/70">
                      <SelectValue />
                    </SelectTrigger>

                    <SelectContent position="popper">
                      <SelectItem value={ROLES.CUSTOMER}>Customer</SelectItem>

                      <SelectItem value={ROLES.ADMIN}>Admin</SelectItem>
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
