'use client';
import React from 'react';
import { cn } from '@/lib/utils';
import Lenis from '@studio-freight/lenis'
import { ZoomParallax } from "@/components/ui/zoom-parallax";
import { ShimmerButton } from "./shimmer-button";
import RsvpModal from "@/components/ui/RsvpModal";
import { supabase } from '@/lib/supabaseClient'

interface DemoImage {
    src: string;
    alt?: string;
}

interface ZoomParallaxDemoProps {
    images?: DemoImage[];
}

export default function ZoomParallaxDemo({ images }: ZoomParallaxDemoProps) {

	React.useEffect( () => {
        const lenis = new Lenis()
       
        function raf(time: number) {
            lenis.raf(time)
            requestAnimationFrame(raf)
        }

        requestAnimationFrame(raf)
    },[])


	const defaultImages = [
		{
			src: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1280&h=720&fit=crop&crop=entropy&auto=format&q=80',
			alt: 'Modern architecture building',
		},
		{
			src: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1280&h=720&fit=crop&crop=entropy&auto=format&q=80',
			alt: 'Urban cityscape at sunset',
		},
		{
			src: 'https://images.unsplash.com/photo-1557683316-973673baf926?w=800&h=800&fit=crop&crop=entropy&auto=format&q=80',
			alt: 'Abstract geometric pattern',
		},
		{
			src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1280&h=720&fit=crop&crop=entropy&auto=format&q=80',
			alt: 'Mountain landscape',
		},
		{
			src: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&h=800&fit=crop&crop=entropy&auto=format&q=80',
			alt: 'Minimalist design elements',
		},
		{
			src: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=1280&h=720&fit=crop&crop=entropy&auto=format&q=80',
			alt: 'Ocean waves and beach',
		},
		{
			src: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1280&h=720&fit=crop&crop=entropy&auto=format&q=80',
			alt: 'Forest trees and sunlight',
		},
	];

	const [isRsvpOpen, setIsRsvpOpen] = React.useState(false);
	const [isSubmitting, setIsSubmitting] = React.useState(false);
	const [status, setStatus] = React.useState<{ type: 'success' | 'error' | 'info' | null; message: string }>({ type: null, message: '' });

	async function handleSubmit(data: { firstName: string; lastName: string; email: string; phone: string; }) {
		setStatus({ type: null, message: '' })
		setIsSubmitting(true)
		try {
			const { error } = await supabase.rpc('submit_rsvp', {
				first_name: data.firstName,
				last_name: data.lastName,
				email: data.email,
				phone: data.phone,
			})

			if (error) {
				// 23505 is unique_violation if you add a unique index on email
				const pgCode = (error as unknown as { code?: string }).code
				if (pgCode === '23505') {
					setStatus({ type: 'info', message: "You have already RSVP’d with this email." })
				} else {
					setStatus({ type: 'error', message: 'Something went wrong submitting your RSVP. Please try again.' })
				}
				return
			}

			setStatus({ type: 'success', message: 'Thanks! Your RSVP has been recorded.' })
		} catch (e) {
			setStatus({ type: 'error', message: 'Unexpected error. Please try again.' })
		} finally {
			setIsSubmitting(false)
		}
	}

	return (
		<main className="min-h-screen w-full">
			<div className="relative flex h-[50vh] items-center justify-center">
				{/* Radial spotlight */}
				<div
					aria-hidden="true"
					className={cn(
						'pointer-events-none absolute -top-1/2 left-1/2 h-[120vmin] w-[120vmin] -translate-x-1/2 rounded-full',
						'bg-[radial-gradient(ellipse_at_center,--theme(--color-foreground/.1),transparent_50%)]',
						'blur-[30px]',
					)}
				/>
			</div>
			<ZoomParallax images={images && images.length ? images : defaultImages} />
			<div id="rsvp" className="mt-24 md:mt-48 lg:mt-64 py-12 flex flex-col items-center justify-center bg-black">
				{status.type && (
					<div
						role="status"
						className={cn(
							'mb-6 w-[92%] max-w-xl rounded-lg border px-4 py-3 text-sm',
							status.type === 'success' && 'border-green-600/30 bg-green-950/30 text-green-200',
							status.type === 'error' && 'border-red-600/30 bg-red-950/30 text-red-200',
							status.type === 'info' && 'border-yellow-600/30 bg-yellow-950/30 text-yellow-100',
						)}
					>
						{status.message}
					</div>
				)}
				<h2 className="mb-6 text-3xl md:text-5xl lg:text-6xl font-calligraphy text-white tracking-tight">See you there</h2>
				<ShimmerButton onClick={() => setIsRsvpOpen(true)} disabled={isSubmitting} className="px-12 py-6 md:px-16 md:py-8 rounded-full">
					<span className="text-4xl md:text-6xl font-calligraphy tracking-tight">RSVP</span>
				</ShimmerButton>
			</div>
			<RsvpModal
				open={isRsvpOpen}
				onClose={() => setIsRsvpOpen(false)}
				onSubmit={handleSubmit}
			/>
			<footer className="relative w-full overflow-hidden bg-gradient-to-b from-black via-black to-white min-h-[40vh]">
				<div
					aria-hidden="true"
					className="pointer-events-none absolute inset-x-0 -top-48 mx-auto h-[40rem] w-[95%] rounded-full opacity-60 blur-[140px] bg-[linear-gradient(to_bottom,_black_0%,_rgba(0,0,0,0.6)_20%,_transparent_72%,_white_98%)]"
				/>
			</footer>
		</main>
	);
}


