'use client'

import { useState } from 'react'

export function ImageMagnifier({ src, alt }: { src: string, alt: string }) {
    const [position, setPosition] = useState({ x: 0, y: 0 })
    const [showZoom, setShowZoom] = useState(false)
    const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 })

    const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
        setShowZoom(true)
    }

    const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
        setShowZoom(false)
    }

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const { left, top, width, height } = e.currentTarget.getBoundingClientRect()
        const x = ((e.pageX - left) / width) * 100
        const y = ((e.pageY - top) / height) * 100
        setPosition({ x, y })
        setCursorPosition({ x: e.pageX - left, y: e.pageY - top })
    }

    return (
        <div
            className="relative w-full h-full overflow-hidden rounded-xl cursor-crosshair group bg-muted"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onMouseMove={handleMouseMove}
        >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
                src={src}
                alt={alt}
                className="w-full h-full object-cover pointer-events-none"
            />

            {/* Zoom Lens / Glass Effect */}
            {showZoom && (
                <div
                    className="absolute pointer-events-none border border-white/50 bg-white/10 backdrop-blur-[1px] rounded-full w-24 h-24 hidden md:block" // optional lens
                    style={{
                        left: `${cursorPosition.x - 48}px`,
                        top: `${cursorPosition.y - 48}px`,
                    }}
                />
            )}

            {/* Magnified View (Side Panel or Overlay) - Simplified to overlay for now or separate element */}
            {/* For this specific BigTech style, usually the zoom is either an overlay OR a side portal. 
                 Let's do a direct scale transformation or side portal. 
                 Actually, simpler "lens" zoom inside the container is good for smooth UX. 
             */}

            {showZoom && (
                <div
                    className="absolute inset-0 pointer-events-none hidden md:block z-20 bg-no-repeat"
                    style={{
                        backgroundImage: `url(${src})`,
                        backgroundPosition: `${position.x}% ${position.y}%`,
                        backgroundSize: '250%', // 2.5x zoom
                        backgroundColor: 'white'
                    }}
                />
            )}
        </div>
    )
}
