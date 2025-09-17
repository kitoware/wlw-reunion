import DemoOne from "@/components/ui/shader-demo";
import ZoomParallaxDemo from "@/components/ui/zoom-parallax-demo";
import { ShimmerButton } from "./components/ui/shimmer-button";

export default function App() {
  const images = [
    { src: "/photo-1.jpg", alt: "Photo 1" },
    { src: "/photo-2.jpg", alt: "Photo 2" },
    { src: "/photo-3.jpeg", alt: "Photo 3" },
    { src: "/photo-4.jpg", alt: "Photo 4" },
    { src: "/photo-5.jpeg", alt: "Photo 5" },
    { src: "/photo-6.jpg", alt: "Photo 6" },
    { src: "/photo-7.jpg", alt: "Photo 7" },
  ];
  return (
    <div className="min-h-screen bg-black">
      <DemoOne />
      <ZoomParallaxDemo images={images} />
      <ShimmerButton />
    </div>
  );
}