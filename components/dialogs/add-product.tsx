import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Icon } from "@iconify/react";
import { useDropzone } from "react-dropzone";
import { useRouter } from "next/navigation";
import { useMutation, useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import { downloadTemplate, productsBulkUpload } from "@/lib/routes";

type DialogPage = "home" | "bulk";

export const AddProductDialog = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const router = useRouter();
  const { data } = useQuery({
    queryKey: ["download_template"],
    queryFn: async () => {
      const response = await api.get(downloadTemplate, {
        responseType: "blob",
      });

      return new Blob([response.data], { type: "text/csv" });
    },
  });

  /* 
  curl -X POST "http://localhost:8000/api/admin/products/bulk_upload/" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -F "file=@products.csv" \
  -F "update_existing=true"

  as a tanstack query mutation
   */
  const [file, setFile] = useState<File | null>(null);

  const { mutateAsync: uploadBulkProducts } = useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("update_existing", "true"); // or false, based on your logic

      const response = await api.post(productsBulkUpload, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    },
    onSuccess: () => {
      // Handle success, e.g., show a toast, refetch products
      console.log(file);
      console.log("Bulk upload successful!");
    },
    onError: (error) => {
      // Handle error, e.g., show an error message
      console.error("Bulk upload failed:", error);
    },
  });

  const [page, setPage] = useState<DialogPage>("home");

  const { getRootProps, getInputProps, acceptedFiles } = useDropzone({
    accept: {
      "text/csv": [".csv"],
    },
    maxFiles: 1,
    maxSize: 18000000,
    onDrop: (acceptedFiles) => {
      // upload the file using the mutation
      setFile(acceptedFiles[0]);
      uploadBulkProducts(acceptedFiles[0]);
    },
  });

  function resetPage() {
    setPage("home");
  }

  function handlePageChange(option: number) {
    if (option === 0) {
      router.push("/products/upload");
    } else if (option === 1) {
      setPage("bulk");
    }
  }

  function renderPage() {
    switch (page) {
      case "home":
        return (
          <div className="flex flex-col md:flex-row gap-6">
            {["Single Product Upload", "Bulk Product Upload"].map(
              (title, index) => (
                <Button
                  variant={"outline"}
                  key={index}
                  className="flex flex-col gap-4 text-primary bg-[#F8F5F9] border-primary-100 font-semibold py-12 sm:px-10 sm:py-16 md:px-20 md:py-32 rounded-2xl"
                  onClick={() => handlePageChange(index)}
                >
                  {index === 0 ? (
                    <Icon icon="hugeicons:tag-02" fontSize={"24px"} />
                  ) : (
                    <Icon icon="hugeicons:tags" fontSize={"24px"} />
                  )}
                  <span className="text-lg">{title}</span>
                </Button>
              ),
            )}
          </div>
        );
        break;
      case "bulk":
        return (
          <div>
            <div
              {...getRootProps()}
              className="border border-dashed border-grey-700 bg-grey rounded-lg py-12 px-40"
            >
              <input {...getInputProps()} />
              <div className="font-semibold text-grey-900 text-center space-y-2">
                <Icon
                  icon="hugeicons:cloud-upload"
                  className="text-2xl mx-auto"
                />
                <p className="text-lg">
                  Upload CSV file here, or click to browse
                </p>
                <p className="font-normal">Max file size: 18 mb</p>
              </div>
            </div>
            <div className="mt-6">
              <h3 className="text-lg font-medium">Requirements</h3>
              <ul className="list-disc space-y-2 mt-4 ml-4">
                <li>
                  Download the sample template{" "}
                  <Button
                    variant={"ghost"}
                    className="p-0 hover:bg-inherit inline underline focus-within:bg-inherit focus-within:ring-0"
                    onClick={() => {
                      if (data) {
                        const url = window.URL.createObjectURL(data);
                        const link = document.createElement("a");
                        link.href = url;
                        link.download = "sample_template.csv"; // default filename
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                        window.URL.revokeObjectURL(url);
                      }
                    }}
                  >
                    Download template
                  </Button>
                </li>
                <li>Max 2,000 rows per upload</li>
                <li>
                  Supported file types:{" "}
                  <span className="text-primary">csv</span>
                </li>
              </ul>
            </div>
            <Button
              disabled={acceptedFiles.length === 0}
              className="w-full mt-12"
            >
              Upload Product
            </Button>
          </div>
        );
    }
  }

  return (
    <Dialog onOpenChange={resetPage}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {page === "home" ? "Add Product" : "Bulk Product Upload"}
          </DialogTitle>
        </DialogHeader>

        <div>{renderPage()}</div>
      </DialogContent>
    </Dialog>
  );
};
