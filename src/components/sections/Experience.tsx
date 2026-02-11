"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import portfolioData from "@/data/portfolio.json";
import { TracingBeam } from "@/components/ui/tracing-beam";
import { GraduationCap, Trophy, FileBadge, Info, Briefcase } from "lucide-react";
import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

export default function Experience() {
    const [selectedHackathon, setSelectedHackathon] = useState<any>(null);
    const [selectedExperience, setSelectedExperience] = useState<any>(null);

    return (
        <section id="experience" className="py-20 px-6 bg-black/20">
            <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold mb-12 text-gradient text-center">
                    Journey & Achievements
                </h2>

                <TracingBeam className="px-6">
                    <div className="space-y-12 relative">

                        {/* Work Experience */}
                        {portfolioData.experience.map((exp, index) => {
                            // @ts-ignore
                            const hasDetails = exp.responsibilities && exp.responsibilities.length > 0;
                            return (
                            <motion.div
                                key={`exp-${index}`}
                                initial={{ opacity: 0, x: -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
                            >
                                <div className="flex items-center justify-center w-10 h-10 rounded-full border border-green-500/50 bg-green-500/20 text-green-300 shadow-sm backdrop-blur-md shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 shadow-[0_0_15px_rgba(34,197,94,0.3)]">
                                    <Briefcase className="w-5 h-5" />
                                </div>
                                <div
                                    className={`w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] glass-card p-6 rounded-xl border border-white/10 shadow-lg hover:border-green-500/30 transition-all duration-300 ${hasDetails ? 'cursor-pointer' : ''}`}
                                    onClick={() => hasDetails && setSelectedExperience(exp)}
                                >
                                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                                        <div className="font-bold text-white text-lg">{exp.position}</div>
                                        <time className="font-caveat font-medium text-green-400 text-sm sm:text-base">{exp.duration}</time>
                                    </div>
                                    <div className="text-slate-300 font-semibold mb-1">{exp.company}</div>
                                    <div className="text-slate-500 text-sm mb-2">{exp.location}</div>
                                    {hasDetails && (
                                        <div className="text-green-400 text-xs font-medium mt-2 flex items-center gap-1 opacity-70 hover:opacity-100 transition-opacity">
                                            <Info className="w-3 h-3" />
                                            Click for details
                                        </div>
                                    )}
                                    {/* @ts-ignore */}
                                    {exp.link && (
                                        <div className="mt-4 rounded-lg overflow-hidden border border-white/10 hover:border-green-500/30 transition-all group/exp">
                                            <img
                                                src={exp.link}
                                                alt={`${exp.company} certificate`}
                                                className="w-full h-auto object-cover group-hover/exp:scale-105 transition-transform duration-300"
                                                loading="lazy"
                                            />
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                            );
                        })}

                        {/* Education */}
                        {portfolioData.education.map((edu, index) => (
                            <motion.div
                                key={`edu-${index}`}
                                initial={{ opacity: 0, x: 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
                            >
                                <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white/10 bg-white/5 text-neutral-400 shadow-sm backdrop-blur-md shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                                    <GraduationCap className="w-5 h-5" />
                                </div>
                                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] glass-card p-6 rounded-xl border border-white/10 shadow-lg hover:border-primary/30 transition-all duration-300">
                                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-1">
                                        <div className="font-bold text-white text-lg">{edu.degree}</div>
                                        <time className="font-caveat font-medium text-primary text-sm sm:text-base">{edu.year}</time>
                                    </div>
                                    <div className="text-slate-400 font-medium">{edu.institution}</div>
                                </div>
                            </motion.div>
                        ))}

                        {/* Hackathons */}
                        {portfolioData.hackathons.map((hack, index) => {
                            const isChampion = hack.position === "Champion";
                            // @ts-ignore
                            const hasDetails = hack.details;
                            return (
                            <motion.div
                                key={`hack-${index}`}
                                initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
                            >
                                <div className={`flex items-center justify-center w-10 h-10 rounded-full border ${isChampion ? 'border-yellow-500/50 bg-yellow-500/20 text-yellow-300 shadow-[0_0_15px_rgba(234,179,8,0.4)]' : 'border-white/10 bg-white/5 text-neutral-400'} shadow-sm backdrop-blur-md shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10`}>
                                    <Trophy className="w-5 h-5" />
                                </div>
                                <div
                                    className={`w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] glass-card p-6 rounded-xl border border-white/10 shadow-lg hover:border-secondary/30 transition-all duration-300 ${hasDetails ? 'cursor-pointer' : ''}`}
                                    onClick={() => hasDetails && setSelectedHackathon(hack)}
                                >
                                    <div className="flex items-center justify-between space-x-2 mb-1">
                                        <div className="font-bold text-white text-lg">{hack.title}</div>
                                        <Badge variant="secondary" className="bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 shadow-[0_0_5px_rgba(234,179,8,0.2)]">{hack.position}</Badge>
                                    </div>
                                    <div className="text-slate-400 font-medium">{hack.team}</div>
                                    {/* @ts-ignore */}
                                    {hack.organizer && <div className="text-slate-500 text-sm mt-1">{hack.organizer}</div>}
                                    {/* @ts-ignore */}
                                    {hack.issued_on && <div className="text-primary text-sm font-medium mt-2">{hack.issued_on}</div>}
                                    {hasDetails && (
                                        <div className="text-secondary text-xs font-medium mt-2 flex items-center gap-1 opacity-70 hover:opacity-100 transition-opacity">
                                            <Info className="w-3 h-3" />
                                            Click for details
                                        </div>
                                    )}
                                    {/* @ts-ignore */}
                                    {hack.link && (
                                        <div className="block mt-3 rounded-lg overflow-hidden border border-white/10 hover:border-secondary/30 transition-all group/hack">
                                            <img
                                                src={hack.link}
                                                alt={`${hack.title} certificate`}
                                                className="w-full h-auto object-cover group-hover/hack:scale-105 transition-transform duration-300"
                                                loading="lazy"
                                            />
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                            );
                        })}

                        {/* Certifications */}
                        {portfolioData.certifications.map((cert, index) => {
                            // Extract certificate ID from the link for Coursera certificates
                            const certIdMatch = cert.link.match(/verify\/([A-Z0-9]+)/);
                            const certId = certIdMatch ? certIdMatch[1] : null;
                            // Check if it's a local image path
                            const isLocalImage = cert.link.startsWith('/');

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
                                        <div className="flex flex-col space-y-1 mb-3">
                                            <div className="font-bold text-white text-lg">{cert.name}</div>
                                            <div className="text-slate-400 text-sm">{cert.issuer}</div>
                                            {/* @ts-ignore */}
                                            {cert.event && <div className="text-slate-500 text-xs">{cert.event}</div>}
                                            <div className="text-primary text-sm font-medium">{cert.issued_on}</div>
                                        </div>
                                        {(certId || isLocalImage) && (
                                            <div className="block mb-3 rounded-lg overflow-hidden border border-white/10 hover:border-primary/30 transition-all group/cert">
                                                <img
                                                    src={isLocalImage ? cert.link : `https://s3.amazonaws.com/coursera_assets/meta_images/generated/CERTIFICATE_LANDING_PAGE/CERTIFICATE_LANDING_PAGE~${certId}/CERTIFICATE_LANDING_PAGE~${certId}.jpeg`}
                                                    alt={cert.name}
                                                    className="w-full h-auto object-cover group-hover/cert:scale-105 transition-transform duration-300"
                                                    loading="lazy"
                                                />
                                            </div>
                                        )}
                                        {!isLocalImage && (
                                            <a href={cert.link} target="_blank" rel="noopener noreferrer" className="text-primary text-sm hover:underline hover:text-primary/80 transition-colors flex items-center gap-1">
                                                View Certificate
                                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                                            </a>
                                        )}
                                    </div>
                                </motion.div>
                            );
                        })}

                    </div>
                </TracingBeam>
            </div>

            {/* Experience Details Modal */}
            <Dialog open={!!selectedExperience} onOpenChange={() => setSelectedExperience(null)}>
                <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto bg-black/95 border border-white/10">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-bold text-white flex items-center gap-3">
                            <Briefcase className="w-6 h-6 text-green-400" />
                            {selectedExperience?.position}
                        </DialogTitle>
                        <div className="flex flex-col gap-1 mt-2">
                            <div className="text-lg text-slate-300 font-semibold">{selectedExperience?.company}</div>
                            <div className="text-slate-400 text-sm">{selectedExperience?.location}</div>
                            <span className="text-green-400 text-sm font-medium">
                                {selectedExperience?.duration}
                            </span>
                        </div>
                    </DialogHeader>
                    <div className="text-slate-300 mt-4 space-y-4">
                        {/* @ts-ignore */}
                        {selectedExperience?.responsibilities && (
                            <div className="space-y-3">
                                <h3 className="text-white font-semibold text-lg mb-3">Key Responsibilities:</h3>
                                {/* @ts-ignore */}
                                {selectedExperience.responsibilities.map((resp, idx) => (
                                    <div key={idx} className="flex items-start gap-3 bg-white/5 p-3 rounded-lg border border-white/10">
                                        <span className="text-green-400 mt-1 shrink-0">•</span>
                                        <span className="text-slate-300 leading-relaxed">{resp}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                        {/* @ts-ignore */}
                        {selectedExperience?.link && (
                            <div className="mt-4 rounded-lg overflow-hidden border border-white/10">
                                <img
                                    src={selectedExperience.link}
                                    alt={`${selectedExperience?.company} certificate`}
                                    className="w-full h-auto object-cover"
                                    loading="lazy"
                                />
                            </div>
                        )}
                    </div>
                </DialogContent>
            </Dialog>

            {/* Hackathon Details Modal */}
            <Dialog open={!!selectedHackathon} onOpenChange={() => setSelectedHackathon(null)}>
                <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto bg-black/95 border border-white/10">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-bold text-white flex items-center gap-3">
                            <Trophy className="w-6 h-6 text-yellow-500" />
                            {selectedHackathon?.title}
                        </DialogTitle>
                        <div className="flex items-center gap-2 mt-2">
                            <Badge variant="secondary" className="bg-yellow-500/10 text-yellow-500 border border-yellow-500/20">
                                {selectedHackathon?.position}
                            </Badge>
                            {/* @ts-ignore */}
                            {selectedHackathon?.issued_on && (
                                <span className="text-primary text-sm font-medium">
                                    {/* @ts-ignore */}
                                    {selectedHackathon.issued_on}
                                </span>
                            )}
                        </div>
                    </DialogHeader>
                    <div className="text-slate-300 mt-4 space-y-4">
                        <div>
                            <div className="text-slate-400 font-medium mb-1">
                                <span className="text-white font-semibold">Team:</span> {selectedHackathon?.team}
                            </div>
                            {/* @ts-ignore */}
                            {selectedHackathon?.organizer && (
                                <div className="text-slate-400 font-medium">
                                    {/* @ts-ignore */}
                                    <span className="text-white font-semibold">Organizer:</span> {selectedHackathon.organizer}
                                </div>
                            )}
                        </div>
                        {/* @ts-ignore */}
                        {selectedHackathon?.details && (
                            <div className="prose prose-invert max-w-none">
                                <div className="text-slate-300 leading-relaxed whitespace-pre-line">
                                    {/* @ts-ignore */}
                                    {selectedHackathon.details}
                                </div>
                            </div>
                        )}
                        {/* @ts-ignore */}
                        {selectedHackathon?.link && (
                            <div className="mt-4 rounded-lg overflow-hidden border border-white/10">
                                <img
                                    src={selectedHackathon.link}
                                    alt={`${selectedHackathon?.title} certificate`}
                                    className="w-full h-auto object-cover"
                                    loading="lazy"
                                />
                            </div>
                        )}
                    </div>
                </DialogContent>
            </Dialog>
        </section>
    );
}
