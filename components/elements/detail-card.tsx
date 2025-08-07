import { cn } from "@/lib/utils";
import { Icon } from "@iconify/react";

export const DetailCard = ({
  title,
  details,
  icon,
  iconColor,
  bgColor,
  children = null,
}: {
  title: string;
  details: string;
  icon: string;
  iconColor: string;
  bgColor: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "p-6 space-y-8 rounded-lg w-full md:w-auto md:flex-1",
        children ? "h-44" : "h-36",
      )}
      style={{ backgroundColor: bgColor }}
    >
      <div className="flex flex-row gap-2 items-center text-lg">
        <div className="bg-white rounded-md p-2">
          <Icon icon={icon} style={{ color: iconColor }} />
        </div>
        <h2 className="text-nowrap">{title}</h2>
      </div>
      <div className="space-y-4">
        <p className="h5-semibold">{details}</p>
        <div className="body-3">{children}</div>
      </div>
    </div>
  );
};
