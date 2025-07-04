"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Cookies from "js-cookie";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CustomerLogin, postCustomerLogin } from "@/hooks/use-customer";
import { useMutation } from "react-query";
import { toast } from "../ui/use-toast";
import React, { useEffect, useState } from "react";
import { ReloadIcon } from "@radix-ui/react-icons";
import { Cookie } from "lucide-react";

const wait = () => new Promise((resolve) => setTimeout(resolve, 1000));

const DeliveryContent = ({}) => {
  // to disable the button after submit
  const [disabled, setDisabled] = useState(false);
  // to close the modal after success auth
  const [authSuccess, setAuthSuccess] = useState(false);

  const customerSchema = z.object({
    phone: z.string().refine(
      (value) => {
        const phoneNumberRegex = /^01\d{9}$/;
        return phoneNumberRegex.test(value);
      },
      {
        message: "يجب ان يكون الرقم 11 رقماً ويبدأ ب 01",
      }
    ),
    password: z.string().min(6),
  });

  const form = useForm<CustomerLogin>({
    resolver: zodResolver(customerSchema),
    defaultValues: {
      phone: "",
      password: "",
    },
  });

  const useMutationCustomer = () => {
    return useMutation(
      (customer: CustomerLogin) => postCustomerLogin(customer),
      {
        onSuccess: (data) => {
          Cookies.set("customerToken", data.data.token);
          setAuthSuccess(true);
          toast({
            description: "تم تسجيل الدخول بنجاح",
            style: {
              justifyContent: "center",
              backgroundColor: "green",
              color: "white",
            },
          });
        },
        onError: (error) => {
          console.log({ message: error });
          toast({
            description: "خطأ في رقم الهاتف أو كلمة المرور",
            style: {
              justifyContent: "center",
              backgroundColor: "red",
              color: "white",
            },
          });
          setDisabled(false);
        },
      }
    );
  };

  const mutation = useMutationCustomer();

  function onSubmit(customer: CustomerLogin) {
    console.log(customer);
    mutation.mutate(customer);
    setDisabled(true);
  }

  return (
    <Form {...form}>
      <form
        dir="rtl"
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-2"
      >
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>العنوان</FormLabel>
              <FormControl>
                <Input placeholder="مثلاً: 01111111111" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>كلمة المرور</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button disabled={disabled} type="submit">
          {disabled ? (
            <>
              جاري تسجيل الدخول
              <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
            </>
          ) : (
            "تسجيل الدخول"
          )}
        </Button>
      </form>
    </Form>
  );
};
export default DeliveryContent;
