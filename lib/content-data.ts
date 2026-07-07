export type ContentRow = {
  id: number
  topic: string
  text: string
  format: "grid" | "story"
  view: "grid" | "story"
  addedAt: string
  author: string
  publications: number
  selected?: boolean
}

const SAMPLE_TEXT =
  "То самое чувство, когда в детстве ела много капусты, в надежде, что твоя грудь сильно вырастет, но что-то уж явно пошло у тебя не по плану."

const topics = [
  "Новости",
  "Маникюр",
  "Новости",
  "Новости",
  "Юмор",
  "Новости",
  "Новости",
  "Новости",
  "Новости",
  "Новости",
  "Новости",
  "Новости",
]

export const contentRows: ContentRow[] = topics.map((topic, index) => ({
  id: index + 1,
  topic,
  text: SAMPLE_TEXT,
  format: topic === "Маникюр" ? "story" : "grid",
  view: topic === "Маникюр" ? "story" : "grid",
  addedAt: "22.01.2026",
  author: "Марат Иксанов",
  publications: 3,
  selected: index === 2,
}))
