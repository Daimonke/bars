// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import mysql from 'mysql2/promise'
import { config } from '../../dbCon'
import 'dotenv/config'

export async function getData() {
  const con = await mysql.createConnection(config)
  const [data] = await con.query(`
  SELECT ROUND(AVG(ivertinimai.user_rating) , 1) as rating, ROUND(AVG(ivertinimai.user_price), 1) as price, barai.* FROM barai
  LEFT JOIN ivertinimai on barai.id=ivertinimai.bar_id
  GROUP BY barai.id`
  )
  await con.end()
  return data
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    return res.status(200).json(await getData())
  }
  if (req.method === 'POST') {
    const b = req.body
    const con = await mysql.createConnection(config)
    if(!b.user) {
      await con.end()
      return res.status(200).json({err: 'Prisijunkite, kad galėtumėte vertinti.'})
    }
    const [check]:any = await con.query('SELECT COUNT(id) as count FROM ivertinimai WHERE user_email = ? AND bar_id=?', [b.user.email, b.bar_id])
    if (check[0].count === 0){
      await con.query('INSERT INTO ivertinimai (bar_id, user_email, user_rating, user_price) VALUES(?,?,?,?)', [b.bar_id, b.user.email, b.rating, b.price])
      await con.end()
      return res.status(200).json({msg: 'Ivertinta!'})
    } else {
      await con.end()
      return res.status(200).json({err: 'Jau įvertinote šį barą.'})
    }
  }
}
