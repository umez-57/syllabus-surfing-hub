
import { SearchBar } from "@/components/SearchBar";
import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation";

export default function Index() {
  return (
    <BackgroundGradientAnimation
      gradientBackgroundStart="rgb(13, 11, 38)"
      gradientBackgroundEnd="rgb(49, 27, 146)"
      firstColor="168, 85, 247"
      secondColor="0, 212, 255"
      thirdColor="147, 51, 234"
      fourthColor="59, 130, 246"
      fifthColor="139, 92, 246"
      pointerColor="168, 85, 247"
      containerClassName="fixed inset-0"
      className="relative z-0"
    >
      <div className="relative z-10 min-h-screen bg-transparent">
        <div className="container mx-auto px-4 pt-16">
          <div className="text-center mb-16">
            <div className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
              <h1 className="text-5xl md:text-7xl font-bold mb-6">
                VIT-AP Study Hub
              </h1>
              <p className="text-xl md:text-2xl text-white/80 max-w-2xl mx-auto">
                Your gateway to academic excellence. Find syllabi, notes, and resources all in one place.
              </p>
            </div>
          </div>
          <SearchBar />
        </div>
      </div>
    </BackgroundGradientAnimation>
  );
}
