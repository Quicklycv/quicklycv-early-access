"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { GraphQLClient, gql } from "graphql-request";

//zod schema for form validation
const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
});

type FormData = z.infer<typeof schema>;
const endpoint = (process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT as string);

export default function EarlyAccessPage() {
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    //send data to GraphQL endpoint
    const graphQlClient = new GraphQLClient(endpoint, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_AUTH_TOKEN}`,
      },
    });

    const mutation = gql`
      mutation Member($name: String!, $email: String!) {
        createMembers(data: { name: $name, email: $email }) {
          id
          name
          email
      }
    }
    `;

    const variables = {
      name: data.name,
      email: data.email,
    }

    const req = await graphQlClient.request(mutation, variables);
    if (req) {
      setSubmitted(true);
    } else {
      setError(true);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-white px-4 py-12">
      <div className="max-w-md w-full text-center">
        {/* Pill */}
        <div className="inline-block mb-4 rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">
          Early Access
        </div>

        {/* Heading */}
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Get Early Access to QuicklyCV
        </h1>

        {/* Subheading */}
        <p className="text-gray-600 mb-8">
          Be the first to experience the fastest way to build professional resumes and accelerate your job search.
        </p>

        {!submitted && (
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
            <input
              type="text"
              placeholder="Enter your name"
              {...register("name")}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
            {errors.name && <p className="text-red-500 text-xs text-left">{errors.name.message}</p>}

            <input
              type="email"
              placeholder="Enter your email"
              {...register("email")}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
            {errors.email && <p className="text-red-500 text-xs text-left">{errors.email.message}</p>}

            <button
              type="submit"
              className="w-full rounded-lg bg-blue-600 px-6 py-3 text-white font-semibold hover:bg-blue-700 transition"
            >
              Join Now
            </button>
          </form>
        )} {submitted && (
          <div className="mt-8 text-green-600 text-lg font-semibold">
            Thank you for signing up! We will contact you when QuicklyCV is ready.
          </div>
        )}{error && (
          <div className="mt-8 text-red-600 text-lg font-semibold">
          Something went wrong. Please try again later.
        </div>
        )}

        {/* Note */}
        <p className="text-xs text-gray-400 mt-4">
          No spam, unsubscribe anytime.
        </p>
      </div>
    </main>
  );
}
