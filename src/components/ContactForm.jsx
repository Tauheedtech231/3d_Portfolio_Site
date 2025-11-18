"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as Z from "zod";
import { useState, useEffect, useRef } from "react";
import Swal from "sweetalert2";
import { motion, useInView } from "framer-motion";

const contactFormSchema = Z.object({
  name: Z.string().min(2, "Name must be at least 2 characters").nonempty("Name is required"),
  email: Z.string().email("Please enter a valid email address").nonempty("Email is required"),
  subject: Z.string().min(5, "Subject must be at least 5 characters").nonempty("Subject is required"),
  message: Z.string().min(10, "Message must be at least 10 characters").nonempty("Message is required"),
});

const initialValues = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

const ContactForm = () => {
  const [loading, setLoading] = useState(false);
  const [characterCount, setCharacterCount] = useState(0);
  const formRef = useRef(null);
  const isInView = useInView(formRef, { once: true, margin: "-50px" });
  
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
    reset,
    watch,
  } = useForm({
    defaultValues: initialValues,
    resolver: zodResolver(contactFormSchema),
    mode: "onChange",
  });

  // Watch message field for character count
  const messageValue = watch("message");
  useEffect(() => {
    setCharacterCount(messageValue?.length || 0);
  }, [messageValue]);

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
        throw new Error(errorText || "Failed to send message");
      }

      await Swal.fire({
        title: "🎉 Message Sent!",
        text: "Thank you for reaching out. I'll get back to you within 24 hours.",
        icon: "success",
        background: "#0D0D12",
        color: "#ffffff",
        confirmButtonColor: "#A855F7",
        confirmButtonText: "Great!",
        timer: 5000,
      });

      reset(initialValues);
      setCharacterCount(0);
    } catch (error) {
      console.error("Submission failed:", error);
      await Swal.fire({
        title: "😕 Message Not Sent",
        text: error.message || "Please try again or email me directly.",
        icon: "error",
        background: "#0D0D12",
        color: "#ffffff",
        confirmButtonColor: "#A855F7",
        confirmButtonText: "Try Again",
      });
    } finally {
      setLoading(false);
    }
  };

  const getFieldStatus = (fieldName) => {
    const value = watch(fieldName);
    if (!value) return "empty";
    if (errors[fieldName]) return "error";
    return "valid";
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        duration: 0.6
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <div 
      ref={formRef}
      className="flex justify-center items-center py-8"
      style={{
        background: 'linear-gradient(to bottom, #0D0D12, #13131A)'
      }}
    >
      <motion.form
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-2xl bg-[#1A1A22] backdrop-blur-md p-6 md:p-8 rounded-2xl shadow-2xl flex flex-col gap-5 border border-purple-500/10 hover:border-purple-500/20 transition-all duration-500"
      >
        {/* Form Header */}
        <motion.div variants={itemVariants} className="text-center mb-2">
          <h2 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-600 mb-2">
            Get In Touch
          </h2>
          <p className="text-gray-400 text-sm">
            Fill out the form below and I'll respond promptly
          </p>
        </motion.div>

        {/* Name Field */}
        <motion.div variants={itemVariants} className="flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <label className="text-white font-medium text-base flex items-center gap-2" htmlFor="name">
              <span className={`w-2 h-2 rounded-full transition-all duration-300 ${
                getFieldStatus("name") === "valid" ? "bg-purple-400 shadow-sm shadow-purple-400" : 
                getFieldStatus("name") === "error" ? "bg-red-400" : "bg-gray-500"
              }`}></span>
              Your Name
            </label>
            {errors.name && (
              <span className="text-red-400 text-sm flex items-center gap-1">
                ⚠️ {errors.name.message}
              </span>
            )}
          </div>
          <input
            {...register("name")}
            type="text"
            id="name"
            placeholder="Enter your full name"
            className="w-full px-4 py-3 rounded-xl bg-[#0D0D12] text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 hover:border-gray-500"
            disabled={loading}
          />
        </motion.div>

        {/* Email Field */}
        <motion.div variants={itemVariants} className="flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <label className="text-white font-medium text-base flex items-center gap-2" htmlFor="email">
              <span className={`w-2 h-2 rounded-full transition-all duration-300 ${
                getFieldStatus("email") === "valid" ? "bg-purple-400 shadow-sm shadow-purple-400" : 
                getFieldStatus("email") === "error" ? "bg-red-400" : "bg-gray-500"
              }`}></span>
              Email Address
            </label>
            {errors.email && (
              <span className="text-red-400 text-sm flex items-center gap-1">
                ⚠️ {errors.email.message}
              </span>
            )}
          </div>
          <input
            {...register("email")}
            type="email"
            id="email"
            placeholder="your.email@example.com"
            className="w-full px-4 py-3 rounded-xl bg-[#0D0D12] text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 hover:border-gray-500"
            disabled={loading}
          />
        </motion.div>

        {/* Subject Field */}
        <motion.div variants={itemVariants} className="flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <label className="text-white font-medium text-base flex items-center gap-2" htmlFor="subject">
              <span className={`w-2 h-2 rounded-full transition-all duration-300 ${
                getFieldStatus("subject") === "valid" ? "bg-purple-400 shadow-sm shadow-purple-400" : 
                getFieldStatus("subject") === "error" ? "bg-red-400" : "bg-gray-500"
              }`}></span>
              Subject
            </label>
            {errors.subject && (
              <span className="text-red-400 text-sm flex items-center gap-1">
                ⚠️ {errors.subject.message}
              </span>
            )}
          </div>
          <input
            {...register("subject")}
            type="text"
            id="subject"
            placeholder="What's this about?"
            className="w-full px-4 py-3 rounded-xl bg-[#0D0D12] text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 hover:border-gray-500"
            disabled={loading}
          />
        </motion.div>

        {/* Message Field */}
        <motion.div variants={itemVariants} className="flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <label className="text-white font-medium text-base flex items-center gap-2" htmlFor="message">
              <span className={`w-2 h-2 rounded-full transition-all duration-300 ${
                getFieldStatus("message") === "valid" ? "bg-purple-400 shadow-sm shadow-purple-400" : 
                getFieldStatus("message") === "error" ? "bg-red-400" : "bg-gray-500"
              }`}></span>
              Your Message
            </label>
            <div className="flex items-center gap-2">
              {errors.message ? (
                <span className="text-red-400 text-sm flex items-center gap-1">
                  ⚠️ {errors.message.message}
                </span>
              ) : (
                <span className={`text-sm transition-all duration-300 ${
                  characterCount >= 10 ? "text-purple-400" : "text-gray-400"
                }`}>
                  {characterCount}/10
                </span>
              )}
            </div>
          </div>
          <textarea
            {...register("message")}
            id="message"
            placeholder="Tell me about your project, questions, or how I can help you..."
            rows={5}
            className="w-full px-4 py-3 rounded-xl bg-[#0D0D12] text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 resize-vertical transition-all duration-300 hover:border-gray-500"
            disabled={loading}
          />
        </motion.div>

        {/* Submit Button */}
        <motion.div variants={itemVariants}>
          <button
            type="submit"
            disabled={loading || !isDirty || !isValid}
            className={`w-full py-4 font-semibold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 ${
              loading || !isDirty || !isValid
                ? "bg-[#0D0D12] text-gray-400 cursor-not-allowed border border-gray-600"
                : "bg-purple-500 text-white hover:bg-purple-600 hover:shadow-2xl hover:shadow-purple-500/25 hover:scale-[1.02] active:scale-[0.98] border border-purple-500/20"
            }`}
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Sending Your Message...
              </>
            ) : (
              <>
                Send Message 
                <motion.span
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  →
                </motion.span>
              </>
            )}
          </button>
        </motion.div>

        {/* Form Footer */}
        <motion.div variants={itemVariants} className="text-center pt-4 border-t border-purple-500/10">
          <p className="text-gray-400 text-xs">
            💡 Tip: Be specific about your project for a better response
          </p>
        </motion.div>
      </motion.form>
    </div>
  );
};

export default ContactForm;