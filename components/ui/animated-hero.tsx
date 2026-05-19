"use client";

import { motion } from "framer-motion";
import { MoveRight } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

function Hero() {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Desktop image */}
      <Image
        src="/arowwai (7).png"
        alt="Belle Martineé"
        fill
        quality={100}
        unoptimized
        className="hidden md:block object-cover object-top"
        priority
      />
      {/* Mobile image */}
      <Image
        src="/arowwai (14).png"
        alt="Belle Martineé"
        fill
        quality={100}
        unoptimized
        className="md:hidden object-cover object-top"
        priority
      />

      {/* Bottom gradient for CTA readability */}
      <div className="absolute inset-0 bg-linear-to-t from-[#1a0010]/70 via-transparent to-transparent" />

      {/* CTA buttons */}
      <motion.div
        className="absolute bottom-16 left-0 right-0 flex flex-col sm:flex-row items-center justify-center gap-4 px-6"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <Button
          size="xl"
          variant="default"
          className="gap-3"
          onClick={() => document.getElementById("kontakt")?.scrollIntoView({ behavior: "smooth" })}
        >
          Kom igång gratis <MoveRight className="w-5 h-5" />
        </Button>
        <Button
          size="xl"
          variant="outline"
          className="gap-3 border-[#f8edaa]/40 text-[#f8edaa] hover:bg-[#f8edaa]/10 hover:border-[#f8edaa]"
          onClick={() => document.getElementById("projekt")?.scrollIntoView({ behavior: "smooth" })}
        >
          Se vårt arbete
        </Button>
      </motion.div>
    </div>
  );
}

export { Hero };
