function findAuthorById(authors, id) {
  // looks through author array to find the first matching id if not found return null
  const result = authors.find((authorsObj=> {
    return authorsObj.id === id
  }))
  if (result === undefined){
    return null
  }
  return result
}

function findBookById(books, id) {
  // looks through books array to find the first matching id if undefined returns null
  const result = books.find((booksObj)=>{
    return booksObj.id === id
  })
  if (result === undefined){
    return null
  }
  return result
}

function partitionBooksByBorrowedStatus(books) {
  // goes through books and filters out the books that are still being borrowed
  const stillBorrowed = books.filter((bookObj)=>{
    // looks through borrows array to look for false
    return bookObj.borrows.some((borrowsObj)=> borrowsObj.returned === false)
  })
  // looks through books array to find the books that have been returned
  const returnedBooks = books.filter((bookObj)=>{
    return bookObj.borrows.every((borrowsObj)=> borrowsObj.returned === true)
  })
  return [stillBorrowed,returnedBooks]
}

function getBorrowersForBook(books, accounts) {
  //get to borrows array from books object
  const {borrows} = books
  // loop through borrows array to get to borrow.id
    const resultBorrows = borrows.map((borrowsObj)=>{
      // loop through accounts to accounts.id
      let matchingAccount = accounts.find((accountsObj)=>{
        //find and sees if the ids matches
          return accountsObj.id === borrowsObj.id
        
      })
      //adds .returned to accounts from books
      matchingAccount.returned = borrowsObj.returned
      //pushs the account array into the new array
      return matchingAccount
    })
  //return the resulting array with only 10 objects
  return resultBorrows.slice(0,10)
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
