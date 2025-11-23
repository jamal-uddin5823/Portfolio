"use client";

import { motion } from "framer-motion";
import portfolioData from "@/data/portfolio.json";
import { Github, MapPin } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

interface GitHubStats {
    publicRepos: number;
    followers: number;
    totalStars: number;
    topLanguages?: Array<{
        name: string;
        percentage: number;
    }>;
    currentStreak?: number;
    longestStreak?: number;
    totalContributions?: number;
}

export default function BentoGrid() {
    const projectsCount = portfolioData.projects.length;
    const hackathonWins = portfolioData.hackathons.length;
    const [githubStats, setGithubStats] = useState<GitHubStats | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Add timestamp to prevent caching
        fetch('/api/github-stats?t=' + Date.now())
            .then(res => res.json())
            .then(data => {
                console.log('Received GitHub stats:', data);
                setGithubStats(data);
                setLoading(false);
            })
            .catch(err => {
                console.error('Failed to fetch GitHub stats:', err);
                setLoading(false);
            });
    }, []);

    return (
        <section id="about" className="py-20 px-6 bg-gradient-to-b from-black/0 via-black/5 to-black/0">
            <div className="max-w-7xl mx-auto">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-3xl md:text-4xl font-bold mb-12 text-gradient text-center"
                >
                    Quick Overview
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                    {/* Hero: GitHub Profile with Contribution Heatmap */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="md:col-span-7 md:row-span-2 glass-card p-4 sm:p-8 rounded-3xl relative overflow-hidden group hover:-translate-y-1 transition-all duration-500"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.07] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                        <div className="relative z-10 h-full flex flex-col">
                            <div className="flex items-center gap-3 mb-4 sm:mb-6">
                                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                                    <Github className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                                </div>
                                <div>
                                    <h3 className="text-base sm:text-lg font-semibold text-white">GitHub Activity</h3>
                                    <p className="text-xs sm:text-sm text-gray-400">@jamal-uddin5823</p>
                                </div>
                            </div>

                            {loading ? (
                                <div className="flex-1 flex items-center justify-center">
                                    <div className="animate-pulse text-gray-500 text-sm">Loading stats...</div>
                                </div>
                            ) : githubStats ? (
                                <>
                                    {/* Stats Grid - Total Contributions, Current Streak, Longest Streak */}
                                    <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-4 sm:mb-6">
                                        {/* Total Contributions */}
                                        <div className="glass-card p-2 sm:p-4 rounded-xl border-0 bg-white/[0.03] text-center">
                                            <div className="text-xl sm:text-3xl font-bold text-white mb-0.5 sm:mb-1">
                                                {githubStats.totalContributions?.toLocaleString() || 0}
                                            </div>
                                            <div className="text-[9px] sm:text-xs text-gray-400 mb-0.5 sm:mb-2 leading-tight">Total<br className="sm:hidden" /> Contributions</div>
                                            <div className="text-[8px] sm:text-[10px] text-gray-500">This year</div>
                                        </div>

                                        {/* Current Streak */}
                                        <div className="glass-card p-2 sm:p-4 rounded-xl border-0 bg-white/[0.03] text-center relative">
                                            <div className="relative inline-flex items-center justify-center w-10 h-10 sm:w-16 sm:h-16 mb-1 sm:mb-2">
                                                <svg className="w-10 h-10 sm:w-16 sm:h-16 transform -rotate-90">
                                                    <circle
                                                        cx="20"
                                                        cy="20"
                                                        r="16"
                                                        stroke="currentColor"
                                                        strokeWidth="2.5"
                                                        fill="none"
                                                        className="text-white/10 sm:hidden"
                                                    />
                                                    <circle
                                                        cx="20"
                                                        cy="20"
                                                        r="16"
                                                        stroke="currentColor"
                                                        strokeWidth="2.5"
                                                        fill="none"
                                                        strokeDasharray="100.53"
                                                        strokeDashoffset={100.53 - (100.53 * Math.min((githubStats.currentStreak || 0) / 30, 1))}
                                                        className="text-orange-500 transition-all duration-1000 sm:hidden"
                                                        strokeLinecap="round"
                                                    />
                                                    <circle
                                                        cx="32"
                                                        cy="32"
                                                        r="28"
                                                        stroke="currentColor"
                                                        strokeWidth="4"
                                                        fill="none"
                                                        className="text-white/10 hidden sm:block"
                                                    />
                                                    <circle
                                                        cx="32"
                                                        cy="32"
                                                        r="28"
                                                        stroke="currentColor"
                                                        strokeWidth="4"
                                                        fill="none"
                                                        strokeDasharray="175.93"
                                                        strokeDashoffset={175.93 - (175.93 * Math.min((githubStats.currentStreak || 0) / 30, 1))}
                                                        className="text-orange-500 transition-all duration-1000 hidden sm:block"
                                                        strokeLinecap="round"
                                                    />
                                                </svg>
                                                <div className="absolute text-base sm:text-xl font-bold text-white">
                                                    {githubStats.currentStreak || 0}
                                                </div>
                                            </div>
                                            <div className="text-[9px] sm:text-xs text-orange-500 font-semibold mb-0.5 sm:mb-1 leading-tight">Current<br className="sm:hidden" /> Streak</div>
                                            <div className="text-[8px] sm:text-[10px] text-gray-500">days</div>
                                        </div>

                                        {/* Longest Streak */}
                                        <div className="glass-card p-2 sm:p-4 rounded-xl border-0 bg-white/[0.03] text-center">
                                            <div className="text-xl sm:text-3xl font-bold text-white mb-0.5 sm:mb-1">
                                                {githubStats.longestStreak || 0}
                                            </div>
                                            <div className="text-[9px] sm:text-xs text-gray-400 mb-0.5 sm:mb-2 leading-tight">Longest<br className="sm:hidden" /> Streak</div>
                                            <div className="text-[8px] sm:text-[10px] text-gray-500">days</div>
                                        </div>
                                    </div>

                                    {/* Most Used Languages */}
                                    {githubStats.topLanguages && githubStats.topLanguages.length > 0 && (
                                        <div className="mb-4 sm:mb-6">
                                            <h4 className="text-xs sm:text-sm font-medium text-gray-400 mb-2 sm:mb-3">Most Used Languages</h4>
                                            <div className="space-y-2 sm:space-y-3">
                                                {/* Language Bar */}
                                                <div className="h-1.5 sm:h-2 bg-white/5 rounded-full overflow-hidden flex">
                                                    {githubStats.topLanguages.map((lang, index) => {
                                                        const colors = ['bg-blue-500', 'bg-gray-400', 'bg-yellow-500', 'bg-cyan-400', 'bg-green-400'];
                                                        return (
                                                            <div
                                                                key={lang.name}
                                                                className={'h-full ' + colors[index]}
                                                                style={{ width: lang.percentage + '%' }}
                                                                title={lang.name + ' ' + lang.percentage + '%'}
                                                            ></div>
                                                        );
                                                    })}
                                                </div>
                                                {/* Language Labels */}
                                                <div className="grid grid-cols-2 gap-1.5 sm:gap-2 text-[10px] sm:text-xs">
                                                    {githubStats.topLanguages.map((lang, index) => {
                                                        const colors = ['bg-blue-500', 'bg-gray-400', 'bg-yellow-500', 'bg-cyan-400', 'bg-green-400'];
                                                        return (
                                                            <div key={lang.name} className="flex items-center gap-1.5 sm:gap-2">
                                                                <div className={'w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full ' + colors[index]}></div>
                                                                <span className="text-gray-400 truncate">{lang.name} {lang.percentage}%</span>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* GitHub Contribution Heatmap */}
                                    <div className="flex-1">
                                        <h4 className="text-xs sm:text-sm font-medium text-gray-400 mb-2 sm:mb-3">Contribution Activity</h4>
                                        <div className="w-full rounded-xl overflow-hidden border border-white/10 bg-black/20 p-2 sm:p-4">
                                            <img
                                                src="https://ghchart.rshah.org/00d9ff/jamal-uddin5823"
                                                alt="GitHub Contribution Chart"
                                                className="w-full h-auto opacity-90 hover:opacity-100 transition-opacity"
                                                loading="lazy"
                                            />
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <div className="flex-1 flex items-center justify-center">
                                    <p className="text-gray-500 text-sm">Unable to load stats</p>
                                </div>
                            )}

                            <Link
                                href={portfolioData.personalInfo.github}
                                target="_blank"
                                className="mt-4 sm:mt-6 inline-flex items-center gap-2 text-xs sm:text-sm text-primary hover:text-primary/80 transition-colors group/link"
                            >
                                <span>View Profile</span>
                                <svg className="w-3 h-3 sm:w-4 sm:h-4 group-hover/link:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </Link>
                        </div>
                    </motion.div>

                    {/* Projects Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="md:col-span-5 glass-card p-6 rounded-3xl relative overflow-hidden group hover:-translate-y-1 transition-all duration-500"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.05] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="relative z-10 h-full flex flex-col justify-center">
                            <h3 className="text-sm font-medium text-gray-400 mb-3">Featured Projects</h3>
                            <div className="flex items-end gap-2">
                                <motion.div
                                    className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent"
                                    initial={{ opacity: 0, scale: 0.5 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.3, type: "spring" }}
                                >
                                    {projectsCount}
                                </motion.div>
                                <div className="text-sm text-gray-500 mb-2">completed</div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Hackathons Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.15 }}
                        className="md:col-span-5 glass-card p-6 rounded-3xl relative overflow-hidden group hover:-translate-y-1 transition-all duration-500"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-secondary/[0.05] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="relative z-10 h-full flex flex-col justify-center">
                            <h3 className="text-sm font-medium text-gray-400 mb-3">Hackathons</h3>
                            <div className="flex items-end gap-2">
                                <motion.div
                                    className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-secondary to-secondary/60 bg-clip-text text-transparent"
                                    initial={{ opacity: 0, scale: 0.5 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.35, type: "spring" }}
                                >
                                    {hackathonWins}
                                </motion.div>
                                <div className="text-sm text-gray-500 mb-2">wins</div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Research Focus */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="md:col-span-4 glass-card p-5 rounded-3xl relative overflow-hidden group hover:-translate-y-1 transition-all duration-500"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-primary/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="relative z-10">
                            <div className="flex items-center gap-2 mb-2">
                                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                                <h3 className="text-xs font-medium text-gray-400">Current Research</h3>
                            </div>
                            <p className="text-sm font-semibold text-white leading-snug">{portfolioData.thesis.title}</p>
                        </div>
                    </motion.div>

                    {/* Location & Status */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.25 }}
                        className="md:col-span-4 glass-card p-5 rounded-3xl relative overflow-hidden group hover:-translate-y-1 transition-all duration-500"
                    >
                        <div className="absolute inset-0 bg-gradient-to-l from-secondary/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="relative z-10">
                            <div className="flex items-center gap-2 mb-2">
                                <MapPin className="w-3.5 h-3.5 text-primary" />
                                <h3 className="text-xs font-medium text-gray-400">Location</h3>
                            </div>
                            <p className="text-sm font-medium text-white mb-2">Dhaka, Bangladesh</p>
                            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-500/10 border border-green-500/20 w-fit">
                                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                                <span className="text-[10px] text-green-400 font-medium">Available</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Core Expertise */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="md:col-span-4 glass-card p-5 rounded-3xl relative overflow-hidden group hover:-translate-y-1 transition-all duration-500"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.03] via-secondary/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="relative z-10">
                            <h3 className="text-xs font-medium text-gray-400 mb-2">Core Expertise</h3>
                            <div className="flex flex-wrap gap-1.5">
                                {[
                                    { name: "AI/ML", color: "text-primary bg-primary/10 border-primary/20" },
                                    { name: "Full Stack", color: "text-blue-400 bg-blue-400/10 border-blue-400/20" },
                                    { name: "CV", color: "text-green-400 bg-green-400/10 border-green-400/20" },
                                    { name: "Mobile", color: "text-orange-400 bg-orange-400/10 border-orange-400/20" }
                                ].map((spec) => (
                                    <div
                                        key={spec.name}
                                        className={'px-2.5 py-1 rounded-lg text-xs ' + spec.color + ' border'}
                                    >
                                        {spec.name}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
