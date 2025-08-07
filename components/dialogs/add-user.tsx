"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { z } from "zod/v4";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export default function AddUserDialog({
  children,
}: {
  children: React.ReactNode;
}) {
  const [error, setError] = useState("");

  function validateEmail(value: string) {
    const isValid = z.email().safeParse(value);

    isValid.success ? setError("") : setError("Invalid email address");
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add User</DialogTitle>
          <DialogDescription className="sr-only">Add a user</DialogDescription>
        </DialogHeader>

        <div className="space-y-1">
          <Label htmlFor="userEmail">Email</Label>
          <div className="flex items-center gap-2 w-full">
            <div className="relative flex-1">
              <Input
                id="userEmail"
                type="email"
                name="userEmail"
                className="w-full"
                onChange={(e) => validateEmail(e.target.value)}
              />
              <div className="absolute w-24 right-0 top-0">
                <Select defaultValue="admin">
                  <SelectTrigger className="body-3 border-none">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="body-3">
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button size={"md"} disabled={!!error} className="px-6">
              Add
            </Button>
          </div>
          <p className="text-error">{error}</p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
