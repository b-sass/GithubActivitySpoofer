import { verifySession } from "@/app/actions/session";
import { Octokit } from "@octokit/core"
import { RequestError } from "@octokit/request-error";

export const updateMainBranchReference = async (owner: string, repo: string, newReference: string) => {
    const session = await verifySession()
    const octokit = new Octokit({ auth: session.accessToken });
    const branch = "heads/main"
    
    try {
        const response = await octokit.request('PATCH /repos/{owner}/{repo}/git/refs/{ref}', {
            owner: owner,
            repo: repo,
            ref: branch,
            sha: newReference,
            force: true,
            headers: {
                'X-GitHub-Api-Version': '2022-11-28'
            }
        })
        console.log("Updated branch reference.")
        return response
    } catch (e) {
        if (e instanceof RequestError) {
            console.log(`Could not update branch reference.\nError: ${e}`)
        }
        return null
    }
};