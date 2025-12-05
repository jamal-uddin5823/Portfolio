"use client";

import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Github, ExternalLink, Trophy } from "lucide-react";
import Link from "next/link";
import portfolioData from "@/data/portfolio.json";
import { CardContainer, CardBody, CardItem } from "@/components/ui/3d-card";
import { getTechIconUrl, getTechEmoji } from "@/lib/tech-icons";

export default function Projects() {
    const championProject = portfolioData.projects.find(p => (p as any).achievement?.position === "Champion");
    const otherProjects = portfolioData.projects.filter(p => (p as any).achievement?.position !== "Champion");

    return (
        <section id="projects" className="py-20 px-6">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gradient">
                    Featured Projects
                </h2>

                {/* Champion Project - First Row */}
                {championProject && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0 }}
                        viewport={{ once: true }}
                        className="mb-6"
                    >
                        <CardContainer className="inter-var w-full h-full p-0 py-0">
                            <CardBody className="glass-card relative group/card w-full h-[500px] border-2 border-yellow-500/30 shadow-[0_0_20px_rgba(234,179,8,0.2)] rounded-xl p-6 flex flex-col">
                                <CardItem
                                    translateZ="50"
                                    className="text-xl font-bold text-neutral-600 dark:text-white truncate w-full"
                                >
                                    {championProject.title}
                                    {/* @ts-ignore */}
                                    {championProject.status === "Ongoing" && (
                                        <Badge variant="secondary" className="ml-2 bg-primary/20 text-primary border border-primary/20 shadow-[0_0_10px_rgba(0,255,255,0.2)]">
                                            Ongoing
                                        </Badge>
                                    )}
                                </CardItem>
                                {/* @ts-ignore */}
                                {championProject.achievement && (
                                    <CardItem translateZ="40" className="mt-2">
                                        <Badge variant="secondary" className="bg-yellow-500/20 text-yellow-300 border border-yellow-500/30 shadow-[0_0_10px_rgba(234,179,8,0.3)] flex items-center gap-1 w-fit">
                                            <Trophy className="w-3 h-3" />
                                            {/* @ts-ignore */}
                                            {championProject.achievement.position} - {championProject.achievement.hackathon}
                                        </Badge>
                                    </CardItem>
                                )}
                                <CardItem
                                    as="p"
                                    translateZ="60"
                                    className="text-neutral-500 text-sm max-w-full mt-2 dark:text-neutral-300 line-clamp-4 flex-grow"
                                >
                                    {championProject.description}
                                </CardItem>
                                <CardItem translateZ="80" className="w-full mt-4">
                                    <div className="flex flex-wrap gap-2">
                                        {championProject.tech.map((tech) => {
                                            const iconUrl = getTechIconUrl(tech);
                                            return iconUrl ? (
                                                <div key={tech} className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 group-hover/card:border-primary/20 transition-colors" title={tech}>
                                                    <img src={iconUrl} alt={tech} className="w-4 h-4 object-contain" />
                                                    <span className="text-xs text-gray-300">{tech}</span>
                                                </div>
                                            ) : (
                                                <div key={tech} className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 group-hover/card:border-primary/20 transition-colors" title={tech}>
                                                    <span className="text-sm">{getTechEmoji(tech)}</span>
                                                    <span className="text-xs text-gray-300">{tech}</span>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </CardItem>
                                <div className="flex justify-between items-center mt-auto pt-6 gap-3">
                                    <CardItem
                                        translateZ={20}
                                        as={Link}
                                        href={championProject.link}
                                        target="_blank"
                                        className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white hover:text-primary transition-colors flex items-center gap-1"
                                    >
                                        <Github className="w-3 h-3" />
                                        View Code
                                    </CardItem>
                                    {/* @ts-ignore */}
                                    {championProject.liveLink && (
                                        <CardItem
                                            translateZ={20}
                                            as={Link}
                                            href={championProject.liveLink}
                                            target="_blank"
                                            className="px-4 py-2 rounded-xl text-xs font-normal bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 transition-colors flex items-center gap-1"
                                        >
                                            <ExternalLink className="w-3 h-3" />
                                            Live Demo
                                        </CardItem>
                                    )}
                                </div>
                            </CardBody>
                        </CardContainer>
                    </motion.div>
                )}

                {/* Other Projects - Remaining Rows */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {otherProjects.map((project, index) => {
                        return (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: (index + 1) * 0.1 }}
                            viewport={{ once: true }}
                        >
                            <CardContainer className="inter-var w-full h-full p-0 py-0">
                                <CardBody className="glass-card relative group/card w-full h-[450px] rounded-xl p-6 flex flex-col">
                                    <CardItem
                                        translateZ="50"
                                        className="text-xl font-bold text-neutral-600 dark:text-white truncate w-full"
                                    >
                                        {project.title}
                                        {/* @ts-ignore */}
                                        {project.status === "Ongoing" && (
                                            <Badge variant="secondary" className="ml-2 bg-primary/20 text-primary border border-primary/20 shadow-[0_0_10px_rgba(0,255,255,0.2)]">
                                                Ongoing
                                            </Badge>
                                        )}
                                    </CardItem>
                                    <CardItem
                                        as="p"
                                        translateZ="60"
                                        className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300 line-clamp-3 flex-grow"
                                    >
                                        {project.description}
                                    </CardItem>
                                    <CardItem translateZ="80" className="w-full mt-4">
                                        <div className="flex flex-wrap gap-2">
                                            {project.tech.map((tech) => {
                                                const iconUrl = getTechIconUrl(tech);
                                                return iconUrl ? (
                                                    <div key={tech} className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 group-hover/card:border-primary/20 transition-colors" title={tech}>
                                                        <img src={iconUrl} alt={tech} className="w-4 h-4 object-contain" />
                                                        <span className="text-xs text-gray-300">{tech}</span>
                                                    </div>
                                                ) : (
                                                    <div key={tech} className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 group-hover/card:border-primary/20 transition-colors" title={tech}>
                                                        <span className="text-sm">{getTechEmoji(tech)}</span>
                                                        <span className="text-xs text-gray-300">{tech}</span>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </CardItem>
                                    <div className="flex justify-between items-center mt-auto pt-6 gap-3">
                                        <CardItem
                                            translateZ={20}
                                            as={Link}
                                            href={project.link}
                                            target="_blank"
                                            className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white hover:text-primary transition-colors flex items-center gap-1"
                                        >
                                            <Github className="w-3 h-3" />
                                            View Code
                                        </CardItem>
                                        {/* @ts-ignore */}
                                        {project.liveLink && (
                                            <CardItem
                                                translateZ={20}
                                                as={Link}
                                                href={project.liveLink}
                                                target="_blank"
                                                className="px-4 py-2 rounded-xl text-xs font-normal bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 transition-colors flex items-center gap-1"
                                            >
                                                <ExternalLink className="w-3 h-3" />
                                                Live Demo
                                            </CardItem>
                                        )}
                                    </div>
                                </CardBody>
                            </CardContainer>
                        </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
