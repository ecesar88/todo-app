/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'
import { numericId } from 'App/Lib/Api/routeMatchers'

Route.get('/', async () => {
  return { hello: 'world' }
})

Route.get('/healthcheck', async () => {
  return { version: '0.1' }
})

Route.group(() => {
  Route.get('users', 'UserController.get')
  Route.get('users/:id', 'UserController.findOne').where('id', numericId)
  Route.post('users', 'UserController.create')
  Route.patch('users/:id', 'UserController.update').where('id', numericId)
  Route.delete('users/:id', 'UserController.delete').where('id', numericId)
})

Route.group(() => {
  Route.get('todos', 'TodoController.get'),
    Route.get('todos/:id', 'TodoController.findOne').where('id', numericId)
  Route.post('todos', 'TodoController.create')
  Route.patch('todos/:id', 'TodoController.update').where('id', numericId)
  Route.delete('todos/:id', 'TodoController.delete').where('id', numericId)
})
