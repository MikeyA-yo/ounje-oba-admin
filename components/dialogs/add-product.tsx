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

type DialogPage = "home" | "bulk";

export const AddProductDialog = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const router = useRouter();
  const [page, setPage] = useState<DialogPage>("home");

  const { getRootProps, getInputProps, acceptedFiles } = useDropzone({
    accept: {
      "text/csv": [".csv"],
    },
    onDrop: (acceptedFiles) => {
      console.log(acceptedFiles);
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
                    <Icon icon="hugeicons:tag-02" className="text-2xl" />
                  ) : (
                    <Icon icon="hugeicons:tags" className="text-2xl" />
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
                  <a href="" className="underline text-primary">
                    Download template
                  </a>
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
