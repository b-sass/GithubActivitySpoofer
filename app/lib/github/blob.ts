import { verifySession } from "@/app/actions/session";
import { Octokit } from "@octokit/core"
import { RequestError } from "@octokit/request-error";

const session = await verifySession()
const octokit = new Octokit({ auth: session.accessToken });

export const getBlob = async (owner: string, repo: string, sha: string) => {
    try {
        const response = await octokit.request('GET /repos/{owner}/{repo}/git/blobs/{file_sha}', {
            owner: owner,
            repo: repo,
            file_sha: sha,
            headers: {
                'X-GitHub-Api-Version': '2022-11-28'
            }
        })
        console.log("Found blob")
        return response
    } catch (e) {
        if (e instanceof RequestError) {
            console.log(`Could not create blob.\nError: ${e}`)
        }
        return null
    }
};

export const createBlob = async (owner: string, repo: string, content: string) => {
    try {
        const response = await octokit.request('POST /repos/{owner}/{repo}/git/blobs', {
            owner: owner,
            repo: repo,
            content: content,
            encoding: 'utf-8',
            headers: {
                'X-GitHub-Api-Version': '2022-11-28'
            }
        })
        console.log("Created blob")
        return response
    } catch (e) {
        if (e instanceof RequestError) {
            console.log(`Could not create blob.\nError: ${e}`)
        }
        return null
    }
};