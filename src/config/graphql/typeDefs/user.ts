import { gql } from 'apollo-server-micro';

export const userTypeDefs = gql`
  type User {
    id: String
    name: String
    lastName: String
    username: String
    phone: String
    role: String
    createdAt: String
    status: String
    verificationCode: String
    message: [String]
  }

  type ResponseAuthenticate {
    message: [String]
    token: String
    id: String
    name: String
    lastName: String
    username: String
    phone: String
    role: String
    status: String
  }

  type ResponseNewUser {
    message: [String]
  }

  type ResponseDeleted {
    id: String
    success: Boolean
  }

  type ResponseForgotPassword {
    success: Boolean
    message: [String]
    id: String
  }

  type ResponseActiveAccount {
    id: String
    message: [String]
  }

  input AuthenticateInput {
    identifier: String!
    password: String!
  }

  input UserInput {
    name: String
    lastName: String
    username: String
    phone: String
    role: String
    password: String
  }

  input VerificationInput {
    code: String
    name: String
    lastName: String
  }

  input UpdateAccountInput {
    id: String
    name: String
    lastName: String
    username: String
    phone: String
    password: String
    newAccount: Boolean
  }

  input UpdatePasswordInput {
    id: String
    code: String
    oldPassword: String
    newPassword: String
    isRecovering: Boolean
  }

  input ForgotPasswordInput {
    identifier: String
    phone: String
  }

  input Token {
    token: String
  }

  input UserID {
    id: String
  }

  type Query {
    getUser(input: Token!): User
    getAllUsers(input: Token!): [User]
    getAUser(input: UserID!): User
  }

  type Mutation {
    #Users
    newUser(input: UserInput): ResponseNewUser
    authenticate(input: AuthenticateInput): ResponseAuthenticate
    activeAccount(input: VerificationInput): ResponseActiveAccount
    updateAccount(input: UpdateAccountInput): ResponseAuthenticate
    updatePassword(input: UpdatePasswordInput): ResponseAuthenticate
    forgotPassword(input: ForgotPasswordInput): ResponseForgotPassword
    deleteUser(input: UserID!): ResponseDeleted
  }
`;
