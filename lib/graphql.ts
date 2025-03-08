// lib/graphql.ts
import { gql } from '@apollo/client';

export const GET_TRANSACTIONS = gql`
  query GetTransactions {
    queryTransaction {
      id
      date
      amount
      description
      category
      vendor
      account
      tags
    }
  }
`;

export const ADD_TRANSACTION = gql`
  mutation AddTransaction($transaction: AddTransactionInput!) {
    addTransaction(input: [$transaction]) {
      transaction {
        id
        date
        amount
        description
        category
        vendor
        account
        tags
      }
    }
  }
`;