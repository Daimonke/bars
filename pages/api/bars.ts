// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import connect from '../../dbCon'
// type Data = {
//   name: string
// }

export async function getData(){
  const con = await connect()
  const [data] = await con.query('SELECT * FROM barai')
  return data
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
  // <Data>
) {
  res.status(200).json(await getData())
}
