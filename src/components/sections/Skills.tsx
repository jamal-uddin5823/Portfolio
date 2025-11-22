"use client";

import { useState, useRef } from "react";
import portfolioData from "@/data/portfolio.json";
import { getTechIconUrl, getTechEmoji } from "@/lib/tech-icons";

export default function Skills() {
    const [isPaused1, setIsPaused1] = useState(false);
    const [isPaused2, setIsPaused2] = useState(false);
    const scrollRef1 = useRef<HTMLDivElement>(null);
    const scrollRef2 = useRef<HTMLDivElement>(null);

    const allSkills = [
        ...portfolioData.skills.languages,
        ...portfolioData.skills.frontend,
        ...portfolioData.skills.backend,
        ...portfolioData.skills.ai_ml,
        ...portfolioData.skills.tools
    ];

    const midPoint = Math.ceil(allSkills.length / 2);
    const row1 = allSkills.slice(0, midPoint);
    const row2 = allSkills.slice(midPoint);

    return (
        <section id="skills" className="py-20 overflow-hidden">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gradient">
                Technical Arsenal
            </h2>

            <div className="flex flex-col gap-8 py-4">
                {/* Row 1: Left to Right */}
                <div
                    ref={scrollRef1}
                    className="flex overflow-x-auto overflow-y-visible scrollbar-hide cursor-grab active:cursor-grabbing py-4"
                    onMouseEnter={() => setIsPaused1(true)}
                    onMouseLeave={() => setIsPaused1(false)}
                    onTouchStart={() => setIsPaused1(true)}
                    onTouchEnd={() => setIsPaused1(false)}
                >
                    <div
                        className="flex gap-8 px-4 animate-scroll-left"
                        style={{ animationPlayState: isPaused1 ? "paused" : "running" }}
                    >
                        {[...row1, ...row1, ...row1].map((skill, i) => (
                            <div
                                key={i}
                                className="flex-shrink-0 flex items-center justify-center w-24 h-24 glass-card rounded-xl hover:scale-110 hover:shadow-[0_0_20px_rgba(0,255,255,0.2)] transition-transform"
                                title={skill}
                            >
                                {getTechIconUrl(skill) ? (
                                    <img src={getTechIconUrl(skill)!} alt={skill} className="w-12 h-12 object-contain pointer-events-none" />
                                ) : (
                                    <span className="text-4xl pointer-events-none">{getTechEmoji(skill)}</span>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Row 2: Right to Left */}
                <div
                    ref={scrollRef2}
                    className="flex overflow-x-auto overflow-y-visible scrollbar-hide cursor-grab active:cursor-grabbing py-4"
                    onMouseEnter={() => setIsPaused2(true)}
                    onMouseLeave={() => setIsPaused2(false)}
                    onTouchStart={() => setIsPaused2(true)}
                    onTouchEnd={() => setIsPaused2(false)}
                >
                    <div
                        className="flex gap-8 px-4 animate-scroll-right"
                        style={{ animationPlayState: isPaused2 ? "paused" : "running" }}
                    >
                        {[...row2, ...row2, ...row2].map((skill, i) => (
                            <div
                                key={i}
                                className="flex-shrink-0 flex items-center justify-center w-24 h-24 glass-card rounded-xl hover:scale-110 hover:shadow-[0_0_20px_rgba(0,255,255,0.2)] transition-transform"
                                title={skill}
                            >
                                {getTechIconUrl(skill) ? (
                                    <img src={getTechIconUrl(skill)!} alt={skill} className="w-12 h-12 object-contain pointer-events-none" />
                                ) : (
                                    <span className="text-4xl pointer-events-none">{getTechEmoji(skill)}</span>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
