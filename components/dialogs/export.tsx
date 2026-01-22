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
import { exportDashboardData } from "@/app/admin/export/actions";
import { useState } from "react";
import { Icon } from "@iconify/react";

export const ExportDialog = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(false);
  const exports = [
    "Summary",
    "Top Selling Products",
    "Top Customers",
    "Revenue Trend",
    "Orders Trend",
    "Product Summary",
    "Recent Orders",
  ];

  const handleExport = async () => {
    try {
      setLoading(true);
      const data = await exportDashboardData();

      const jsonString = JSON.stringify(data, null, 2);
      const blob = new Blob([jsonString], { type: "application/json" });
      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = `dashboard-export-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Export failed:", error);
      alert("Failed to export data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

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
              <Checkbox id={exp} defaultChecked />
              <span>{exp}</span>
            </Label>
          ))}
        </div>
        <Button
          className="mt-8 w-full"
          onClick={handleExport}
          disabled={loading}
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <Icon icon="hugeicons:loading-03" className="animate-spin" />
              Exporting...
            </span>
          ) : (
            "Export"
          )}
        </Button>
      </DialogContent>
    </Dialog>
  );
};
