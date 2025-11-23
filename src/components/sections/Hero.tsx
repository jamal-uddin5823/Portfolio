"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import NeuralNetwork from "@/components/canvas/NeuralNetwork";
import portfolioData from "@/data/portfolio.json";
import Image from "next/image";

export default function Hero() {
    return (
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
            {/* 3D Background */}
            <div className="absolute inset-0 z-0">
                <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
                    <ambientLight intensity={0.5} />
                    <pointLight position={[10, 10, 10]} />
                    <Suspense fallback={null}>
                        <NeuralNetwork />
                    </Suspense>
                </Canvas>
            </div>

            {/* Content */}
            <div className="relative z-10 container mx-auto px-6 grid md:grid-cols-[3fr_2fr] gap-5 items-center">
                {/* Left side - Text */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="flex flex-col"
                >
                    <div className="mb-4">
                        <Image
                            src="/Me.jpg"
                            alt="Jamal Uddin"
                            width={120}
                            height={120}
                            className="rounded-full border-2 border-primary/50 object-cover"
                        />
                    </div>
                    <h2 className="text-primary font-medium tracking-wide">HELLO, I'M</h2>
                    <h1 className="text-5xl md:text-7xl font-bold mt-2 leading-tight">
                        {portfolioData.personalInfo.shortName}
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-400 mt-4">
                        {portfolioData.personalInfo.title}
                    </p>
                    <p className="text-gray-500 mt-4 max-w-xl text-justify">
                        {portfolioData.personalInfo.bio}
                    </p>
                    <div className="flex flex-wrap gap-3 mt-6">
                        <Button asChild size="default" className="bg-primary text-black hover:bg-primary/90 md:size-lg">
                            <a href="#projects">View Work</a>
                        </Button>
                        <Button asChild variant="outline" size="default" className="border-white/20 hover:bg-white/10 md:size-lg">
                            <a href="#contact">Contact Me</a>
                        </Button>
                        <Button asChild variant="outline" size="default" className="border-white/20 hover:bg-white/10 md:size-lg">
                            <a href="/Final_CV_Jamal.pdf" target="_blank" rel="noopener noreferrer">Resume</a>
                        </Button>
                    </div>
                </motion.div>

                {/* Right side - Thesis Highlight */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="hidden md:block"
                >
                    <div className="glass-card p-8 rounded-2xl relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <h3 className="text-2xl font-bold mb-2 text-white">Current Research</h3>
                        <h4 className="text-xl text-primary mb-4">{portfolioData.thesis.title}</h4>
                        <p className="text-gray-400 mb-6">
                            {portfolioData.thesis.description}
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {portfolioData.thesis.tags.map(tag => (
                                <span key={tag} className="text-xs px-3 py-1 rounded-full bg-white/10 text-gray-300">
                                    {tag}
                                </span>
                            ))}
                        </div>
                        <div className="mt-6 text-sm text-gray-500">
                            Base Paper: <span className="text-secondary">{portfolioData.thesis.basePaper}</span>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
