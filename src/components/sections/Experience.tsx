"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import portfolioData from "@/data/portfolio.json";
import { TracingBeam } from "@/components/ui/tracing-beam";
import { GraduationCap, Trophy, FileBadge } from "lucide-react";

export default function Experience() {
    return (
        <section id="experience" className="py-20 px-6 bg-black/20">
            <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold mb-12 text-gradient text-center">
                    Journey & Achievements
                </h2>

                <TracingBeam className="px-6">
                    <div className="space-y-12 relative">

                        {/* Education */}
                        {portfolioData.education.map((edu, index) => (
                            <motion.div
                                key={`edu-${index}`}
                                initial={{ opacity: 0, x: -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
                            >
                                <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white/10 bg-white/5 text-neutral-400 shadow-sm backdrop-blur-md shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                                    <GraduationCap className="w-5 h-5" />
                                </div>
                                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] glass-card p-6 rounded-xl border border-white/10 shadow-lg hover:border-primary/30 transition-all duration-300">
                                    <div className="flex items-center justify-between space-x-2 mb-1">
                                        <div className="font-bold text-white text-lg">{edu.degree}</div>
                                        <time className="font-caveat font-medium text-primary">{edu.year}</time>
                                    </div>
                                    <div className="text-slate-400 font-medium">{edu.institution}</div>
                                </div>
                            </motion.div>
                        ))}

                        {/* Hackathons */}
                        {portfolioData.hackathons.map((hack, index) => (
                            <motion.div
                                key={`hack-${index}`}
                                initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
                            >
                                <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white/10 bg-white/5 text-neutral-400 shadow-sm backdrop-blur-md shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                                    <Trophy className="w-5 h-5" />
                                </div>
                                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] glass-card p-6 rounded-xl border border-white/10 shadow-lg hover:border-secondary/30 transition-all duration-300">
                                    <div className="flex items-center justify-between space-x-2 mb-1">
                                        <div className="font-bold text-white text-lg">{hack.title}</div>
                                        <Badge variant="secondary" className="bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 shadow-[0_0_5px_rgba(234,179,8,0.2)]">{hack.position}</Badge>
                                    </div>
                                    <div className="text-slate-400 font-medium">{hack.team}</div>
                                    {/* @ts-ignore */}
                                    {hack.organizer && <div className="text-slate-500 text-sm mt-1">{hack.organizer}</div>}
                                </div>
                            </motion.div>
                        ))}

                        {/* Certifications */}
                        {portfolioData.certifications.map((cert, index) => {
                            // Extract certificate ID from the link
                            const certIdMatch = cert.link.match(/verify\/([A-Z0-9]+)/);
                            const certId = certIdMatch ? certIdMatch[1] : null;

                            return (
                                <motion.div
                                    key={`cert-${index}`}
                                    initial={{ opacity: 0, x: -50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
                                >
                                    <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white/10 bg-white/5 text-neutral-400 shadow-sm backdrop-blur-md shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                                        <FileBadge className="w-5 h-5" />
                                    </div>
                                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] glass-card p-6 rounded-xl border border-white/10 shadow-lg hover:border-blue-500/30 transition-all duration-300">
                                        <div className="flex items-center justify-between space-x-2 mb-3">
                                            <div className="font-bold text-white text-lg">{cert.name}</div>
                                        </div>
                                        {certId && (
                                            <a
                                                href={cert.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="block mb-3 rounded-lg overflow-hidden border border-white/10 hover:border-primary/30 transition-all group/cert"
                                            >
                                                <img
                                                    src={`https://s3.amazonaws.com/coursera_assets/meta_images/generated/CERTIFICATE_LANDING_PAGE/CERTIFICATE_LANDING_PAGE~${certId}/CERTIFICATE_LANDING_PAGE~${certId}.jpeg`}
                                                    alt={cert.name}
                                                    className="w-full h-auto object-cover group-hover/cert:scale-105 transition-transform duration-300"
                                                    loading="lazy"
                                                />
                                            </a>
                                        )}
                                        <a href={cert.link} target="_blank" rel="noopener noreferrer" className="text-primary text-sm hover:underline hover:text-primary/80 transition-colors flex items-center gap-1">
                                            View Certificate
                                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                                        </a>
                                    </div>
                                </motion.div>
                            );
                        })}

                    </div>
                </TracingBeam>
            </div>
        </section>
    );
}
