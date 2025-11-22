// GitHub API utility for fetching user stats
const GITHUB_API = 'https://api.github.com';

export interface GitHubStats {
    publicRepos: number;
    followers: number;
    totalStars: number;
    contributions: number;
}

export async function fetchGitHubStats(username: string): Promise<GitHubStats | null> {
    try {
        const token = process.env.NEXT_PUBLIC_GITHUB_TOKEN || process.env.GITHUB_TOKEN;

        const headers: HeadersInit = {
            'Accept': 'application/vnd.github.v3+json',
        };

        if (token) {
            headers['Authorization'] = `token ${token}`;
        }

        // Fetch user data
        const userResponse = await fetch(`${GITHUB_API}/users/${username}`, {
            headers,
            next: { revalidate: 3600 } // Cache for 1 hour
        });

        if (!userResponse.ok) {
            throw new Error('Failed to fetch user data');
        }

        const userData = await userResponse.json();

        // Fetch repositories to calculate total stars
        const reposResponse = await fetch(`${GITHUB_API}/users/${username}/repos?per_page=100`, {
            headers,
            next: { revalidate: 3600 }
        });

        if (!reposResponse.ok) {
            throw new Error('Failed to fetch repositories');
        }

        const repos = await reposResponse.json();
        const totalStars = repos.reduce((acc: number, repo: any) => acc + repo.stargazers_count, 0);

        return {
            publicRepos: userData.public_repos,
            followers: userData.followers,
            totalStars,
            contributions: 0, // Will be replaced with actual contribution count if available
        };
    } catch (error) {
        console.error('Error fetching GitHub stats:', error);
        return null;
    }
}
