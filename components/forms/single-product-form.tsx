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
import { useRef, useState } from "react";
import { Icon } from "@iconify/react";

export const SingleProductForm = () => {
  const [images, setImages] = useState<FileList>();
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const form = useForm<z.infer<typeof singleProductSchema>>({
    resolver: zodResolver(singleProductSchema),
    mode: "onChange",
    defaultValues: {
      productName: "",
      category: "",
      sku: "",
      stockQty: "",
      lowStock: "",
      cost: "",
      description: "",
      specification: "",
    },
  });

  function handleImageUpload(files: FileList) {}

  function onSubmit() {}

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
                name="productName"
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
                name="category"
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
                        <SelectItem value="hello">Hello</SelectItem>
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
                  name="stockQty"
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
                  name="lowStock"
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
                name="cost"
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
                name="images"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Add Image</FormLabel>
                    <FormDescription>
                      <span>Add at least 1 image for this product</span>
                      <br />
                      <span className="text-sm">
                        First image - is the title image. You can change the
                        order of images: just grab your image and drag
                      </span>
                    </FormDescription>
                    <FormControl>
                      <div className="mt-2 w-fit">
                        <input
                          ref={fileInputRef}
                          id="images"
                          type="file"
                          accept="image/*"
                          multiple={true}
                          onChange={(e) => {
                            if (e.target.files && e.target.files.length > 0) {
                              setImages(e.target.files);
                            }
                          }}
                          className="w-0 h-0"
                        />

                        <Button
                          variant={"outline"}
                          type="button"
                          onClick={() => {
                            fileInputRef.current?.click();
                          }}
                          className="border border-primary border-dashed rounded-lg bg-[#FBF3FF] text-primary hover:border-none hover:text-white size-12"
                        >
                          <Icon icon="hugeicons:add-01" className="text-4xl" />
                          <span className="sr-only">Add image</span>
                        </Button>
                      </div>
                    </FormControl>
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
          disabled={!form.formState.isValid}
        >
          Add Product
        </Button>
      </form>
    </Form>
  );
};
