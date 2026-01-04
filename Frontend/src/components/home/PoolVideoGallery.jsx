import React, { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { FaPlay, FaPause } from 'react-icons/fa'

const VideoCard = ({ src, label }) => {
    const videoRef = useRef(null)
    const [isPlaying, setIsPlaying] = useState(false)

    const togglePlay = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause()
            } else {
                videoRef.current.play()
            }
            setIsPlaying(!isPlaying)
        }
    }

    return (
        <motion.div
            className="relative rounded-2xl overflow-hidden shadow-2xl group mx-2 my-2 sm:mx-0 sm:my-0 aspect-[9/16] sm:aspect-auto sm:h-[500px]"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
        >
            <video
                ref={videoRef}
                src={src}
                className="w-full h-full object-cover"
                loop
                playsInline
                onClick={togglePlay}
            />

            {/* Overlay */}
            <div
                className={`absolute inset-0 bg-black/30 flex items-center justify-center transition-opacity duration-300 ${isPlaying ? 'opacity-0 hover:opacity-100' : 'opacity-100'}`}
                onClick={togglePlay}
            >
                <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white cursor-pointer hover:scale-110 transition-transform">
                    {isPlaying ? <FaPause size={24} /> : <FaPlay size={24} className="ml-1" />}
                </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-4 bg-linear-to-t from-black/80 to-transparent pointer-events-none">
                <p className="text-white font-bold tracking-wider uppercase text-sm">{label}</p>
            </div>
        </motion.div>
    )
}

const PoolVideoGallery = () => {
    const videos = [
        { src: "/Assets/pool_highlight_3.mp4", label: "Evening Ambience" },
        { src: "/Assets/pool_highlight_4.mp4", label: "Poolside Fun" },
        { src: "/Assets/pool_highlight_2.mp4", label: "Crystal Clear Waters" }
    ]

    return (
        <section className="py-20 bg-text">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-6xl font-heading font-bold text-white mb-4">
                        Watch the <span className="text-primary">Magic</span>
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Experience the serenity and excitement of our pool in motion.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {videos.map((video, index) => (
                        <VideoCard key={index} src={video.src} label={video.label} />
                    ))}
                </div>
            </div>
        </section>
    )
}

export default PoolVideoGallery
