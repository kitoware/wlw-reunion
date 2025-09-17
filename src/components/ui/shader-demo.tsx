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
    </div>
  )
}


