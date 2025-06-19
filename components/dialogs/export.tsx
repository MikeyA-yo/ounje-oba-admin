import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";

export const ExportDialog = ({ children }: { children: React.ReactNode }) => {
  const exports = [
    "Summary",
    "Top Selling Products",
    "Top Customers",
    "Revenue Trend",
    "Orders Trend",
    "Product Summary",
    "Recent Orders",
  ];

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Export</DialogTitle>
          <DialogDescription className="sr-only">
            Export Dashboard
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          {exports.map((exp, i) => (
            <Label
              key={i}
              htmlFor={exp}
              className="flex flex-row gap-3 font-normal items-center text-base"
            >
              <Checkbox id={exp} />
              <span>{exp}</span>
            </Label>
          ))}
        </div>
        <Button disabled className="mt-8">
          Export
        </Button>
      </DialogContent>
    </Dialog>
  );
};
