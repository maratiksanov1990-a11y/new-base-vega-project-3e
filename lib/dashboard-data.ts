export type OrderStatus = "Оплачен" | "В обработке" | "Отправлен" | "Отменён"

export type Order = {
  id: string
  customer: string
  email: string
  status: OrderStatus
  amount: number
  date: string
}

export const orders: Order[] = [
  {
    id: "#3210",
    customer: "Анна Смирнова",
    email: "anna.s@example.com",
    status: "Оплачен",
    amount: 12500,
    date: "2026-07-02",
  },
  {
    id: "#3209",
    customer: "Игорь Петров",
    email: "igor.p@example.com",
    status: "В обработке",
    amount: 8900,
    date: "2026-07-02",
  },
  {
    id: "#3208",
    customer: "Мария Кузнецова",
    email: "maria.k@example.com",
    status: "Отправлен",
    amount: 24300,
    date: "2026-07-01",
  },
  {
    id: "#3207",
    customer: "Дмитрий Волков",
    email: "d.volkov@example.com",
    status: "Оплачен",
    amount: 5600,
    date: "2026-07-01",
  },
  {
    id: "#3206",
    customer: "Елена Соколова",
    email: "elena.sok@example.com",
    status: "Отменён",
    amount: 3200,
    date: "2026-06-30",
  },
  {
    id: "#3205",
    customer: "Артём Новиков",
    email: "artem.n@example.com",
    status: "Оплачен",
    amount: 18750,
    date: "2026-06-30",
  },
  {
    id: "#3204",
    customer: "Ольга Морозова",
    email: "olga.m@example.com",
    status: "Отправлен",
    amount: 9400,
    date: "2026-06-29",
  },
  {
    id: "#3203",
    customer: "Сергей Лебедев",
    email: "s.lebedev@example.com",
    status: "В обработке",
    amount: 14200,
    date: "2026-06-29",
  },
  {
    id: "#3202",
    customer: "Наталья Козлова",
    email: "n.kozlova@example.com",
    status: "Оплачен",
    amount: 7100,
    date: "2026-06-28",
  },
  {
    id: "#3201",
    customer: "Павел Егоров",
    email: "p.egorov@example.com",
    status: "Отправлен",
    amount: 21600,
    date: "2026-06-28",
  },
]

export const revenueData = [
  { month: "Янв", revenue: 42000 },
  { month: "Фев", revenue: 48500 },
  { month: "Мар", revenue: 51200 },
  { month: "Апр", revenue: 47800 },
  { month: "Май", revenue: 63400 },
  { month: "Июн", revenue: 71900 },
  { month: "Июл", revenue: 84200 },
]

export const stats = [
  {
    label: "Выручка",
    value: "₽1 248 300",
    change: "+12,5%",
    trend: "up" as const,
    hint: "за последний месяц",
  },
  {
    label: "Заказы",
    value: "3 210",
    change: "+8,2%",
    trend: "up" as const,
    hint: "новых за месяц",
  },
  {
    label: "Активные клиенты",
    value: "1 894",
    change: "+3,1%",
    trend: "up" as const,
    hint: "уникальных покупателей",
  },
  {
    label: "Возвраты",
    value: "2,4%",
    change: "-0,6%",
    trend: "down" as const,
    hint: "доля от заказов",
  },
]

export const currency = (value: number) =>
  new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "RUB",
    maximumFractionDigits: 0,
  }).format(value)
