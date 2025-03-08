Blog Post 2: Modeling Financial Data with Dgraph: Schema Design for a Personal Finance App

Here's the draft for the second blog post:

Title: Modeling Financial Data with Dgraph: Schema Design for a Personal Finance App (Part 2)

Introduction:

In the previous post, we laid the groundwork for our intelligent personal finance dashboard by setting up the project, choosing our tech stack (Next.js, Dgraph, Elixir/Phoenix, Python), and creating our GitHub repository. Now, it's time to dive into the heart of our application: the data model. We'll be using Dgraph, a native GraphQL graph database, to define the schema that will structure and organize our financial data.

Recap: Why Dgraph?

As we discussed, financial data is inherently relational. Transactions belong to accounts, accounts belong to users, users have financial goals, and so on. Dgraph, with its graph-based approach and native GraphQL support, is perfectly suited for modeling these complex relationships. It allows us to:

Represent relationships naturally: Instead of using foreign keys and joins (as in relational databases), we can directly express relationships between entities.
Query data efficiently: Dgraph's query language (GraphQL) allows us to traverse these relationships easily and retrieve exactly the data we need.
Evolve the schema flexibly: Adding new features and data types is straightforward.
Dgraph Schema Language (GraphQL SDL):

Dgraph uses a variant of the GraphQL Schema Definition Language (SDL) to define the schema. This is the same language used to define GraphQL APIs, making it familiar to many developers. Here are some key concepts:

Types: Represent the different entities in our application (e.g., User, Transaction, Account).
Fields: Represent the properties of each type (e.g., a User might have id, email, name fields).
Scalars: Basic data types like ID, String, Int, Float, Boolean, and DateTime.
Directives: Special instructions that modify the behavior of types or fields. We'll use several Dgraph-specific directives:
@id: Marks a field as a unique identifier.
@search: Enables indexing and searching on a field.
@hasInverse: Creates a bidirectional relationship between two types.
@dgraph: (We won't use this directly, but it's used internally by Dgraph).
Our Data Model:

Here's the Dgraph schema we'll be using for our personal finance dashboard, including the additions for the commodities trading game (we'll cover the game in more detail in future posts):
```
GraphQL

type User {
    id: ID!
    email: String! @id @search(by: [exact])
    transactions: [Transaction] @hasInverse(field: user)
    accounts: [Account] @hasInverse(field: user)
    vendors: [Vendor] @hasInverse(field: user)
    contacts: [Contact] @hasInverse(field: user)
	savingsPlans: [SavingsPlan] @hasInverse(field: user)
	investmentPlans: [InvestmentPlan] @hasInverse(field: user)
    tags: [Tag] @hasInverse(field: users)
    gameData: GameData # For the commodities game
}

type Transaction {
    id: ID!
    user: User!
    date: DateTime!
    amount: Float!
    category: Category!
    description: String @search(by: [fulltext])
    account: Account
    vendor: Vendor
    tags: [Tag] @hasInverse(field: transactions)
}

type Category {
    id: ID!
    name: String! @id
}

type Account {
    id: ID!
    user: User!
    plaidAccountId: String # Optional, for Plaid integration
    name: String!
    type: String
    transactions: [Transaction] @hasInverse(field: account)
    contacts: [Contact] @hasInverse(field: account)
    tags: [Tag] @hasInverse(field: accounts)
}

type Vendor {
    id: ID!
    user: User!
    name: String! @search(by: [fulltext, exact])
    contacts: [Contact] @hasInverse(field: vendor)
    transactions: [Transaction] @hasInverse(field: vendor)
    tags: [Tag] @hasInverse(field: vendors)
}

type Contact {
    id: ID!
    user: User!
    name: String!
    email: String
    phone: String
    vendor: Vendor
    account: Account
    tags: [Tag] @hasInverse(field: contacts)
}

type Tag {
    id: ID!
    name: String! @id # Unique tag names across the app
    users: [User] @hasInverse(field: tags)
    transactions: [Transaction] @hasInverse(field: tags)
    accounts: [Account] @hasInverse(field: tags)
    vendors: [Vendor] @hasInverse(field: tags)
	contacts: [Contact] @hasInverse(field: tags)
	savingsPlans: [SavingsPlan] @hasInverse(field: tags)
	investmentPlans: [InvestmentPlan] @hasInverse(field: tags)
}

type SavingsPlan {
	id: ID!
	user: User!
	name: String!
	goalAmount: Float!
	currentAmount: Float!
	targetDate: DateTime
	tags: [Tag] @hasInverse(field: savingsPlans)
	strategy: String
}

type InvestmentPlan {
	id: ID!
	user: User!
	name: String!
	initialInvestment: Float!
	currentValue: Float!
	targetReturn: Float
	riskTolerance: String
	tags: [Tag] @hasInverse(field: investmentPlans)
	strategy: String
}

# --- Commodities Game Types ---

type GameData {
  id: ID!
  cash: Float!
  commodities: [CommodityInventory] @hasInverse(field: gameData)
  transactions: [GameTransaction]
}

type Commodity {
    id: ID!
    name: String! @id # e.g., "Gold", "Silver", "Crude Oil"
    unit: String! # e.g., "oz", "barrel", "bushel"
    currentPrice: Float! #  Could be updated periodically
    historicalPrices: [PriceHistory]
}

type PriceHistory {
    id: ID!
    commodity: Commodity!
    timestamp: DateTime!
    price: Float!
}

type CommodityInventory {
    id: ID!
    gameData: GameData!
    commodity: Commodity!
    quantity: Float!
    averagePurchasePrice: Float!
}

type GameTransaction {
    id: ID!
    user: User!
    commodity: Commodity!
    type: String! # "buy" or "sell"
    quantity: Float!
    price: Float!
    timestamp: DateTime!
    fees: Float!
}

# --- For Arbitrage (Future) ---
type Market {
  id: ID!
  name: String!
  commodityPrices: [MarketCommodityPrice] @hasInverse(field: market)
}

type MarketCommodityPrice {
    id: ID!
    market: Market!
    commodity: Commodity!
    price: Float!
}

# --- For Supply/Demand Simulation (Future) ---
type Event {
    id: ID!
    name: String!
    description: String
    impact: [EventImpact]
}

type EventImpact {
    id: ID!
    event: Event!
    commodity: Commodity
    market: Market
    priceChange: Float!
    duration: Int
}
```
Explanation of Key Types and Fields:

User: Represents a user of the application. Links to transactions, accounts, vendors, contacts, and game data.
Transaction: Represents a financial transaction (income or expense).
Category: Represents a broad category for transactions (e.g., "Food," "Transportation," "Entertainment").
Account: Represents a bank account or credit card. Includes a plaidAccountId for future Plaid integration.
Vendor: Represents a business or entity that the user transacts with.
Contact: Represents a person associated with a vendor or account.
Tag: Allows users to create custom tags for categorizing transactions, accounts, vendors, or contacts. Tag names are unique across the application.
SavingsPlan: Represents the User's savings plan.
InvestmentPlan: Represents the User's investment plan.
GameData: Holds the user's state within the commodities trading game (cash balance, commodity holdings, transaction history).
Commodity: Represents a tradeable commodity (e.g., "Gold," "Oil").
CommodityInventory: Represents the user's holdings of a specific commodity.
GameTransaction: Records each buy/sell transaction within the game.
Market, MarketCommodityPrice, Event, EventImpact: These types are for the more advanced features of the commodities game (arbitrage and supply/demand simulation) and will be implemented later.
Applying the Schema to Dgraph:

Dgraph Cloud:

Log in to your Dgraph Cloud account.
Go to your deployment's "Schema" tab.
Paste the schema code into the editor.
Click "Deploy".
Local Dgraph (using Docker Compose):

Make sure your Dgraph containers are running (docker-compose up -d).
You have two main options for applying the schema:
Ratel UI: Open Ratel (http://localhost:8000), go to the "Schema" tab, paste the schema, and click "Apply".

curl command:  Use a curl command to send a mutation to the /admin endpoint.  This is useful for automation.  Here's an example:

Bash

curl -X POST localhost:8080/admin/schema --data-binary '@schema.graphql'
(Assuming you've saved the schema to a file named schema.graphql in the same directory).

It is recommended to create a shell script file to help apply the Dgraph schema, using the curl command, for ease.
Testing the Schema:

After applying the schema, you can use the Dgraph UI (Ratel or Dgraph Cloud's explorer) to run some basic queries and mutations to verify that it's working correctly. For example, you could try adding a Category and then querying for it.

This Step:

Implemented Docker Compose
Created the Dgraph Schema
Next Steps:

In the next blog post, we'll start building the frontend of our application. We'll create the TransactionForm and TransactionList components using Next.js and Tailwind CSS, initially using local component state for data management. This will give us a working UI that we can then connect to Dgraph in a subsequent step.