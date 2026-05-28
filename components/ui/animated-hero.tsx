"use client";

import { motion } from "framer-motion";
import { MoveRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const sharedStyle = "relative w-full h-screen bg-no-repeat bg-cover bg-top";

function Hero() {
  return (
    <>
      {/* Mobile */}
      <div
        className={`md:hidden ${sharedStyle}`}
        style={{ backgroundImage: "url('/hero-mobile.png')" }}
      >
        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />
        <CTAButtons />
      </div>

      {/* iPad */}
      <div
        className={`hidden md:block lg:hidden ${sharedStyle}`}
        style={{ backgroundImage: "url('/Organizer%20Desktop%20Wallpaper%20%285%29.png')" }}
      >
        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />
        <CTAButtons />
      </div>

      {/* Desktop */}
      <div
        className={`hidden lg:block ${sharedStyle}`}
        style={{ backgroundImage: "url('/hero-desktop.png')", backgroundPosition: "center 40%" }}
      >
        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />
        <CTAButtons />
      </div>
    </>
  );
}

function CTAButtons() {
  return (
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
        Kom igång <MoveRight className="w-5 h-5" />
      </Button>
      <Button
        size="xl"
        variant="outline"
        className="gap-3 border-white/40 text-white hover:bg-white/10 hover:border-white/70"
        onClick={() => document.getElementById("projekt")?.scrollIntoView({ behavior: "smooth" })}
      >
       Vårt arbete
      </Button>
    </motion.div>
  );
}

export { Hero };
