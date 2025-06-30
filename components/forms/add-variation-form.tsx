import {
  FormProvider,
  useFieldArray,
  useForm,
  useFormContext,
} from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { variationSchema } from "@/schema/single-product";
import { z } from "zod/v4";
import { Button } from "../ui/button";
import { Icon } from "@iconify/react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { useEffect, useState } from "react";

export default function AddVariationForm({
  openForm,
  onOpenForm,
}: {
  openForm: boolean;
  onOpenForm: (open: boolean) => void;
}) {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [nFilled, setNFilled] = useState(0);

  const form = useForm<z.infer<typeof variationSchema>>({
    resolver: zodResolver(variationSchema),
    mode: "onChange",
    defaultValues: {
      variations: [{ variationType: "" }],
    },
  });

  const fieldArray = useFieldArray({
    control: form.control,
    name: "variations" as const,
  });

  function handleSubmit() {
    console.log(form.getValues());
    onOpenForm(false);
  }

  return (
    <Dialog open={openForm} onOpenChange={onOpenForm}>
      <DialogContent
        showClose={false}
        className="max-h-[90dvh] overflow-y-auto"
      >
        <DialogHeader>
          <DialogTitle>Add Variations</DialogTitle>
          <DialogDescription className="sr-only">
            Form to set product variations
          </DialogDescription>
        </DialogHeader>
        <FormProvider {...form}>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-4"
            >
              {
                // form.getValues("variations").length > 1 &&
                fieldArray.fields.slice(0, nFilled).map((field, index) => {
                  if (editingIndex === index) {
                    return (
                      <div key={field.id}>
                        <FormField
                          name={`variations.${index}.variationType`}
                          control={form.control}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Option Type</FormLabel>
                              <Input {...field} placeholder="Size, Color" />
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <VariationFields index={index} />

                        <Button
                          type="button"
                          className="mt-2"
                          onClick={() => {
                            if (
                              !form.getFieldState(
                                `variations.${index}.variationType`,
                              ).invalid &&
                              !form.getFieldState(
                                `variations.${index}.variationValues`,
                              ).invalid
                            ) {
                              setEditingIndex(null);
                            } else {
                              form.trigger(`variations.${index}.variationType`);
                              form.trigger(
                                `variations.${index}.variationValues`,
                              );
                            }
                          }}
                        >
                          Save Changes
                        </Button>
                      </div>
                    );
                  }

                  return (
                    <div key={field.id} className="space-y-4">
                      <h3 className="text-sm">
                        {form.getValues(`variations.${index}.variationType`)}
                      </h3>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2 text-black-500 font-bold">
                          {form.getValues(
                            `variations.${index}.variationValues`,
                          ) &&
                            form
                              .getValues(`variations.${index}.variationValues`)
                              .map((value, i) => (
                                <div
                                  key={i}
                                  className="px-4 py-2 bg-grey-100 rounded-md"
                                >
                                  {value}
                                </div>
                              ))}
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            type="button"
                            variant="outline"
                            className="text-xs"
                            onClick={() => setEditingIndex(index)}
                          >
                            Edit
                          </Button>
                          <Button
                            type="button"
                            variant="ghost"
                            className="bg-grey-100 text-grey-900"
                            onClick={() => {
                              fieldArray.remove(index);
                              setNFilled(nFilled - 1);
                            }}
                          >
                            <Icon icon="hugeicons:delete-02" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  );
                })
              }

              {fieldArray.fields.length > 0 &&
                fieldArray.fields.length > nFilled &&
                (() => {
                  const index = fieldArray.fields.length - 1;
                  const field = fieldArray.fields[index];

                  return (
                    <div key={field.id}>
                      <FormField
                        name={`variations.${index}.variationType`}
                        control={form.control}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Option Type</FormLabel>
                            <Input {...field} placeholder="Size, Color" />
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <VariationFields index={index} />

                      <Button
                        disabled={!form.formState.isValid}
                        className="mt-2"
                        onClick={() => {
                          setNFilled(nFilled + 1);
                        }}
                      >
                        Save Variation
                      </Button>
                    </div>
                  );
                })()}

              <div className="w-full">
                <Button
                  type="button"
                  variant="ghost"
                  className="flex items-center gap-2 mx-auto"
                  disabled={!form.formState.isValid}
                  onClick={() => {
                    if (fieldArray.fields.length > nFilled) {
                      setNFilled(nFilled + 1);
                    }

                    fieldArray.append({
                      variationType: "",
                      variationValues: [""],
                    });
                  }}
                >
                  <Icon icon="hugeicons:add-circle" />
                  Add new option
                </Button>
              </div>

              <DialogFooter className="mt-4 space-x-8">
                <DialogClose asChild>
                  <Button
                    type="reset"
                    variant="ghost"
                    onClick={() => {
                      form.resetField("variations");
                      setNFilled(0);
                    }}
                  >
                    Cancel
                  </Button>
                </DialogClose>
                <Button
                  disabled={!form.formState.isValid}
                  type="submit"
                  className="px-8"
                >
                  Save
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}

function VariationFields({ index }: { index: number }) {
  const {
    control,
    getFieldState,
  } = useFormContext();

  const valuesArray = useFieldArray({
    control: control,
    name: `variations.${index}.variationValues` as const,
  });

  useEffect(() => {
    if (valuesArray.fields.length === 0) {
      valuesArray.append("");
    }
  });

  return (
    <div className="mt-6">
      <FormLabel asChild>
        <p className="mb-2">Option Value</p>
      </FormLabel>
      <div className="space-y-4">
        {valuesArray.fields.map((fields, i) => (
          <FormField
            key={fields.id}
            name={`variations.${index}.variationValues.${i}`}
            control={control}
            render={({ field }) => (
              <FormItem>
                <div className="relative">
                  <FormControl>
                    <Input placeholder="XL, Red" {...field} />
                  </FormControl>
                  {i !== 0 && (
                    <Button
                      type="button"
                      variant="ghost"
                      className="absolute top-1/2 right-4 -translate-y-1/2 p-1"
                      onClick={() => valuesArray.remove(i)}
                    >
                      <Icon icon="hugeicons:multiplication-sign" />
                    </Button>
                  )}
                </div>

                <FormMessage />
              </FormItem>
            )}
          />
        ))}
      </div>

      <Button
        variant="ghost"
        disabled={
          getFieldState(`variations.${index}.variationValues`).isTouched
            ? getFieldState(`variations.${index}.variationValues`).invalid
            : true
        }
        className="flex items-center gap-2 mt-4"
        onClick={() => valuesArray.append("")}
      >
        <Icon icon="hugeicons:add-01" />
        Add More Values
      </Button>
      <FormMessage />
    </div>
  );
}
