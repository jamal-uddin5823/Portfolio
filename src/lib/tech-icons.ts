// Local icons that aren't available on Simple Icons CDN
const localIcons: Record<string, string> = {
    "Hyperledger Fabric": "/icons/hyperledger.svg",
};

// Shared utility for mapping technology names to Simple Icons slugs
export const getTechIconUrl = (tech: string): string | null => {
    // Check for local icons first
    if (localIcons[tech]) {
        return localIcons[tech];
    }

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
        "Tailwind CSS": "tailwindcss",

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
        "Pytorch": "pytorch",
        "OpenCV": "opencv",
        "Scikit-learn": "scikitlearn",
        "LangChain": "langchain",
        "LangGraph": "langchain",
        "Hugging Face": "huggingface",
        "Gemini 2.5": "googlegemini",
        "Google Lens Reverse Image Search": "google",

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
        "Stripe API": "stripe",
        "Google Maps API": "googlemaps",
        "Tkinter": "python",
        "Pyaudio": "python",
        "Room Database": "android",
        "Android": "android",
        "Mistral AI": "mistralai",
        "MistralAI": "mistralai",
        "iOS": "apple",
        "MacOS": "apple",
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
        "Hyperledger Fabric": "⛓️",
    };

    return emojis[tech] || "💻";
};
