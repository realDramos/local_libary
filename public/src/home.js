const { findAuthorById } = require("./books");

//get total books in the library
function getTotalBooksCount(books) {
  return books.length;
}
//get total accounts signed up on the website
function getTotalAccountsCount(accounts) {
  return accounts.length;
}

//get the amount of books borrowed
function getBooksBorrowedCount(books) {
// loop through the books array to get to borrows array
const result = books.reduce((acc,booksObj)=>{
  const {borrows} = booksObj
  //loops through borros array 
  const borrowAmount = borrows.some((borrowsObj)=>{
    //checks to find if there is any borrowed books
    return borrowsObj['returned'] === false
  })
  //set the borrow amount +1
  if (borrowAmount === true){
    acc++
  }
  return acc

},0)
// return result
return result
  
}

function getMostCommonGenres(books) {
  //find the genre from books array
  let genreObj = {}
    books.forEach(booksObj => {
      //if it is new make a key in the object
      if (genreObj[booksObj.genre] === undefined){
        genreObj[booksObj.genre] = 1
      }else {
        //add one to a count each time it is found.
        genreObj[booksObj.genre]+= 1
      }
    });
    // push the object into an array
    const finalArray = []
    for (const genre in genreObj) {
        let info = {name: genre, count: genreObj[genre]}
        finalArray.push(info)
    }
  //sort it to have the most popular first
     finalArray.sort((keyA,keyB)=>{
       return keyB.count-keyA.count
     })
  //output an array of objects no more than 5
  return finalArray.slice(0,5)
}
//helper function to find the most popular books using sort
function mostPopularBookHelper(books){
  books.sort((elementA,elementB)=>{
    return elementB.borrows.length - elementA.borrows.length
  })
  return books
}
function getMostPopularBooks(books) {
  //helper function that sorts through the books for the most popular books
  books = mostPopularBookHelper(books)
  //slices the books array to 5
  const popularBooks = books.slice(0,5)
//reformats the array to look the right way
  const final = popularBooks.map((bookObj)=>{
    return {
      name:bookObj.title,
      count:bookObj.borrows.length
    }
  })
  return final
}
//function to make the code prettier
function getAuthorName({name:{first,last}}){
  return `${first} ${last}`
}

function getMostPopularAuthors(books, authors) {
  //get the most popular books sorted
  books = mostPopularBookHelper(books).slice(0,5)
  return books.map((booksObj)=>{
    const finalAuthor = findAuthorById(authors, booksObj.authorId)
    return {
      name:getAuthorName(finalAuthor),
      count:booksObj.borrows.length
    }
  })
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
