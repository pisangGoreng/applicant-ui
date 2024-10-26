"use client";

import React, { useEffect, useState } from "react";
import { Upload } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectContent,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  ApplicantRoleAndStatusType,
  useCreateNewApplicantMutation,
  useGetApplicantsRoleQuery,
} from "@/state/applicant";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query/react";

const formSchema = z.object({
  name: z.string().min(4),
  email: z.string().email(),
  yoe: z
    .string()
    .regex(/^\d+$/, { message: "Years of experience must be greater than 1." }),
  phoneNumber: z.string().regex(/^(\+?\d{1,3}[-.\s]?)?(\d{10,15})$/, {
    message: "Invalid phone number format",
  }),
  applicantRole: z
    .string({ message: "Please select an applicant role." })
    .nonempty("Please select an applicant role."),
  location: z.string().min(4),
  resumeLink: z.string().min(4),
});

const AddApplicantForm = () => {
  const { data: applicantsRole } = useGetApplicantsRoleQuery({});
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      // name: "endy",
      // email: "7ofpentacles@gmail.com",
      // yoe: "2",
      // phoneNumber: "081310338777",
      // applicantRole: "Frontend Engineer",
      // location: "indo",
      // resumeLink: "asdasdasdas",

      name: "",
      email: "",
      yoe: "",
      phoneNumber: "",
      applicantRole: "",
      location: "",
      resumeLink: "",
    },
  });

  const [createApplicant, { isLoading, isError, isSuccess, error }] =
    useCreateNewApplicantMutation();

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    console.log("Form Submitted", data);
    if (Array.isArray(applicantsRole)) {
      const { id: selectedApplicantRole } = applicantsRole.find(
        (role) => role.description === data.applicantRole
      );
      console.log("🚀 ~ onSubmit ~ cb:", selectedApplicantRole);

      const response = await createApplicant({
        ...data,
        yoe: Number(data.yoe),
        applicantRole: Number(selectedApplicantRole),
      }).unwrap();

      console.log("🚀 ~ sucess ~ response:", response);

      setOpen(false);
    }

    form.reset();
  };

  useEffect(() => {
    if (error?.data?.error?.duplicateFields) {
      error?.data?.error?.duplicateFields.map((duplicateField: string) => {
        if (duplicateField) {
          const field = duplicateField as "email" | "phoneNumber";
          form.setError(field, {
            message: `${field} is already registered`,
          });
        }
      });
    }
  }, [error, form]);

  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-white text-green-700 border-green-700 border hover:text-white">
          <Upload />
          Add Application
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[825px]">
        <DialogHeader>
          <DialogTitle>Applicant Tracker</DialogTitle>
          <DialogDescription>
            Upload a new candidate application
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 ">
            <div className="flex row gap-4">
              <div className="flex flex-1 flex-col gap-4 ">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter first and last name"
                          {...field}
                          className="focus-visible:ring-offset-0 focus-visible:ring-0"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter email address"
                          {...field}
                          className="focus-visible:ring-offset-0 focus-visible:ring-0"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="yoe"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Years of experience</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="e.g 5"
                          className="focus-visible:ring-offset-0 focus-visible:ring-0"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex flex-1 flex-col gap-4">
                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter phone number including country prefix"
                          {...field}
                          className="focus-visible:ring-offset-0 focus-visible:ring-0"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="applicantRole"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Role</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={String(field.value)}
                      >
                        <FormControl>
                          <SelectTrigger className="ring-0 focus:ring-0">
                            <SelectValue placeholder="Select role" />
                          </SelectTrigger>
                        </FormControl>

                        <SelectContent>
                          {Array.isArray(applicantsRole) &&
                            applicantsRole.map(
                              ({
                                id,
                                description,
                              }: ApplicantRoleAndStatusType) => (
                                <SelectItem key={id} value={description}>
                                  {description}
                                </SelectItem>
                              )
                            )}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter the country"
                          {...field}
                          className="focus-visible:ring-offset-0 focus-visible:ring-0"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="w-full min-h-[200px] bg-gray-300 flex items-center justify-center">
              <FormField
                control={form.control}
                name="resumeLink"
                render={({ field }) => (
                  <FormItem className="w-[300px] flex flex-col justify-center items-center ">
                    <FormLabel className="text-xl">Upload resume url</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter resume url"
                        {...field}
                        className="focus-visible:ring-offset-0 focus-visible:ring-0"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter>
              <Button type="submit">Submit</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddApplicantForm;
