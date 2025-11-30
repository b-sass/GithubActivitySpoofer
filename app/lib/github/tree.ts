import { Octokit } from "@octokit/core"
import { treeFile } from "../definitions";
import { RequestError } from "@octokit/request-error";
import { Endpoints } from "@octokit/types";
import { verifySession } from "@/app/actions/session";

const session = await verifySession()
const octokit = new Octokit({ auth: session.accessToken });

export const getTreeObject = async (owner: string, repo: string, sha: string) => {
    try {
        const response = await octokit.request('GET /repos/{owner}/{repo}/git/trees/{tree_sha}', {
            owner: owner,
            repo: repo,
            tree_sha: sha,
            headers: {
                'X-GitHub-Api-Version': '2022-11-28'
            }
        })
        console.log("Found tree object")
        return response
    } catch (e) {
        if (e instanceof RequestError) {
            console.log(`Could not get tree object.\nError: ${e}`)
        }
        return null
    } 
};

export const createTreeObject = async (owner: string, repo: string, newFile: treeFile, base_tree: string) => {
    try {
        const response = await octokit.request('POST /repos/{owner}/{repo}/git/trees', {
            owner: owner,
            repo: repo,
            base_tree: base_tree,
            tree: [
                newFile
            ],
            headers: {
                'X-GitHub-Api-Version': '2022-11-28'
            }
        })
        console.log("Created tree object")
        return response
    } catch (e) {
        if (e instanceof RequestError) {
            console.log(`Could not create tree object.\nError: ${e}`)
        }
        return null
    } 
};

export const getFileFromTree = (
    tree: Endpoints["GET /repos/{owner}/{repo}/git/trees/{tree_sha}"]["response"]
) => {
    const filename = "spoofer.txt"
    const files = tree.data.tree

    return files.find((f) => f.path === filename) || null
}