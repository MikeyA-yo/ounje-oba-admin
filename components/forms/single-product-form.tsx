"use client";

import { singleProductSchema } from "@/schema/single-product";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod/v4";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Button } from "../ui/button";
import { useState } from "react";
import { Icon } from "@iconify/react";
import AddVariationForm from "./add-variation-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createProduct, getCategories } from "@/app/admin/products/actions";
import { ProductCategory } from "@/types/product";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export default function SingleProductForm() {
  const [showVariationForm, setShowVariationForm] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);

  const form = useForm<z.infer<typeof singleProductSchema>>({
    resolver: zodResolver(singleProductSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      category_id: "",
      sku: "",
      stock_quantity: "",
      low_stock_alert: "",
      price: "",
      description: "",
      specification: "",
      image_files: undefined,
    },
  });
  const showAddVariationBtn = form.watch("variation") === "yes";

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const data = await getCategories();
      return data as ProductCategory[];
    },
  });

  const mutation = useMutation({
    mutationFn: async () => {
      const formdata = new FormData();

      // Append all form fields
      Object.entries(form.getValues()).forEach(([key, value]) => {
        if (key === "image_files" && value instanceof FileList) {
          for (let i = 0; i < value.length; i++) {
            formdata.append(key, value[i]);
          }
        } else if (Array.isArray(value)) {
          // Handle array values if any (though currently image_files is the main one)
          // If image_files is an array of Files from Dropzone (not FileList)
          value.forEach(v => formdata.append(key, v));
        } else if (value !== undefined && value !== null) {
          formdata.append(key, value.toString());
        }
      });

      // Specifically handle the files state from Dropzone if it's not in the form values correctly
      // The current code puts DataTransfer.files into "image_files", which is a FileList.
      // But standard react-hook-form + dropzone might be managing it differently.
      // Let's ensure we are appending files correctly.

      // Re-appending to be safe if `form.getValues` didn't catch them seamlessly or if we want to rely on the `files` state
      // clear previous image_files to avoid duplicates if we re-add
      formdata.delete("image_files");
      files.forEach((file) => {
        formdata.append("image_files", file);
      });

      return await createProduct(formdata);
    },
    onSuccess: () => {
      toast.success("Product created successfully");
      form.reset();
      setFiles([]);
      setPreviews([]);
    },
    onError: (error) => {
      toast.error(error.message || "Failed to create product");
    },
  });

  const onDrop = (acceptedFiles: File[]) => {
    const dataTransfer = new DataTransfer();
    acceptedFiles.forEach((file) => {
      dataTransfer.items.add(file);
    });
    form.setValue("image_files", dataTransfer.files);

    const urls = acceptedFiles.map((file) => URL.createObjectURL(file));
    setPreviews((prevImages) => [...prevImages, ...urls]);
    setFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
  };

  const onDelete = (image: string, index: number) => {
    URL.revokeObjectURL(image);
    setPreviews(previews.filter((_, i) => i !== index));
    setFiles(files.filter((_, i) => i !== index));

    const dataTransfer = new DataTransfer();
    files.forEach((file) => {
      dataTransfer.items.add(file);
    });
    form.setValue("image_files", dataTransfer.files);
  };

  const {
    getRootProps,
    getInputProps,
    open: openImageUpload,
    isDragAccept,
  } = useDropzone({
    onDrop,
    noClick: true,
    multiple: true,
    accept: { "image/*": [".png", ".gif", ".jpeg", ".jpg"] },
    maxSize: 5 * 1024 * 1024,
  });

  function onSubmit() {
    // console.log(form.getValues());
    mutation.mutate();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="border border-grey-200 rounded-lg py-4">
          <div>
            <div className="bg-grey text-black-500 px-4 py-2">
              <h2 className="font-semibold text-xl">Product Details</h2>
            </div>
            <div className="px-4 py-6 space-y-4">
              <FormField
                name="name"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Name</FormLabel>
                    <Input
                      placeholder="Smoked Catfish (4pcs Pack)"
                      {...field}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="category_id"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories &&
                          categories.map(({ id, name }) => (
                            <SelectItem key={id} value={id}>
                              {name}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="sku"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>SKU</FormLabel>
                    <Input placeholder="SMO CATFISH 4PCS-1" {...field} />
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex flex-col md:flex-row gap-4 w-full">
                <FormField
                  name="stock_quantity"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Stock Quantity</FormLabel>
                      <Input type="number" placeholder="200" {...field} />
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  name="low_stock_alert"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Low Stock Alert</FormLabel>
                      <Input type="number" placeholder="200" {...field} />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                name="price"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Cost</FormLabel>
                    <Input placeholder="100" {...field} />
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="description"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <Textarea
                      placeholder="Type Something..."
                      rows={4}
                      {...field}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="specification"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Specification</FormLabel>
                    <Textarea
                      placeholder="Type Something..."
                      rows={4}
                      {...field}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div>
            <div className="bg-grey text-black-500 px-4 py-2">
              <h2 className="font-semibold text-xl">Product Images</h2>
            </div>
            <div className="px-4 py-6 space-y-4">
              <FormField
                name="image_files"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Add Image</FormLabel>
                    <FormDescription>
                      <span>Add at least 1 image for this product</span>
                      <br />
                      <span className="text-sm">
                        First image - is the title image.{" "}
                        {/* You can change the
                        order of images: just grab your image and drag */}
                      </span>
                    </FormDescription>
                    <div
                      {...getRootProps()}
                      className={cn(
                        isDragAccept &&
                        "border border-dashed border-primary rounded-lg",
                      )}
                    >
                      <FormControl>
                        <input {...getInputProps()} name={field.name} />
                      </FormControl>
                      <div className="flex items-center gap-2">
                        {previews.length > 0 &&
                          previews.map((image, index) => (
                            <div
                              key={index}
                              className="relative size-12 [&>button]:hover:flex"
                              onClick={() => onDelete(image, index)}
                            >
                              <>
                                <Image
                                  src={image}
                                  alt=""
                                  fill
                                  className="w-auto h-auto rounded-lg"
                                />
                                <button
                                  type="button"
                                  className="absolute hidden w-full h-full items-center justify-center bg-black/50 rounded-lg"
                                >
                                  <Icon
                                    icon="hugeicons:delete-02"
                                    className="text-[#fff]"
                                  />
                                </button>
                              </>
                            </div>
                          ))}

                        <Button
                          variant={"outline"}
                          type="button"
                          onClick={openImageUpload}
                          className="border border-primary border-dashed rounded-lg bg-[#FBF3FF] text-primary hover:border-none hover:text-white size-12"
                        >
                          <Icon icon="hugeicons:add-01" className="text-4xl" />
                          <span className="sr-only">Add image</span>
                        </Button>
                      </div>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div>
            <div className="bg-grey text-black-500 px-4 py-2">
              <h2 className="font-semibold text-xl">Product Options</h2>
            </div>
            <div className="px-4 py-6 space-y-4">
              <FormField
                name="variation"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <div>
                      <FormLabel>Variation</FormLabel>
                      <FormDescription>
                        Does this product come in different sizes, weights, or
                        packaging options to suit customer needs or inventory
                        plans?
                      </FormDescription>
                    </div>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col"
                      >
                        <FormItem className="space-y-0 flex items-center gap-3">
                          <FormControl>
                            <RadioGroupItem value="yes" />
                          </FormControl>
                          <FormLabel>Yes</FormLabel>
                        </FormItem>
                        <FormItem className="space-y-0 flex items-center gap-3">
                          <FormControl>
                            <RadioGroupItem value="no" />
                          </FormControl>
                          <FormLabel>No</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {showAddVariationBtn && (
                <Button
                  type="button"
                  variant="ghost"
                  className="flex items-center gap-2"
                  onClick={() => setShowVariationForm(true)}
                >
                  Add Variation
                  <Icon icon="hugeicons:add-01" />
                </Button>
              )}

              <FormField
                name="loyalty"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <div>
                      <FormLabel>Loyalty Points</FormLabel>
                      <FormDescription>
                        Is this product eligible for loyalty rewards, points, or
                        exclusive benefits for returning customers?
                      </FormDescription>
                    </div>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col"
                      >
                        <FormItem className="space-y-0 flex items-center gap-3">
                          <FormControl>
                            <RadioGroupItem value="yes" />
                          </FormControl>
                          <FormLabel>Yes</FormLabel>
                        </FormItem>
                        <FormItem className="space-y-0 flex items-center gap-3">
                          <FormControl>
                            <RadioGroupItem value="no" />
                          </FormControl>
                          <FormLabel>No</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>

        <Button
          type="submit"
          className="w-full mt-8"
          disabled={!form.formState.isValid || mutation.isPending}
        >
          {mutation.isPending ? (
            <div className="flex items-center gap-2">
              <Icon icon="hugeicons:loading-03" className="animate-spin" />
              Adding Product...
            </div>
          ) : (
            "Add Product"
          )}
        </Button>
      </form>

      <AddVariationForm
        openForm={showVariationForm}
        onOpenForm={setShowVariationForm}
      />
    </Form>
  );
}
