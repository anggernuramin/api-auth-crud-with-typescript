import { Application, Router } from 'express'
import { TaskRouter } from './task.route'
import { AuthRouter } from './auth.router'

// Kumpulan router pada folder routes yang akan dikirimkan ke index
const _routes: Array<[string, Router]> = [
  ['/task', TaskRouter],
  ['/auth', AuthRouter]
]

// eslint-disable-next-line
const routes = (app: Application) => {
  _routes.forEach((route) => {
    const [url, router] = route
    app.use(url, router)
    // ini sama saja dengan app.use("/task", TaskRouter)
  })
}

export default routes
