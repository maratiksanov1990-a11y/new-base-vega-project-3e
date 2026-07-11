// ─── Генерации ──────────────────────────────────────────────────────────────

export type GenerationStatus = "Готово" | "В очереди" | "Ошибка" | "Обработка"
export type GenerationProvider = "fal.ai" | "kie.ai"

export type Generation = {
  id: string
  userId: string
  userName: string
  email: string
  promptTitle: string
  provider: GenerationProvider
  account: string
  status: GenerationStatus
  duration: number // секунды
  cost: number // рублей
  date: string
  imageUrl: string
}

export const generations: Generation[] = [
  { id: "GEN-001", userId: "U-101", userName: "Анна Смирнова",    email: "anna@mail.ru",    promptTitle: "Лето на пляже",     provider: "kie.ai",  account: "kie-01", status: "Готово",    duration: 12, cost: 100, date: "11.07.2026", imageUrl: "" },
  { id: "GEN-002", userId: "U-102", userName: "Игорь Петров",     email: "igor@yandex.ru",  promptTitle: "Прическа боб",      provider: "fal.ai",  account: "fal-01", status: "Готово",    duration: 18, cost: 100, date: "11.07.2026", imageUrl: "" },
  { id: "GEN-003", userId: "U-103", userName: "Мария Козлова",    email: "maria@gmail.com", promptTitle: "8 Марта открытка",  provider: "kie.ai",  account: "kie-02", status: "В очереди", duration: 0,  cost: 0,   date: "11.07.2026", imageUrl: "" },
  { id: "GEN-004", userId: "U-104", userName: "Дмитрий Новиков",  email: "dima@bk.ru",      promptTitle: "Одежда casual",     provider: "kie.ai",  account: "kie-03", status: "Обработка", duration: 5,  cost: 100, date: "11.07.2026", imageUrl: "" },
  { id: "GEN-005", userId: "U-105", userName: "Светлана Орлова",  email: "sveta@mail.ru",   promptTitle: "9 Мая открытка",    provider: "fal.ai",  account: "fal-01", status: "Ошибка",    duration: 0,  cost: 0,   date: "10.07.2026", imageUrl: "" },
  { id: "GEN-006", userId: "U-106", userName: "Алексей Фёдоров",  email: "alex@yandex.ru",  promptTitle: "Осенний образ",     provider: "kie.ai",  account: "kie-04", status: "Готово",    duration: 15, cost: 100, date: "10.07.2026", imageUrl: "" },
  { id: "GEN-007", userId: "U-107", userName: "Наталья Соколова", email: "natasha@gmail.com","promptTitle": "Зимний look",    provider: "kie.ai",  account: "kie-05", status: "Готово",    duration: 11, cost: 100, date: "10.07.2026", imageUrl: "" },
  { id: "GEN-008", userId: "U-108", userName: "Павел Морозов",    email: "pavel@bk.ru",     promptTitle: "Новый год",         provider: "kie.ai",  account: "kie-06", status: "Готово",    duration: 14, cost: 100, date: "09.07.2026", imageUrl: "" },
  { id: "GEN-009", userId: "U-109", userName: "Елена Волкова",    email: "elena@mail.ru",   promptTitle: "Деловой стиль",     provider: "fal.ai",  account: "fal-01", status: "Готово",    duration: 22, cost: 225, date: "09.07.2026", imageUrl: "" },
  { id: "GEN-010", userId: "U-110", userName: "Андрей Лебедев",   email: "andrey@yandex.ru","promptTitle": "Весенний образ",  provider: "kie.ai",  account: "kie-01", status: "В очереди", duration: 0,  cost: 0,   date: "09.07.2026", imageUrl: "" },
]

// ─── Промты ─────────────────────────────────────────────────────────────────

export type PromptCategory = "Образы" | "Прически" | "Одежда" | "Открытки" | "Сезонные"
export type PromptStatus = "Активен" | "Черновик" | "Архив"

export type Prompt = {
  id: string
  title: string
  category: PromptCategory
  model: string
  status: PromptStatus
  usages: number
  successRate: number
  prompt: string
  createdAt: string
  updatedAt: string
}

export const prompts: Prompt[] = [
  { id: "P-001", title: "Лето на пляже",    category: "Образы",    model: "GPT Image 1.5", status: "Активен",  usages: 342, successRate: 97, prompt: "Transform the person into a summer beach style with...", createdAt: "01.05.2026", updatedAt: "10.07.2026" },
  { id: "P-002", title: "Прическа боб",     category: "Прически",  model: "GPT Image 1.5", status: "Активен",  usages: 218, successRate: 95, prompt: "Give the person a stylish bob haircut, keep...",       createdAt: "12.04.2026", updatedAt: "08.07.2026" },
  { id: "P-003", title: "8 Марта открытка", category: "Открытки",  model: "GPT Image 1.5", status: "Активен",  usages: 891, successRate: 99, prompt: "Create a beautiful March 8th greeting card with...",   createdAt: "20.02.2026", updatedAt: "05.03.2026" },
  { id: "P-004", title: "9 Мая открытка",   category: "Открытки",  model: "GPT Image 1.5", status: "Активен",  usages: 654, successRate: 98, prompt: "Create a patriotic May 9th Victory Day card with...",  createdAt: "25.04.2026", updatedAt: "01.05.2026" },
  { id: "P-005", title: "Одежда casual",    category: "Одежда",    model: "GPT Image 1.5", status: "Активен",  usages: 176, successRate: 93, prompt: "Dress the person in modern casual outfit with...",      createdAt: "15.05.2026", updatedAt: "09.07.2026" },
  { id: "P-006", title: "Осенний образ",    category: "Сезонные",  model: "GPT Image 1.5", status: "Активен",  usages: 134, successRate: 94, prompt: "Transform into an autumn aesthetic style with...",      createdAt: "01.09.2025", updatedAt: "07.07.2026" },
  { id: "P-007", title: "Зимний look",      category: "Сезонные",  model: "GPT Image 1.5", status: "Активен",  usages: 287, successRate: 96, prompt: "Apply a cozy winter fashion style to the person...",    createdAt: "01.12.2025", updatedAt: "06.07.2026" },
  { id: "P-008", title: "Новый год",        category: "Открытки",  model: "GPT Image 1.5", status: "Черновик", usages: 0,   successRate: 0,  prompt: "Create a New Year greeting scene with the person...",  createdAt: "10.07.2026", updatedAt: "11.07.2026" },
  { id: "P-009", title: "Деловой стиль",    category: "Одежда",    model: "GPT Image 1.5", status: "Активен",  usages: 98,  successRate: 91, prompt: "Dress the person in a formal business attire...",      createdAt: "20.06.2026", updatedAt: "04.07.2026" },
  { id: "P-010", title: "Весенний образ",   category: "Сезонные",  model: "GPT Image 1.5", status: "Архив",    usages: 203, successRate: 92, prompt: "Transform with a fresh spring style and pastel...",    createdAt: "01.03.2026", updatedAt: "30.05.2026" },
]

// ─── Пользователи ────────────────────────────────────────────────────────────

export type UserSource = "ВКонтакте" | "MAX" | "Прямой" | "Telegram"
export type UserStatus = "Активен" | "Заблокирован" | "Неактивен"

export type AppUser = {
  id: string
  name: string
  email: string
  phone: string
  source: UserSource
  status: UserStatus
  freeUsed: boolean
  generationsTotal: number
  generationsLeft: number
  spent: number // рублей
  registeredAt: string
  lastActive: string
}

export const appUsers: AppUser[] = [
  { id: "U-101", name: "Анна Смирнова",    email: "anna@mail.ru",     phone: "+7 916 111-22-33", source: "ВКонтакте", status: "Активен",     freeUsed: true,  generationsTotal: 7,  generationsLeft: 0, spent: 500,  registeredAt: "01.06.2026", lastActive: "11.07.2026" },
  { id: "U-102", name: "Игорь Петров",     email: "igor@yandex.ru",   phone: "+7 903 222-33-44", source: "MAX",       status: "Активен",     freeUsed: true,  generationsTotal: 4,  generationsLeft: 2, spent: 225,  registeredAt: "15.06.2026", lastActive: "11.07.2026" },
  { id: "U-103", name: "Мария Козлова",    email: "maria@gmail.com",  phone: "+7 926 333-44-55", source: "ВКонтакте", status: "Активен",     freeUsed: false, generationsTotal: 1,  generationsLeft: 1, spent: 0,    registeredAt: "20.06.2026", lastActive: "11.07.2026" },
  { id: "U-104", name: "Дмитрий Новиков",  email: "dima@bk.ru",       phone: "+7 985 444-55-66", source: "MAX",       status: "Активен",     freeUsed: true,  generationsTotal: 2,  generationsLeft: 0, spent: 100,  registeredAt: "25.06.2026", lastActive: "11.07.2026" },
  { id: "U-105", name: "Светлана Орлова",  email: "sveta@mail.ru",    phone: "+7 916 555-66-77", source: "ВКонтакте", status: "Неактивен",   freeUsed: true,  generationsTotal: 1,  generationsLeft: 0, spent: 0,    registeredAt: "28.06.2026", lastActive: "10.07.2026" },
  { id: "U-106", name: "Алексей Фёдоров",  email: "alex@yandex.ru",   phone: "+7 903 666-77-88", source: "Прямой",    status: "Активен",     freeUsed: true,  generationsTotal: 13, generationsLeft: 1, spent: 900,  registeredAt: "02.07.2026", lastActive: "10.07.2026" },
  { id: "U-107", name: "Наталья Соколова", email: "natasha@gmail.com",phone: "+7 926 777-88-99", source: "MAX",       status: "Активен",     freeUsed: true,  generationsTotal: 6,  generationsLeft: 0, spent: 300,  registeredAt: "05.07.2026", lastActive: "10.07.2026" },
  { id: "U-108", name: "Павел Морозов",    email: "pavel@bk.ru",      phone: "+7 985 888-99-00", source: "ВКонтакте", status: "Активен",     freeUsed: true,  generationsTotal: 3,  generationsLeft: 0, spent: 225,  registeredAt: "07.07.2026", lastActive: "09.07.2026" },
  { id: "U-109", name: "Елена Волкова",    email: "elena@mail.ru",    phone: "+7 916 999-00-11", source: "MAX",       status: "Заблокирован",freeUsed: true,  generationsTotal: 3,  generationsLeft: 3, spent: 225,  registeredAt: "08.07.2026", lastActive: "09.07.2026" },
  { id: "U-110", name: "Андрей Лебедев",   email: "andrey@yandex.ru", phone: "+7 903 000-11-22", source: "Прямой",    status: "Активен",     freeUsed: false, generationsTotal: 1,  generationsLeft: 1, spent: 0,    registeredAt: "09.07.2026", lastActive: "09.07.2026" },
]

// ─── API ключи ───────────────────────────────────────────────────────────────

export type ApiKeyProvider = "kie.ai" | "fal.ai"
export type ApiKeyStatus = "Активен" | "Лимит" | "Ошибка" | "Отключён"

export type ApiKey = {
  id: string
  name: string
  provider: ApiKeyProvider
  key: string
  status: ApiKeyStatus
  requestsToday: number
  requestsLimit: number
  requestsTotal: number
  lastUsed: string
  createdAt: string
}

export const apiKeys: ApiKey[] = [
  { id: "K-001", name: "kie-01", provider: "kie.ai", key: "sk-kie-****-a1b2", status: "Активен",  requestsToday: 847,  requestsLimit: 10,  requestsTotal: 14230, lastUsed: "11.07.2026", createdAt: "01.05.2026" },
  { id: "K-002", name: "kie-02", provider: "kie.ai", key: "sk-kie-****-c3d4", status: "Активен",  requestsToday: 912,  requestsLimit: 10,  requestsTotal: 11045, lastUsed: "11.07.2026", createdAt: "01.05.2026" },
  { id: "K-003", name: "kie-03", provider: "kie.ai", key: "sk-kie-****-e5f6", status: "Лимит",    requestsToday: 10,   requestsLimit: 10,  requestsTotal: 9876,  lastUsed: "11.07.2026", createdAt: "01.05.2026" },
  { id: "K-004", name: "kie-04", provider: "kie.ai", key: "sk-kie-****-g7h8", status: "Активен",  requestsToday: 634,  requestsLimit: 10,  requestsTotal: 8234,  lastUsed: "11.07.2026", createdAt: "15.05.2026" },
  { id: "K-005", name: "kie-05", provider: "kie.ai", key: "sk-kie-****-i9j0", status: "Активен",  requestsToday: 701,  requestsLimit: 10,  requestsTotal: 7651,  lastUsed: "11.07.2026", createdAt: "15.05.2026" },
  { id: "K-006", name: "kie-06", provider: "kie.ai", key: "sk-kie-****-k1l2", status: "Ошибка",   requestsToday: 0,    requestsLimit: 10,  requestsTotal: 6102,  lastUsed: "10.07.2026", createdAt: "01.06.2026" },
  { id: "K-007", name: "fal-01", provider: "fal.ai", key: "fal-****-m3n4",    status: "Активен",  requestsToday: 234,  requestsLimit: 100, requestsTotal: 3201,  lastUsed: "11.07.2026", createdAt: "01.06.2026" },
]

// ─── Тарифы ──────────────────────────────────────────────────────────────────

export type TariffStatus = "Активен" | "Скрыт"

export type Tariff = {
  id: string
  name: string
  generations: number
  price: number      // рублей
  pricePerGen: number
  discount: string
  status: TariffStatus
  purchases: number
  revenue: number
}

export const tariffs: Tariff[] = [
  { id: "T-001", name: "1 генерация",  generations: 1, price: 100, pricePerGen: 100,  discount: "—",    status: "Активен", purchases: 213, revenue: 21300 },
  { id: "T-002", name: "3 генерации",  generations: 3, price: 225, pricePerGen: 75,   discount: "25%",  status: "Активен", purchases: 387, revenue: 87075 },
  { id: "T-003", name: "6 генераций",  generations: 6, price: 300, pricePerGen: 50,   discount: "50%",  status: "Активен", purchases: 294, revenue: 88200 },
]

// ─── Метрики главной страницы ─────────────────────────────────────────────────

export const aiStats = [
  { label: "Генераций сегодня",   value: "3 294",   change: "+18.2%", trend: "up"   as const, hint: "По сравнению со вчера" },
  { label: "Активных пользов.",   value: "1 847",   change: "+12.5%", trend: "up"   as const, hint: "За последние 7 дней" },
  { label: "Выручка сегодня",     value: "₽ 48 600", change: "+9.3%", trend: "up"   as const, hint: "По сравнению со вчера" },
  { label: "Ошибки генерации",    value: "1.4%",    change: "-0.3%",  trend: "up"   as const, hint: "Процент failed запросов" },
]
