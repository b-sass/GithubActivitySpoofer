import { verifySession } from "@/app/actions/session"
import { Octokit } from "@octokit/core"
import { cache } from "react"

export const getGithubUser = cache(async () => {
    const session = await verifySession()
    const octokit = new Octokit({ auth: session.accessToken });

    try {
        const response = await octokit.request('GET /user', {
            headers: {
                'X-GitHub-Api-Version': '2022-11-28'
            }
        })
        console.log("Found user")
        return response.data
    } catch (e) {
        console.log(`Could not get user\nError: ${e}`)
        return null
    }
})

export const getGithubUserEmail = async () => {
    const session = await verifySession()
    const octokit = new Octokit({ auth: session.accessToken });

    try {
        const response = await octokit.request('GET /user/emails', {
            headers: {
                'X-GitHub-Api-Version': '2022-11-28'
            }
        })
        console.log("Found user email")
        return response
    } catch (e) {
        console.log(`Could not get user email\nError: ${e}`)
        return null
    }
}
