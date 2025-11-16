"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as Z from "zod";
import { useState } from "react";
import Swal from "sweetalert2";

const contactFormSchema = Z.object({
  name: Z.string().nonempty("Name is required"),
  email: Z.string().email("Invalid email").nonempty("Email is required"),
  subject: Z.string().nonempty("Subject is required"),
  message: Z.string().nonempty("Message is required"),
});

const initialValues = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

const ContactForm = () => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: initialValues,
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://nes-tick-portfolio-handler.vercel.app/api/contact",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error sending message:", errorText);
        throw new Error(errorText || "Failed to send message");
      }

      Swal.fire({
        title: "Message Sent!",
        text: "Thank you for reaching out. I will get back to you soon.",
        icon: "success",
        confirmButtonColor: "#22c55e",
      });

      reset(initialValues);
    } catch (error) {
      console.error("Submission failed:", error);
      Swal.fire({
        title: "Oops!",
        text: error.message || "Failed to send your message. Please try again.",
        icon: "error",
        confirmButtonColor: "#ef4444",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center py-16">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-2xl bg-gray-900/90 backdrop-blur-md p-8 md:p-12 rounded-3xl shadow-2xl flex flex-col gap-6 border border-gray-700"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500 mb-6">
          Contact Me
        </h2>

        {/* Name */}
        <div className="flex flex-col">
          <label className="text-white font-semibold mb-2 md:text-lg text-base" htmlFor="name">
            Name
          </label>
          <input
            {...register("name")}
            type="text"
            id="name"
            placeholder="Your Name"
            className="w-full px-5 py-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          {errors.name && <span className="text-red-500 mt-1 text-sm">{errors.name.message}</span>}
        </div>

        {/* Email */}
        <div className="flex flex-col">
          <label className="text-white font-semibold mb-2 md:text-lg text-base" htmlFor="email">
            Email
          </label>
          <input
            {...register("email")}
            type="email"
            id="email"
            placeholder="hello@example.com"
            className="w-full px-5 py-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          {errors.email && <span className="text-red-500 mt-1 text-sm">{errors.email.message}</span>}
        </div>

        {/* Subject */}
        <div className="flex flex-col">
          <label className="text-white font-semibold mb-2 md:text-lg text-base" htmlFor="subject">
            Subject
          </label>
          <input
            {...register("subject")}
            type="text"
            id="subject"
            placeholder="Enter your subject"
            className="w-full px-5 py-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          {errors.subject && <span className="text-red-500 mt-1 text-sm">{errors.subject.message}</span>}
        </div>

        {/* Message */}
        <div className="flex flex-col">
          <label className="text-white font-semibold mb-2 md:text-lg text-base" htmlFor="message">
            Message
          </label>
          <textarea
            {...register("message")}
            id="message"
            placeholder="Write your message..."
            rows={6}
            className="w-full px-5 py-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 resize-none"
          />
          {errors.message && <span className="text-red-500 mt-1 text-sm">{errors.message.message}</span>}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-4 bg-gradient-to-r from-green-400 to-blue-500 text-white font-semibold rounded-xl hover:opacity-90 transition duration-300"
        >
          {loading ? "Sending..." : "Send Message"}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
