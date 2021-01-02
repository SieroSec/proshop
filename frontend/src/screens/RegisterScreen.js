import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Button, Form } from 'react-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { register } from '../actions/userActions'
import FormContainer from '../components/FormContainer'

const RegisterScreen = ({ location, history }) => {
   const [name, setName] = useState('')
   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')
   const [confirmPassword, setConfirmPassword] = useState('')
   const [message, setMessage] = useState(null)

   const dispatch = useDispatch()

   const userRegister = useSelector(state => state.userRegister)
   const { loading, error, userInfo } = userRegister

   const redirect = location.search ? location.search.split('=')[1] : '/'

   useEffect(() => {
      if (userInfo) {
         history.push(redirect)
      }
   }, [history, userInfo, redirect])

   const submitHandler = (e) => {
      e.preventDefault()

      if (password !== confirmPassword) {
         setMessage('Passwords do not match')
      } else {

      }

      dispatch(register(name, email, password))
   }

   return (
      <FormContainer>
         <h1>Register new user account</h1>

         {message && <Message variant='danger'>{message}</Message>}
         {error && <Message variant='danger'>{error}</Message>}
         {loading && <Loader />}

         <Form onSubmit={submitHandler}>
            <Form.Group conrolId='name'>
               <Form.Label>Name</Form.Label>
               <Form.Control type='name' placeholder='Enter name' value={name} onChange={(e) => setName(e.target.value)}></Form.Control>
            </Form.Group>

            <Form.Group conrolId='email'>
               <Form.Label>Email Address</Form.Label>
               <Form.Control type='email' placeholder='Enter email' value={email} onChange={(e) => setEmail(e.target.value)}></Form.Control>
            </Form.Group>

            <Form.Group conrolId='password'>
               <Form.Label>Password</Form.Label>
               <Form.Control type='password' placeholder='Enter password' value={password} onChange={(e) => setPassword(e.target.value)}></Form.Control>
            </Form.Group>

            <Form.Group conrolId='confirmPassword'>
               <Form.Label>Password</Form.Label>
               <Form.Control type='password' placeholder='Confirm password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}></Form.Control>
            </Form.Group>

            <Button type='submit' variant='primary'>Register</Button>

            <Row className='py-3'>
               <Col>
                  Have an account? <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>Log In</Link>
               </Col>
            </Row>

         </Form>
      </FormContainer>
   )
}

export default RegisterScreen