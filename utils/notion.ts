import { Client } from "@notionhq/client"

const notion = new Client({ auth: process.env.NOTION_KEY })
const database_id: string = process.env.NOTION_DATABASE_ID!

export const fetchPages = async () => {
  return await notion.databases.query({
    database_id
  })
}
