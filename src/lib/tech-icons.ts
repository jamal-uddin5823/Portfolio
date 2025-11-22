// Shared utility for mapping technology names to Simple Icons slugs
export const getTechIconUrl = (tech: string): string | null => {
    const slugs: Record<string, string> = {
        // Languages
        "Python": "python",
        "C/C++": "cplusplus",
        "Java": "openjdk",
        "JavaScript": "javascript",
        "TypeScript": "typescript",
        "Go": "go",

        // Frontend
        "React": "react",
        "Next.js": "nextdotjs",
        "React Native": "react",
        "Expo": "expo",
        "Electron": "electron",
        "HTML": "html5",
        "CSS": "css",

        // Backend
        "Express": "express",
        "Spring Boot": "springboot",
        "FastAPI": "fastapi",
        "Firebase": "firebase",
        "RESTful APIs": "swagger",
        "GraphQL": "graphql",

        // Databases
        "PostgreSQL": "postgresql",
        "MySQL": "mysql",
        "MongoDB": "mongodb",
        "Redis": "redis",

        // AI/ML
        "TensorFlow": "tensorflow",
        "Keras": "keras",
        "PyTorch": "pytorch",
        "OpenCV": "opencv",
        "Scikit-learn": "scikitlearn",
        "LangChain": "langchain",
        "Hugging Face": "huggingface",
        "AI": "openai",
        "Gemini 2.5": "googlegemini",
        "Foundational Models": "openai",

        // Tools
        "Git": "git",
        "Docker": "docker",
        "Linux": "linux",
        "Bash": "gnubash",
        "Postman": "postman",

        // Additional (for projects)
        "Computer Vision": "opencv",
        "AR": "meta",
        "Networking": "cisco",
        "P2P": "webrtc",
        "Mobile": "android",
    };

    const slug = slugs[tech];
    if (!slug) return null;
    return `https://cdn.simpleicons.org/${slug}`;
};

// Fallback emojis for technologies without logos
export const getTechEmoji = (tech: string): string => {
    const emojis: Record<string, string> = {
        "AI": "🤖",
        "Foundational Models": "🧠",
        "Mobile": "📱",
        "Computer Vision": "👁️",
        "AR": "🥽",
        "Networking": "🌐",
        "P2P": "🔗",
        "AI Recommendations": "💡",
    };

    return emojis[tech] || "💻";
};
