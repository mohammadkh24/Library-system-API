const url = require("url");
const RentModel = require("../models/Rent");
const BookModel = require("../models/Book");

const rentData = async (req, res) => {
  let reqBody = "";

  req.on("data", (data) => {
    reqBody = reqBody + data;
  });

  req.on("end", async () => {
    let { userID, bookID } = JSON.parse(reqBody);

    const isFreeBook = await BookModel.findBookByIdAndFreeStatus(bookID);

    if (isFreeBook) {
      BookModel.updateBook(bookID, 0);

      const newRent = {
        userID,
        bookID,
      };

      await RentModel.rent(newRent);
  
      res.writeHead(201, { "Content-Type": "application/json" });
      res.write(JSON.stringify({message: "Book Reserved Successfully"}));
      res.end();
    } else {
        res.writeHead(401, { "Content-Type": "application/json" });
        res.write(JSON.stringify({ message: "This book is not free!" }));
        res.end();
      }
  });
} 

module.exports = {
  rentData,
};
