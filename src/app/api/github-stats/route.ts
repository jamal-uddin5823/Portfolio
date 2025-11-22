import { NextResponse } from 'next/server';

const GITHUB_API = 'https://api.github.com';

export const dynamic = 'force-dynamic';
export const revalidate = 3600;

// Fallback data when API fails
const FALLBACK_DATA = {
    publicRepos: 15,
    followers: 10,
    totalStars: 25,
    topLanguages: [
        { name: 'Python', percentage: 35.5 },
        { name: 'C', percentage: 25.3 },
        { name: 'JavaScript', percentage: 20.2 },
        { name: 'Java', percentage: 10.5 },
        { name: 'TypeScript', percentage: 8.5 }
    ],
    currentStreak: 12,
    longestStreak: 45,
    totalContributions: 850,
};

export async function GET() {
    try {
        const username = 'jamal-uddin5823';
        const token = process.env.GITHUB_PAT || process.env.NEXT_PUBLIC_GITHUB_PAT;

        console.log('Fetching GitHub stats for:', username);
        console.log('Token available:', !!token);

        const headers: HeadersInit = {
            'Accept': 'application/vnd.github.v3+json',
        };

        if (token) {
            headers['Authorization'] = 'Bearer ' + token;
        }

        // Fetch user data
        const userResponse = await fetch(GITHUB_API + '/users/' + username, {
            headers,
            cache: 'no-store'
        });

        if (!userResponse.ok) {
            const errorText = await userResponse.text();
            console.error('GitHub API error:', userResponse.status, errorText);

            // If 403 (rate limit or auth issue), return fallback data
            if (userResponse.status === 403) {
                console.log('Using fallback data due to 403 error');
                return NextResponse.json(FALLBACK_DATA);
            }

            throw new Error('GitHub API responded with ' + userResponse.status);
        }

        const userData = await userResponse.json();

        // Fetch repositories
        const reposResponse = await fetch(GITHUB_API + '/users/' + username + '/repos?per_page=100&sort=updated', {
            headers,
            cache: 'no-store'
        });

        if (!reposResponse.ok) {
            console.error('Repos fetch failed:', reposResponse.status);
            if (reposResponse.status === 403) {
                console.log('Using fallback data due to 403 error on repos');
                return NextResponse.json(FALLBACK_DATA);
            }
            throw new Error('Failed to fetch repositories');
        }

        const repos = await reposResponse.json();
        const totalStars = repos.reduce((acc: number, repo: any) => acc + repo.stargazers_count, 0);

        // Calculate ACCURATE language statistics using language API for each repo
        const languageBytes: { [key: string]: number } = {};
        let totalBytes = 0;

        // Fetch language data for each repository
        const languagePromises = repos.map(async (repo: any) => {
            if (!repo.fork) { // Skip forked repos
                try {
                    const langResponse = await fetch(GITHUB_API + '/repos/' + username + '/' + repo.name + '/languages', {
                        headers,
                        cache: 'no-store'
                    });
                    if (langResponse.ok) {
                        return await langResponse.json();
                    }
                } catch (error) {
                    console.error('Failed to fetch languages for repo:', repo.name);
                }
            }
            return null;
        });

        const repoLanguages = await Promise.all(languagePromises);

        // Aggregate language bytes from all repos
        repoLanguages.forEach((langData) => {
            if (langData) {
                Object.entries(langData).forEach(([lang, bytes]) => {
                    languageBytes[lang] = (languageBytes[lang] || 0) + (bytes as number);
                    totalBytes += bytes as number;
                });
            }
        });

        // Sort and get top 6 languages with percentages
        const topLanguages = Object.entries(languageBytes)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 6)
            .map(([lang, bytes]) => ({
                name: lang,
                percentage: parseFloat(((bytes / totalBytes) * 100).toFixed(2))
            }));

        // Fetch streak stats from github-readme-streak-stats
        let streakData = { currentStreak: 0, longestStreak: 0, totalContributions: 0 };
        try {
            const streakResponse = await fetch('https://github-readme-streak-stats.herokuapp.com/?user=' + username + '&type=json', {
                cache: 'no-store'
            });
            if (streakResponse.ok) {
                const streak = await streakResponse.json();
                console.log('Streak API response:', streak);

                // Parse the streak data correctly
                streakData = {
                    currentStreak: parseInt(streak.currentStreak?.length || streak.currentStreak || '0'),
                    longestStreak: parseInt(streak.longestStreak?.length || streak.longestStreak || '0'),
                    totalContributions: parseInt(streak.totalContributions || '0')
                };
            }
        } catch (error) {
            console.error('Failed to fetch streak data:', error);
            // Use fallback streak data
            streakData = {
                currentStreak: FALLBACK_DATA.currentStreak,
                longestStreak: FALLBACK_DATA.longestStreak,
                totalContributions: FALLBACK_DATA.totalContributions
            };
        }

        const result = {
            publicRepos: userData.public_repos,
            followers: userData.followers,
            totalStars,
            topLanguages: topLanguages.length > 0 ? topLanguages : FALLBACK_DATA.topLanguages,
            currentStreak: streakData.currentStreak,
            longestStreak: streakData.longestStreak,
            totalContributions: streakData.totalContributions,
        };

        console.log('GitHub stats:', result);

        return NextResponse.json(result);
    } catch (error) {
        console.error('Error in GitHub stats API:', error);
        // Return fallback data instead of error
        console.log('Using fallback data due to error');
        return NextResponse.json(FALLBACK_DATA);
    }
}
