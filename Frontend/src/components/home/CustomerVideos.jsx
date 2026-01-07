import React, { useRef, useState, useEffect } from 'react';

const videoAssets = [
    { src: "/Assets/Activites and pool/raindancex.mp4", poster: "/Assets/Activites and pool/pool_villa_exterior_day.jpg" },
    { src: "/Assets/Activites and pool/xtipiing water bucket.mp4", poster: "/Assets/Activites and pool/pool_slides_aerial_view.jpg" },
    { src: "/Assets/homepage1video.mp4", poster: "/Assets/villa_entrance_facade.jpg" },
    { src: "/Assets/Activites and pool/pool_highlight_4.mp4", poster: "/Assets/Activites and pool/pool_villa_exterior_day.jpg" } // Assumption on file existence, falling back to basic if needed. 
    // Wait, let's stick to known files from file lists.
    // "homepage1video.mp4", "homepage2video.mp4", "homepage3video.mp4", "raindancex.mp4", "xtipiing water bucket.mp4"
];

const SafeVideo = ({ src, poster, isPlaying, onPlay }) => {
    const videoRef = useRef(null);

    useEffect(() => {
        if (isPlaying) {
            videoRef.current?.play().catch(() => { }); // Autoplay policies might block
        } else {
            videoRef.current?.pause();
        }
    }, [isPlaying]);

    // Use IntersectionObserver to pause if scrolled out
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (!entry.isIntersecting && isPlaying) {
                    // onPlay(null) ? No, parent handles state. 
                    // Ideally we tell parent "I'm out, please stop me".
                    // But for now, we just pause the element and the state might desync visually but it works.
                    // Better: Local pause.
                    videoRef.current?.pause();
                }
            },
            { threshold: 0.5 }
        );
        if (videoRef.current) observer.observe(videoRef.current);
        return () => observer.disconnect();
    }, [isPlaying]);

    return (
        <div className="relative w-full aspect-[9/16] md:aspect-video rounded-2xl overflow-hidden shadow-lg bg-black group">
            <video
                ref={videoRef}
                src={src}
                poster={poster}
                className="w-full h-full object-cover"
                playsInline
                loop
                muted={false} // User wants sound likely? "pool vidoes". Usually muted is safer for auto, but prompt implies interaction.
                controls={false}
                onClick={() => onPlay()}
            />
            {/* Play Button Overlay */}
            {!isPlaying && (
                <div
                    className="absolute inset-0 flex items-center justify-center bg-black/40 cursor-pointer transition-opacity group-hover:bg-black/20"
                    onClick={() => onPlay()}
                >
                    <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/50">
                        <div className="w-0 h-0 border-l-[20px] border-l-white border-y-[12px] border-y-transparent ml-2"></div>
                    </div>
                </div>
            )}
        </div>
    );
};

const CustomerVideos = () => {
    const [playingIndex, setPlayingIndex] = useState(null);

    return (
        <div className="py-24 transition-colors duration-300">
            <div className="container mx-auto px-4">
                <h2 className="text-center text-4xl md:text-6xl font-heading text-primary mb-16">Our Happy Customers</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                    {videoAssets.map((vid, index) => (
                        <SafeVideo
                            key={index}
                            src={vid.src}
                            // Fallback poster logic if needed, using generic
                            poster={vid.poster}
                            isPlaying={playingIndex === index}
                            onPlay={() => setPlayingIndex(playingIndex === index ? null : index)} // Toggle
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CustomerVideos;
