import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface HeroProps extends React.HTMLAttributes<HTMLElement> {
  gradient?: boolean
  blur?: boolean
}

/**
 * A minimal hero that keeps the black background & "lamp" effect,
 * with a much larger blur and offset to appear below the navbar.
 */
const Hero = React.forwardRef<HTMLElement, HeroProps>(
  (
    { className, gradient = true, blur = true, ...props },
    ref
  ) => {
    return (
      <section
        ref={ref}
        className={cn(
          // black background, at least 80vh tall
          "relative z-0 flex min-h-[80vh] w-full items-center justify-center overflow-hidden bg-black",
          className
        )}
        {...props}
      >
        {gradient && (
          // Move the "lamp effect" container down ~80px so it's near/under the navbar
          <div className="absolute top-[90px] isolate z-0 flex w-screen flex-1 items-start justify-center">
            {blur && (
              // This top overlay still exists, with bigger blur
              <div className="absolute top-0 z-50 h-48 w-screen bg-transparent opacity-10 backdrop-blur-md" />
            )}

            {/* Main glow - Increase blur to ~5x */}
            <div className="absolute inset-auto z-50 h-36 w-[28rem] -translate-y-[-30%] rounded-full bg-white/30 opacity-80 blur-[160px]" />

            {/* Lamp effect - bigger blur + lowered top */}
            <motion.div
              initial={{ width: "8rem" }}
              viewport={{ once: true }}
              transition={{ ease: "easeInOut", delay: 0.3, duration: 0.8 }}
              whileInView={{ width: "16rem" }}
              // Moved top from 0 => top-0 to top-10 or so,
              // but since we already offset the entire parent 80px,
              // let's keep this at top-0 so it’s relative to that container.
              className="absolute top-0 z-30 h-36 -translate-y-[20%] rounded-full bg-white/30 blur-[100px]"
            />

            {/* Top line - can keep smaller blur or remove it */}
            <motion.div
              initial={{ width: "15rem" }}
              viewport={{ once: true }}
              transition={{ ease: "easeInOut", delay: 0.3, duration: 0.8 }}
              whileInView={{ width: "30rem" }}
              className="absolute inset-auto z-50 h-0.5 -translate-y-[-10%] bg-white/30"
            />

            {/* Left gradient cone */}
            <motion.div
              initial={{ opacity: 0.5, width: "15rem" }}
              whileInView={{ opacity: 1, width: "30rem" }}
              transition={{
                delay: 0.3,
                duration: 0.8,
                ease: "easeInOut",
              }}
              style={{
                backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
              }}
              className="absolute right-1/2 h-56 w-[30rem] bg-gradient-conic from-white/40 via-transparent to-transparent [--conic-position:from_70deg_at_center_top]"
            >
              {/* Mask out bottom & side to keep the "cone" shape */}
              <div className="absolute left-0 bottom-0 z-20 h-40 w-full bg-black [mask-image:linear-gradient(to_top,white,transparent)]" />
              <div className="absolute left-0 bottom-0 z-20 h-full w-40 bg-black [mask-image:linear-gradient(to_right,white,transparent)]" />
            </motion.div>

            {/* Right gradient cone */}
            <motion.div
              initial={{ opacity: 0.5, width: "15rem" }}
              whileInView={{ opacity: 1, width: "30rem" }}
              transition={{
                delay: 0.3,
                duration: 0.8,
                ease: "easeInOut",
              }}
              style={{
                backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
              }}
              className="absolute left-1/2 h-56 w-[30rem] bg-gradient-conic from-transparent via-transparent to-white/40 [--conic-position:from_290deg_at_center_top]"
            >
              <div className="absolute right-0 bottom-0 z-20 h-40 w-full bg-black [mask-image:linear-gradient(to_top,white,transparent)]" />
              <div className="absolute right-0 bottom-0 z-20 h-full w-40 bg-black [mask-image:linear-gradient(to_left,white,transparent)]" />
            </motion.div>
          </div>
        )}
      </section>
    )
  }
)

Hero.displayName = "Hero"
export { Hero }
