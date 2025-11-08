// API Response Types
export interface ApiResponse<T> {
  data?: T
  courses?: T[]
  blogs?: T[]
  total?: number
  page?: number
  totalPages?: number
  success?: boolean
  error?: string
}

// User Types
export interface User {
  id: number
  email: string
  firstName: string
  lastName: string
  password?: string
  createdAt: Date

}

// Course Types
export interface Course {
  id: number
  title: string
  description: string
  price: number
  photo: string
  link: string
  duration: string
  level: string
  instructor?: string
  createdAt: Date
  
}

export interface CoursesResponse {
  courses: Course[]
  total: number
  page: number
  totalPages: number
}

// Blog Types
export interface Blog {
  id: number
  title: string
  content: string
  author?: string
  description: string
  status: string
  category: string
  image?: string
  createdAt: Date
}

export interface BlogsResponse {
  blogs: Blog[]
  total: number
  page: number
  totalPages: number
}

// Notification Types
export interface Notification {
  id: number
  message: string
  type: string
  email: string
  isRead: boolean
  createdAt: Date
  
}

// Admin Types
export interface Admin {
  id: number
  username: string
  password: string
  createdAt: Date
}

// Feedback Types
export interface Feedback {
  id?: number
  name: string
  email: string
  category: string
  message: string
  rating?: number
  createdAt?: Date
}
