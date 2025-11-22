"use client";

import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Github, ExternalLink } from "lucide-react";
import Link from "next/link";
import portfolioData from "@/data/portfolio.json";
import { CardContainer, CardBody, CardItem } from "@/components/ui/3d-card";
import { getTechIconUrl, getTechEmoji } from "@/lib/tech-icons";

export default function Projects() {
    return (
        <section id="projects" className="py-20 px-6">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold mb-12 text-gradient">
                    Featured Projects
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {portfolioData.projects.map((project, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
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
                                    <div className="flex justify-between items-center mt-auto pt-6">
                                        <CardItem
                                            translateZ={20}
                                            as={Link}
                                            href={project.link}
                                            target="_blank"
                                            className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white hover:text-primary transition-colors"
                                        >
                                            View Code →
                                        </CardItem>
                                    </div>
                                </CardBody>
                            </CardContainer>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
