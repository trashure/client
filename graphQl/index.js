import gql from "graphql-tag"

export const login = gql`mutation Login ($email : String!, $password : String!) {
                                login(email: $email, password: $password){
                                    token
                                }
                            }`

          
export const register = gql` mutation {
                                register(name:"batman", email: "batman@gmail.com", password:"1234567ASDq@!") {
                                    name
                                    email
                                }
                            }`