import { verifySession } from "@/app/actions/session";
import { Octokit } from "@octokit/core"
import { RequestError } from "@octokit/request-error"

export const createRepo = async () => {
  const session = await verifySession()
  const octokit = new Octokit({ auth: session.accessToken });

  try {
    const response = await octokit.request('POST /user/repos', {
      name: 'ActivitySpoofer',
      description: 'Repo used for faking github commits',
      'private': true,
      headers: {
        'X-GitHub-Api-Version': '2022-11-28'
      }
    })
    console.log(`Created repository ActivitySpoofer`)
    return response.data
  } catch (e) {
    if (e instanceof RequestError) {
      console.log(`"Could not create repository.\nError: ${e}`)
    }
    return null
  }
}

export const getRepo = async (owner: string, repo: string) =>  {
  const session = await verifySession()
  const octokit = new Octokit({ auth: session.accessToken });

  try {
    const response = await octokit.request('GET /repos/{owner}/{repo}', {
      owner: owner,
      repo: repo,
      headers: {
        'X-GitHub-Api-Version': '2022-11-28'
      }
    })

    console.log(`Found repository ${repo}`)
    return response.data
  } catch (e) {
    if (e instanceof RequestError) {
      if (e.status === 404) {
        console.log(`Repository ${repo} not found`)
      } else {
        console.log(`Could not get repository.\nError: ${e}`)
      }
    }
    return null
  }
}

export const getRepoFile = async (owner: string, repo: string) => {
  const session = await verifySession()
  const octokit = new Octokit({ auth: session.accessToken });

  try {
    const response = await octokit.request('GET /repos/{owner}/{repo}/contents/{path}', {
      owner: owner,
      repo: repo,
      path: 'spoofer.txt',
      headers: {
        'X-GitHub-Api-Version': '2022-11-28'
      }
    })
    console.log("Found spoofer.txt")
    return response
  } catch (e) {
    if (e instanceof RequestError) {
       if (e.status === 404) {
        console.log(`Could not find spoofer.txt`)
      } else {
        console.log(`Could not get repository contents.\nError: ${e}`)
      }
    }
  }
  return null
}

export const createRepoFile = async (owner: string, repo: string, commiter: {name: string, email: string}) => {
  const session = await verifySession()
  const octokit = new Octokit({ auth: session.accessToken });
  const path = "spoofer.txt"

  try {
    const response = await octokit.request('PUT /repos/{owner}/{repo}/contents/{path}', {
      owner: owner,
      repo: repo,
      path: path,
      message: 'Setup commit',
      committer: commiter,
      content: '',
      headers: {
        'X-GitHub-Api-Version': '2022-11-28'
      }
    })
    console.log("Created setup file")
    return response
  } catch (e) {
    if (e instanceof RequestError) {
      console.log(`Could not create file\nError: ${e}`)
    }
    return null
  }
}