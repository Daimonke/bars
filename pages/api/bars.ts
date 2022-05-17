// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import mysql from 'mysql2/promise'
import { config } from '../../dbCon'
import 'dotenv/config'

export async function getData() {
  const con = await mysql.createConnection(config)
  const [data]: Array<object> = await con.query('SELECT * FROM barai')
  await con.end()
  return data
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.status(200).json(await getData())
}
