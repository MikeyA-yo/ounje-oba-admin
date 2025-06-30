

interface Notification {
  id: number;
  title: string;
  description: string;
  timestamp: string;
}

const notifications: Notification[] = [
  {
    id: 1,
    title: "New Order Received — #ORD-24095",
    description: "A new order worth £250 has been placed by Abiola Ogunseye.",
    timestamp: "3 hours ago",
  },
  {
    id: 2,
    title: "Low Stock Warning — Okada Rice (5kg)",
    description: "Only 3 units remaining. Consider restocking soon.",
    timestamp: "12 minutes ago",
  },
  {
    id: 3,
    title: "Order #ORD-24098 Delivered",
    description: "Delivery confirmed by customer Tunde Ajayi.",
    timestamp: "1 hour ago",
  },
  {
    id: 4,
    title: 'Coupon "JUNEDEAL20" is now active',
    description: "20% discount coupon is valid until June 30, 2025.",
    timestamp: "3 hours ago",
  },
  {
    id: 5,
    title: "Payment Failed for Order #ORD-24098",
    description: "Customer Esther Ibe's payment attempt was declined.",
    timestamp: "5 hours ago",
  },
  {
    id: 6,
    title: "New Customer Sign-Up — Joy Umeh",
    description: "Joy Umeh just created an account.",
    timestamp: "3 hours ago",
  },
  {
    id: 7,
    title: "Home Slider Updated Successfully",
    description: 'June Festival Promo" banner is now live on the homepage',
    timestamp: "Yesterday, 6:20 PM",
  },
];

export const Notifications = () => {
  return (
    <div className="w-full max-h-[80vh] overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-grey-200">
        <h1 className="text-xl font-medium text-grey-900 p-6">Notifications</h1>
      </div>

      {/* Notifications List */}
      <div className="pb-6">
        {notifications.map((notification) => (
          <div key={notification.id} className="p-4 border-b border-grey-200">
            <div className="flex gap-3">
              <div className="basis-1/12 w-full text-center text-sm  text-black">
                {notification.id}.
              </div>
              <div className="space-y-2">
                <h3 className="text-xs font-medium text-grey-900">
                  {notification.title}
                </h3>
                <p className="text-sm font-semibold text-black">
                  {notification.description}
                </p>
                <p className="text-xs text-grey-900">
                  {notification.timestamp}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
