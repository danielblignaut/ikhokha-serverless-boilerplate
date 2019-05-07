const example = `
  type Author {
    id: Int!
    firstName: String
    lastName: String
    """
    the list of Posts by this author
    """
    posts: [Post]
  }

  type Post {
    id: Int!
    title: String
    author: Author
    votes: Int
  }

  # the schema allows the following query:
  type Query {
    posts: [Post]
    author(id: Int!): Author
    getPosts: [Post!]!
	  getPostById(id: Int): Post!
	  getAuthors: [Author!]!
	  getAuthorById(id: Int): Author!
  }

  # this schema allows the following mutation:
  type Mutation {
    editPost (
		postId: Int!
	): Post
	deletePost (
		postId: Int!
	): Post
	editAuthor (
		authorId: Int!
	): Author
	deleteAuthor (
		authorId: Int!
	): Author
  }

`

const exampleWithoutQueryAndMutation = `
  type Author {
    id: Int!
    firstName: String
    lastName: String
    """
    the list of Posts by this author
    """
    posts: [Post]
  }

  type Post {
    id: Int!
    title: String
    author: Author
    votes: Int
  }

 

`

export {example, exampleWithoutQueryAndMutation}