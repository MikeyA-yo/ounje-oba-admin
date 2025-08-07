"use client";

import { data } from "@/data/routes";
import { usePathname } from "next/navigation";
import { Icon } from "@iconify/react";
import { Button } from "../ui/button";
import { ExportDialog } from "../dialogs/export";
import { AddProductDialog } from "../dialogs/add-product";
import { AddCouponDialog } from "../dialogs/add-coupon";
import AddUserDialog from "../dialogs/add-user";
import Link from "next/link";

export const SectionHeader = () => {
  const route = usePathname();

  return (
    <>
      {!route.startsWith("/admin/user") && (
        <div className="flex flex-col sm:flex-row flex-nowrap justify-between items-center gap-4">
          <h1 className="h5-bold">
            {route === "/admin" ? (
              <span>Admin Management</span>
            ) : (
              <span>{data.find((item) => item.url === route)?.name}</span>
            )}
          </h1>

          <div className="flex flex-row flex-nowrap gap-2 items-center w-full sm:w-auto">
            {route === "/products" && (
              <AddProductDialog>
                <Button variant={"primary"} className="w-full">
                  <Icon icon="hugeicons:plus-sign" />
                  <span>Add Product</span>
                </Button>
              </AddProductDialog>
            )}

            {route === "/coupons" && (
              <AddCouponDialog>
                <Button variant={"primary"} className="w-full">
                  <Icon icon="hugeicons:plus-sign" />
                  <span>Add New Coupon</span>
                </Button>
              </AddCouponDialog>
            )}

            {route === "/admin" ? (
              <AddUserDialog>
                <Button>
                  <Icon icon={"hugeicons:plus-sign"} />
                  <span>Add User</span>
                </Button>
              </AddUserDialog>
            ) : (
              <ExportDialog>
                <Button
                  variant={"outline"}
                  className="flex flex-row flex-nowrap items-center gap-2 w-full"
                >
                  <Icon icon="hugeicons:download-04" />
                  <span>Export</span>
                  <Icon icon="hugeicons:arrow-down-01" />
                </Button>
              </ExportDialog>
            )}
          </div>
        </div>
      )}
    </>
  );
};
