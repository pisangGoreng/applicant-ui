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
  useCreateNewApplicantMutation,
  useGetApplicantsRoleQuery,
} from "@/state/applicant";
import { useToast } from "@/hooks/use-toast";

import { createApplicantSchema } from "@/validations/createApplicantSchema";
import { ApplicantRoleAndStatusType } from "@/types";

const AddApplicantForm = () => {
  const { toast } = useToast();
  const { data: applicantsRole } = useGetApplicantsRoleQuery({});
  const form = useForm<z.infer<typeof createApplicantSchema>>({
    resolver: zodResolver(createApplicantSchema),
    defaultValues: {
      name: "",
      email: "",
      yoe: "",
      phoneNumber: "",
      applicantRole: "",
      location: "",
      resumeLink: "",
    },
  });

  const [
    createApplicant,
    { isLoading: isLoadingCreateApplicant, error: errorCreateApplicant },
  ] = useCreateNewApplicantMutation();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const onSubmit = async (data: z.infer<typeof createApplicantSchema>) => {
    if (Array.isArray(applicantsRole)) {
      const { id: selectedApplicantRole } = applicantsRole.find(
        ({ description }) => description === data.applicantRole
      );

      const response = await createApplicant({
        ...data,
        yoe: Number(data.yoe),
        applicantRole: Number(selectedApplicantRole),
      }).unwrap();

      if (response.success) {
        setIsDialogOpen(false);
        toast({ description: "Success add new applicant." });
        form.reset();
      }
    }
  };

  useEffect(() => {
    if (errorCreateApplicant?.data?.error) {
      if (errorCreateApplicant?.data?.error?.duplicateFields) {
        errorCreateApplicant?.data?.error?.duplicateFields.map(
          (duplicateField: string) => {
            const field = duplicateField as "email" | "phoneNumber";
            form.setError(field, {
              message: `${field} is already registered`,
            });
          }
        );
      } else {
        toast({ description: "An error occured." });
      }
    }
  }, [errorCreateApplicant, form, toast]);

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
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
              <Button type="submit" disabled={isLoadingCreateApplicant}>
                Submit
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddApplicantForm;
