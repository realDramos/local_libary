function findAccountById(accounts, id) {
  // looks through accounts to find the matching id if not return null
  const result = accounts.find((accountObj)=>{
    return accountObj.id === id
  })
  if (result === undefined){
    return null;
  }
  return result
}

function sortAccountsByLastName(accounts) {
  //sorts the account array for last names
  accounts.sort((elementA,elementB)=>{
    return (elementA.name.last.toLowerCase() < elementB.name.last.toLowerCase()) ? -1:1;
  })
  return accounts
}

function getTotalNumberOfBorrows(account, books) {
  //get the id from account
  const {id} = account
  //loop through books 
  const count = books.reduce((acc,booksObj)=>{
    //get to the borrows array
    const {borrows} = booksObj
    //loop through borrows to find the ids in borrows
    const foundAccount = borrows.filter((borrowsObj)=>{
      //if the ids match it gets put into the foundAccount array
       return borrowsObj.id === id
    })
    //if the account is defined it adds the length of the arary into he accumilator in reduce
    if (foundAccount != undefined){
      //add the 
      return acc + foundAccount.length
    }
    return acc
  },0)
  //return the count
  return count
}

function getBooksPossessedByAccount(account, books, authors) {
  //need to find account id and book id
  const {id:accountId} = account
  //need to match the ids if matching return it to an array 
  const result = books.filter((booksObj)=>{
    const {borrows} = booksObj
    const foundAccount = borrows.some((borrowsObj)=>{
      //checks that both the accountId is equal and the that the book hasnt yet been returned
      return borrowsObj.id === accountId && borrowsObj.returned === false
    })
    if (foundAccount === true){
      //match the authorId to the id on authors.
      //uses a helper function to get the author of the book
      const authorOfBook = findAccountById(authors, booksObj.authorId)
      //then the author to that book must be returned as well.
      booksObj.author = authorOfBook
      return true
    }
    return false
  })
  return result
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
