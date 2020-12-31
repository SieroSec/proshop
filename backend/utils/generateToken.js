import jwt from 'jsonwebtoken'

const generateToken = (id) => {
   return jwt.sign(
      { id },
      process.env.JWT_SECRET, {
      expiresIn: '30d'
   })
}

export default generateToken

// ex:
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmZTlmODU4N2MxNzVjMjk4MGQ5ZWFmOSIsImlhdCI6MTYwOTQxNjY0OSwiZXhwIjoxNjEyMDA4NjQ5fQ.8avZI8oC6jWQGlxULdY4ocdxqWzu1UrNZRhDrVQFTmg