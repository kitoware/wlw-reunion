import { ShaderAnimation } from "@/components/ui/shader-lines";

export default function DemoOne() {
  return (
    <div className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden rounded-xl">
      <ShaderAnimation/>
      <span className="pointer-events-none z-10 text-center text-7xl leading-none font-semibold tracking-tighter whitespace-pre-wrap text-white font-calligraphy">
        Walled Lake Western 
      </span>
      <span className="pointer-events-none z-10 text-center text-2xl leading-none font-semibold tracking-tighter whitespace-pre-wrap text-white font-calligraphy">
        Class of 2005 Reunion
      </span>
      <div className="pointer-events-none z-10 mt-6 text-center text-white font-calligraphy bg-black/70 rounded-xl p-6 backdrop-blur-sm shadow-lg ring-1 ring-black/10">
        <p className="text-xl font-semibold">November 28, 2025</p>
        <p className="text-lg">7pm–Midnight</p>
        <p className="mt-2 text-lg font-semibold">One Under Bar</p>
        <p className="text-lg">35780 Five Mile Rd</p>
        <p className="text-lg">Livonia, MI 48154</p>
        <p className="mt-3 text-lg">Tickets: $50 at the door</p>
        <p className="text-lg">All you can eat/All you can drink</p>
        <p className="mt-3 text-lg">Significant others welcome</p>
      </div>
    </div>
  )
}


