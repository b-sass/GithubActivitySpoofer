"use server"
import { getLatestCommit, createCommitObject } from "../lib/github/commit";
import { getTreeObject, createTreeObject } from "../lib/github/tree";
import { getFileFromTree } from "../lib/github/tree";
import { getBlob, createBlob } from "../lib/github/blob";
import { updateMainBranchReference } from "../lib/github/reference";
import { createRepo, createRepoFile, getRepo, getRepoFile } from "../lib/github/repos";
import { treeFile } from "../lib/definitions";

const checkRepo = async (username: string, repoName: string) => {
    // Check if repo exists
    let repo = await getRepo(username, repoName)
    if (!repo) {
        repo = await createRepo()
    }
    return repo
}

const setupRepo = async (username: string, repoName: string, userID: number) => {
    // Check if file exists in repo
    const file = await getRepoFile(username, repoName)
    if (!file) {
        return await createRepoFile(username, repoName, {name: username, email: `${userID}+${username}@users.noreply.github.com`})
    }
    return file
}

export const spoofCommit = async (username: string, userID: number, repositoryName: string, dates: string[]) => {
    
    // Repository setup
    const repo = await checkRepo(username, repositoryName)
    if (!repo) { return null }
    
    const spooferFile = setupRepo(username, repositoryName, userID)
    if (!spooferFile) { return null }
    
    for (const date of dates) {
        // Getting git objects
        const oldCommit = await getLatestCommit(
            username,
            repositoryName,
            "heads/main"
        );
        if (!oldCommit) { return null }
        
        const oldTree = await getTreeObject(
            username,
            repositoryName,
            oldCommit.data.commit.tree.sha
        );
        if (!oldTree) { return null }
        
        const file = getFileFromTree(oldTree!);
        if (!file) { return null }
        
        const oldBlob = await getBlob(
            username,
            repositoryName,
            file.sha
        );
        if (!oldBlob) { return null }
    
        // Updating file content
        const blobContent = oldBlob.data.content;
        
        const newContent = blobContent.length == 0 ? "." : "";
        
        // Updating git objects
        const newBlob = await createBlob(
            username,
            repositoryName,
            newContent
        );
        if (!newBlob) { return null }
        
        file.sha = newBlob.data.sha;
        delete file.size;
        delete file.url;
        
        const newTree = await createTreeObject(
            username,
            repositoryName,
            file as treeFile,
            oldTree.data.sha
        );
        if (!newTree) { return null }
        
        // Create the author object
        const author = {
            name:  username,
            email: `${userID}+${username}@users.noreply.github.com`,
            date: date + "T12:00:00Z" // DST workaround
        };
        
        const newCommit = await createCommitObject(
            username,
            repositoryName,
            oldCommit.data.sha, //parent commit
            newTree.data.sha,
            author
        );
        if (!newCommit) { return null }
        
        const reference = await updateMainBranchReference(
            username,
            repositoryName,
            newCommit.data.sha
        );
        if (!reference) { return null }
    }
}