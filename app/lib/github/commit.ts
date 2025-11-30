import { verifySession } from "@/app/actions/session";
import { Octokit } from "@octokit/core"
import { RequestError } from "@octokit/request-error";

// Get the most recent commit from the main branch
export const getLatestCommit = async (owner: string, repo: string, ref: string) => {
    const session = await verifySession()
    const octokit = new Octokit({ auth: session.accessToken });
    
    try {
        const response = await octokit.request('GET /repos/{owner}/{repo}/commits/{ref}', {
            owner: owner,
            repo: repo,
            ref: ref,   // "heads/{branch}" or "tags/{tag}" https://git-scm.com/book/en/v2/Git-Internals-Git-References
            headers: {
                'X-GitHub-Api-Version': '2022-11-28'
            }
        })
        console.log("Found latest commit.")
        return response
    } catch (e) {
        if (e instanceof RequestError) {
            console.log(`Could not get recent commit.\nError: ${e}`)
        }
        return null
    }
};

export const createCommitObject = async (owner: string, repo: string, parentCommit: string, 
    newTree: string, author: {name: string, email: string}) => {
        
    const session = await verifySession()
    const octokit = new Octokit({ auth: session.accessToken });

    try {
        const response = await octokit.request('POST /repos/{owner}/{repo}/git/commits', {
            owner: owner,
            repo: repo,
            message: 'my commit message',
            author: author,
            committer: author,
            parents: [
                parentCommit
            ],
            tree: newTree,
            headers: {
                'X-GitHub-Api-Version': '2022-11-28'
            }
        })
        console.log("Created commit object.")
        return response
    } catch (e) {
        if (e instanceof RequestError) {
            console.log(`Could not create commit object.\nError: ${e}`)
        }
        return null
    }
};