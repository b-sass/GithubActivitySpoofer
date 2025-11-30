export const exchangeCode = async (code: string) => {
  const clientID = process.env.CLIENT_ID
  const clientSecret = process.env.CLIENT_SECRET
  
  const url = `https://github.com/login/oauth/access_token?client_id=${clientID}&client_secret=${clientSecret}&code=${code}`
  
  const request = await fetch(url, {method: "POST"})
  return await request.text()
}

export const convertTokenData = (tokenData: string) => {
  return Object.fromEntries(new URLSearchParams(tokenData))
}