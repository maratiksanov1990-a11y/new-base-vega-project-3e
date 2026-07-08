export type OrderStatus = "Оплачен" | "В обработке" | "Отправлен" | "Отменён"

export type Order = {
  id: string
  customer: string
  email: string
  status: OrderStatus
  amount: number
  date: string
  phone: string
  city: string
  manager: string
  items: number
  payment: string
}

const cities = ["Москва", "Санкт-Петербург", "Казань", "Новосибирск", "Екатеринбург", "Самара"]
const managers = ["Ольга К.", "Дмитрий В.", "Анна М.", "Сергей П."]
const payments = ["Карта", "Наличные", "Перевод", "Рассрочка"]

function enrichOrder(order: Omit<Order, "phone" | "city" | "manager" | "items" | "payment">, index: number): Order {
  return {
    ...order,
    phone: `+7 (9${String(10 + index).slice(0, 2)}) ${String(100 + index).slice(0, 3)}-${String(10 + index).slice(0, 2)}-${String(20 + index).slice(0, 2)}`,
    city: cities[index % cities.length],
    manager: managers[index % managers.length],
    items: (index % 5) + 1,
    payment: payments[index % payments.length],
  }
}

const baseOrders: Omit<Order, "phone" | "city" | "manager" | "items" | "payment">[] = [
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
  {
    id: "#3200",
    customer: "Виктория Иванова",
    email: "v.ivanova@example.com",
    status: "Оплачен",
    amount: 15400,
    date: "2026-06-27",
  },
  {
    id: "#3199",
    customer: "Максим Соколов",
    email: "m.sokolov@example.com",
    status: "В обработке",
    amount: 9800,
    date: "2026-06-27",
  },
  {
    id: "#3198",
    customer: "Елизавета Федорова",
    email: "e.fedorova@example.com",
    status: "Отменён",
    amount: 6700,
    date: "2026-06-26",
  },
  {
    id: "#3197",
    customer: "Алексей Розов",
    email: "a.rozov@example.com",
    status: "Оплачен",
    amount: 28900,
    date: "2026-06-26",
  },
  {
    id: "#3196",
    customer: "Людмила Сергеева",
    email: "l.sergeeva@example.com",
    status: "Отправлен",
    amount: 11200,
    date: "2026-06-25",
  },
  {
    id: "#3195",
    customer: "Константин Павлов",
    email: "k.pavlov@example.com",
    status: "В обработке",
    amount: 7600,
    date: "2026-06-25",
  },
  {
    id: "#3194",
    customer: "Ирина Золотова",
    email: "i.zolotova@example.com",
    status: "Оплачен",
    amount: 19300,
    date: "2026-06-24",
  },
  {
    id: "#3193",
    customer: "Андрей Ладанов",
    email: "a.ladanov@example.com",
    status: "Отправлен",
    amount: 13500,
    date: "2026-06-24",
  },
  {
    id: "#3192",
    customer: "Софья Горчакова",
    email: "s.gorchakova@example.com",
    status: "Оплачен",
    amount: 22800,
    date: "2026-06-23",
  },
]

export const orders: Order[] = baseOrders.map(enrichOrder)

export type ShipmentStatus = "В пути" | "Доставлено" | "Ожидает" | "Возврат"

export type Shipment = {
  id: string
  orderId: string
  courier: string
  city: string
  status: ShipmentStatus
  eta: string
  weight: string
  cost: number
  recipient: string
}

export const shipments: Shipment[] = [
  { id: "TRK-8801", orderId: "#3210", courier: "СДЭК", city: "Москва", status: "В пути", eta: "2026-07-05", weight: "1.2 кг", cost: 350, recipient: "Анна Смирнова" },
  { id: "TRK-8802", orderId: "#3209", courier: "Boxberry", city: "Санкт-Петербург", status: "Ожидает", eta: "2026-07-06", weight: "0.8 кг", cost: 290, recipient: "Игорь Петров" },
  { id: "TRK-8803", orderId: "#3208", courier: "Почта России", city: "Казань", status: "Доставлено", eta: "2026-07-03", weight: "2.5 кг", cost: 420, recipient: "Мария Кузнецова" },
  { id: "TRK-8804", orderId: "#3207", courier: "СДЭК", city: "Новосибирск", status: "В пути", eta: "2026-07-07", weight: "1.0 кг", cost: 510, recipient: "Дмитрий Волков" },
  { id: "TRK-8805", orderId: "#3206", courier: "DPD", city: "Екатеринбург", status: "Возврат", eta: "2026-07-04", weight: "3.1 кг", cost: 480, recipient: "Елена Соколова" },
  { id: "TRK-8806", orderId: "#3205", courier: "Boxberry", city: "Нижний Новгород", status: "Доставлено", eta: "2026-07-02", weight: "0.5 кг", cost: 250, recipient: "Артём Новиков" },
  { id: "TRK-8807", orderId: "#3204", courier: "СДЭК", city: "Самара", status: "В пути", eta: "2026-07-08", weight: "1.8 кг", cost: 390, recipient: "Ольга Морозова" },
  { id: "TRK-8808", orderId: "#3203", courier: "Почта России", city: "Омск", status: "Ожидает", eta: "2026-07-09", weight: "2.0 кг", cost: 440, recipient: "Сергей Лебедев" },
  { id: "TRK-8809", orderId: "#3202", courier: "DPD", city: "Челябинск", status: "Доставлено", eta: "2026-07-01", weight: "0.9 кг", cost: 310, recipient: "Наталья Козлова" },
  { id: "TRK-8810", orderId: "#3201", courier: "СДЭК", city: "Ростов-на-Дону", status: "В пути", eta: "2026-07-10", weight: "1.5 кг", cost: 460, recipient: "Павел Егоров" },
  { id: "TRK-8811", orderId: "#3200", courier: "Boxberry", city: "Уфа", status: "Доставлено", eta: "2026-06-30", weight: "1.1 кг", cost: 330, recipient: "Виктория Иванова" },
  { id: "TRK-8812", orderId: "#3199", courier: "DPD", city: "Красноярск", status: "Ожидает", eta: "2026-07-11", weight: "2.7 кг", cost: 520, recipient: "Максим Соколов" },
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
