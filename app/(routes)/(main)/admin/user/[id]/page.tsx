"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { users } from "@/data/admin-users";
import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";
import { use } from "react";

export default function AdminUserPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: userId } = use(params);
  const user = users.find((u) => u.id.toString() === userId);

  return (
    <>
      {user && (
        <div className="flex flex-col sm:flex-row flex-nowrap justify-between items-center gap-4">
          <h1 className="h5-bold">
            <Link href="/products" className="flex flex-row items-center gap-4">
              <span className="bg-grey rounded-md p-2">
                <Icon icon="hugeicons:arrow-left-02" />
              </span>
              <span>User Profile</span>
            </Link>
          </h1>

          <div className="flex items-center gap-4">
            <Button variant={"outline"} className="border-black text-black">
              <Icon icon={"hugeicons:pencil-edit-02"} />
              <span>Edit</span>
            </Button>
            <Button
              variant={"ghost_error"}
              size={"lg"}
              className="border border-error text-error"
            >
              <Icon icon={"hugeicons:delete-02"} />
            </Button>
          </div>
        </div>
      )}

      <section className="mt-6">
        {user ? (
          <div className="grid [grid-template-columns:auto_65%] gap-6 [&_h2]:body-2-medium">
            <div className="row-span-2 border rounded-md px-4 py-6">
              <h2 className="border-b pb-4">General Information</h2>

              <div className="space-y-4 mt-6 [&_h3]:body-3 [&_h3]:mb-2 [&_p]:body-1-medium">
                <div>
                  <h3>Order ID</h3>
                  <p>{user.fullName}</p>
                </div>
                <div>
                  <h3>Email Address</h3>
                  <p>{user.email}</p>
                </div>
                <div>
                  <h3>Role</h3>
                  <p>
                    {user.role} - {user.permissionLevel}
                  </p>
                </div>
                <div>
                  <h3>Status</h3>
                  {(() => {
                    switch (user.status) {
                      case "Active":
                        return (
                          <Badge variant="success">
                            <p>Active</p>
                          </Badge>
                        );
                      case "Pending":
                        return (
                          <Badge variant="warning">
                            <p>Pending</p>
                          </Badge>
                        );
                      case "Inactive":
                        return (
                          <Badge variant="secondary">
                            <p>Inactive</p>
                          </Badge>
                        );
                    }
                  })()}
                </div>
                <div>
                  <h3>Joined On</h3>
                  <p>Jul 18, 2025 – 09:22 AM</p>
                </div>
                <div>
                  <h3>Last Login</h3>
                  <p>Jul 22, 2025 • 07:11 AM</p>
                </div>
                <div>
                  <h3>IP Address</h3>
                  <p>102.89.44.11</p>
                </div>
                <div>
                  <h3>Device</h3>
                  <p>Chrome on Windows 10</p>
                </div>
              </div>
            </div>

            <div className="border rounded-md">
              <h2 className="px-4 py-6">Permission Section</h2>
              <Table className="[&_tr]:border-none [&_td]:py-3">
                <TableHeader className="bg-grey text-black-500">
                  <TableRow>
                    <TableHead className="pl-4">Feature</TableHead>
                    <TableHead>Access</TableHead>
                    <TableHead>Tooltip</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="[&_td:first-of-type]:pl-4 [&_tr:first-of-type_td]:pt-5">
                  <TableRow>
                    <TableCell>View & Manage Products</TableCell>
                    <TableCell>Yes</TableCell>
                    <TableCell>Can add, edit, and remove products</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Manage Orders</TableCell>
                    <TableCell>Yes</TableCell>
                    <TableCell>
                      Can update order status and assign delivery
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>View Activity Logs</TableCell>
                    <TableCell>Yes</TableCell>
                    <TableCell>
                      Can audit system activities by all users.
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
            <div className="border rounded-md">
              <h2 className="px-4 py-6">Activity Log</h2>

              <Table className="[&_tr]:border-none [&_td]:py-3">
                <TableHeader className="bg-grey text-black-500">
                  <TableRow>
                    <TableHead className="pl-4">Date & Time</TableHead>
                    <TableHead>Action</TableHead>
                    <TableHead>Affected Resources</TableHead>
                    <TableHead>Description</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="[&_td:first-of-type]:pl-4 [&_tr:first-of-type_td]:pt-5">
                  <TableRow>
                    <TableCell>Jul 21, 2025 – 09:03 AM</TableCell>
                    <TableCell>Assigned Order</TableCell>
                    <TableCell>Order #1542 – Ogbono Soup</TableCell>
                    <TableCell>
                      Assigned order to delivery partner: Konga Express.
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Jul 21, 2025 – 09:03 AM</TableCell>
                    <TableCell>Created Product</TableCell>
                    <TableCell>Smoked Catfish (1kg)</TableCell>
                    <TableCell>
                      Added new product with inventory quantity of 75 units.
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Jul 21, 2025 – 09:03 AM</TableCell>
                    <TableCell>Deleted Product</TableCell>
                    <TableCell>Expired Garri – 2kg</TableCell>
                    <TableCell>
                      Removed product from inventory due to expiration report.
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Jul 21, 2025 – 09:03 AM</TableCell>
                    <TableCell>Restocked Product</TableCell>
                    <TableCell>Ogbono – 500g Pack</TableCell>
                    <TableCell>
                      Added 100 units. New total stock: 212.
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>
        ) : (
          <div className="w-fit text-center mx-auto mt-24">
            <p className="body-1-medium">Oops!</p>
            <p className="body-3">User not found</p>
          </div>
        )}
      </section>
    </>
  );
}
