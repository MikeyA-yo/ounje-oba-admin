

"use client";

import { useQuery } from "@tanstack/react-query";
import { getNotifications } from "@/app/admin/notifications/actions";
import { formatDistanceToNow } from "date-fns";
import { Skeleton } from "../ui/skeleton";

interface Notification {
  id: number;
  title: string;
  description: string;
  created_at: string;
  is_read: boolean;
}

export const Notifications = () => {
  const { data: notifications, isLoading } = useQuery({
    queryKey: ["notifications"],
    queryFn: async () => await getNotifications(),
  });

  return (
    <div className="w-full max-h-[80vh] overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-grey-200">
        <h1 className="text-xl font-medium text-grey-900 p-6">Notifications</h1>
      </div>

      {/* Notifications List */}
      <div className="pb-6">
        {isLoading ? (
          <div className="p-4 space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex gap-3">
                <Skeleton className="size-8 rounded-full" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-3 w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : notifications?.length === 0 ? (
          <div className="p-6 text-center text-grey-500">
            <p>No new notifications</p>
          </div>
        ) : (
          notifications?.map((notification: Notification, index: number) => (
            <div key={notification.id} className="p-4 border-b border-grey-200">
              <div className="flex gap-3">
                <div className="basis-1/12 w-full text-center text-sm text-black">
                  {index + 1}.
                </div>
                <div className="space-y-2">
                  <h3 className="text-xs font-medium text-grey-900">
                    {notification.title}
                  </h3>
                  <p className="text-sm font-semibold text-black">
                    {notification.description}
                  </p>
                  <p className="text-xs text-grey-900">
                    {formatDistanceToNow(new Date(notification.created_at), { addSuffix: true })}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
