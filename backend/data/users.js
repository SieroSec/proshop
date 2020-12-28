import bcrypt from 'bcryptjs'

const users = [
   {
      name: 'Admin User',
      email: 'admin@example.com',
      password: bcrypt.hashSync('123456', 10),
      isAdmin: true
   },
   {
      name: 'John Doe',
      email: 'john@example.com',
      password: bcrypt.hashSync('123456', 10),
      isAdmin: false
   },
   {
      name: 'Jane Smith',
      email: 'jane@smith.org',
      password: bcrypt.hashSync('123456', 10),
      isAdmin: false
   },
   {
      name: 'siero',
      email: 'siero@example.com',
      password: bcrypt.hashSync('123456', 10),
      isAdmin: true
   },
]

export default users