"use client";

import React, { useRef, useState } from "react";
import dynamic from "next/dynamic";
import emailjs from "@emailjs/browser";
import { toast } from "sonner";

const ContactExperience = dynamic(() => import("./ContactExperience"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-h-[420px] md:min-h-[560px] flex flex-col items-center justify-center bg-gradient-to-br from-neutral-900 via-black to-neutral-950 text-white/60 font-mono text-xs md:text-sm tracking-widest uppercase">
      <div className="w-8 h-8 rounded-full border-2 border-white/20 border-t-white animate-spin mb-4"></div>
      <p>Loading 3D Studio Showcase...</p>
    </div>
  ),
});

export default function ContactPageSection() {
  const formRef = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const toastId = toast.loading("Sending your message...", {
      description: "Connecting to EmailJS server...",
    });

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "";
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "";
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "";

    const isPlaceholder =
      !serviceId ||
      !templateId ||
      !publicKey ||
      serviceId === "your_service_id_here";

    try {
      if (isPlaceholder) {
        console.warn(
          "EmailJS environment variables not configured yet. Set NEXT_PUBLIC_EMAILJS_SERVICE_ID, NEXT_PUBLIC_EMAILJS_TEMPLATE_ID, and NEXT_PUBLIC_EMAILJS_PUBLIC_KEY in .env.local",
        );
        await new Promise((resolve) => setTimeout(resolve, 1000));
        toast.success("Message Sent Successfully! ✨", {
          id: toastId,
          description:
            "Thank you for reaching out! (Demo mode: add EmailJS keys to .env.local for live delivery)",
          duration: 5000,
        });
      } else {
        if (!formRef.current) return;
        await emailjs.sendForm(
          serviceId,
          templateId,
          formRef.current,
          publicKey,
        );
        toast.success("Message Sent Successfully! 🚀", {
          id: toastId,
          description:
            "Thank you for reaching out. Let's build something cinematic together!",
          duration: 5000,
        });
      }
      setForm({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("EmailJS Error:", error);
      toast.error("Failed to Send Message ❌", {
        id: toastId,
        description:
          "Something went wrong while delivering your message. Please try again or email directly.",
        duration: 6000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full bg-transparent pt-36 sm:pt-40 md:pt-48 pb-20 md:pb-32 relative z-10">
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
        {/* Editorial Header */}
        <div className="mb-8 md:mb-8 border-b border-black/15 pb-6">
          <h1 className="text-left text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter uppercase text-black leading-none">
            GET IN TOUCH – LET&apos;S CONNECT
          </h1>
        </div>

        {/* Form & 3D Model Flex Layout (Bypasses Webflow .grid interference) */}
        <div className="w-full flex flex-col lg:flex-row gap-8 lg:gap-12 items-stretch">
          {/* Left Column: Transparent Form Card */}
          <div className="w-full lg:w-5/12 flex">
            <div className="w-full border border-black/20 rounded-3xl p-8 sm:p-10 md:p-12 bg-transparent backdrop-blur-sm shadow-none flex flex-col justify-between">
              <form
                ref={formRef}
                onSubmit={handleSubmit}
                className="w-full flex flex-col gap-6"
              >
                <div>
                  <label
                    htmlFor="name"
                    className="font-mono text-xs font-bold uppercase tracking-widest text-black/70 mb-2 block"
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="What's your good name?"
                    required
                    disabled={loading}
                    className="w-full px-5 py-4 bg-transparent border border-black/25 rounded-xl font-sans text-base text-black placeholder:text-black/45 focus:outline-none focus:border-black focus:bg-black/[0.03] transition-all duration-300 disabled:opacity-50"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="font-mono text-xs font-bold uppercase tracking-widest text-black/70 mb-2 block"
                  >
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="What's your email address?"
                    required
                    disabled={loading}
                    className="w-full px-5 py-4 bg-transparent border border-black/25 rounded-xl font-sans text-base text-black placeholder:text-black/45 focus:outline-none focus:border-black focus:bg-black/[0.03] transition-all duration-300 disabled:opacity-50"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="font-mono text-xs font-bold uppercase tracking-widest text-black/70 mb-2 block"
                  >
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="How can I help you bring your story to life?"
                    rows={5}
                    required
                    disabled={loading}
                    className="w-full px-5 py-4 bg-transparent border border-black/25 rounded-xl font-sans text-base text-black placeholder:text-black/45 focus:outline-none focus:border-black focus:bg-black/[0.03] transition-all duration-300 disabled:opacity-50 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="group relative inline-flex items-center justify-center gap-4 px-8 py-5 bg-black text-white font-mono text-xs sm:text-sm md:text-base font-bold tracking-widest uppercase rounded-full shadow-lg hover:bg-neutral-800 hover:shadow-xl transition-all duration-300 disabled:opacity-60 cursor-pointer overflow-hidden mt-4"
                >
                  <span className="transition-colors duration-300 group-hover:text-mist-400 text-white">
                    {loading ? "SENDING MESSAGE..." : "SEND MESSAGE"}
                  </span>
                  <svg
                    className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </button>
              </form>
            </div>
          </div>

          {/* Right Column: Interactive 3D Canvas */}
          <div className="w-full lg:w-7/12 min-h-[420px] md:min-h-[560px] flex">
            <div className="w-full h-full min-h-[420px] md:min-h-[560px] bg-gradient-to-br from-neutral-900 via-black to-neutral-950 rounded-3xl overflow-hidden border border-black/20 shadow-2xl hover:cursor-grab active:cursor-grabbing relative">
              <ContactExperience />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
