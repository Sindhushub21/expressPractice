const { resolve } = require("path");
const fs = require('fs');
const express = require('express');
const expressBackEnd = express();
const port = 3000
expressBackEnd.use(express.json()); //help parse incoming data
expressBackEnd.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

let count = 0;

// CRUD Operations
expressBackEnd.get('/', (req, res) => {
  requireJson("./student-3.json")
    .then((result) => { res.send(result) });
})
expressBackEnd.post('/', (req, res) => {
  count++;
  requireJson("./student-3.json")
    .then((js) => {
      js.push(req.body);
      return js
    })
    .then((data) => {
      fs.writeFile('student-3.json', JSON.stringify(data, null, 2), (err) => {
        if (err) throw err;
        console.log('Data written to file');
        res.send(data);
        
      });
    }
    )
})
expressBackEnd.delete("/:name", (req, res) => {
  let nameToDelete = (req.params.name).replace('name:','');
  requireJson("./student-3.json")
  .then((js) => { 
    return js.filter(name => name.name !== nameToDelete);
  })
  .then((data) => {
    fs.writeFile('student-3.json', JSON.stringify(data, null, 2), (err) => {
      if (err) throw err;
      console.log('Data written to file');
      res.send(data);
    });
  })
})
expressBackEnd.put("/:name", (req, res) => {
  let nameToDelete = (req.params.name).replace('name:','');
  requireJson("./student-3.json")
  .then((js) => { 
    let arr = js.filter(name => name.name !== nameToDelete);
    return arr.concat(req.body);
  })
  .then((data) => {
    fs.writeFile('student-3.json', JSON.stringify(data, null, 2), (err) => {
      if (err) throw err;
      console.log('Data written to file');
      res.send(data);
    });
  })
})


// HELPER FUNCTIONS
async function requireJson(path) {
  return await JSON.parse(fs.readFileSync(resolve(__dirname, path), "utf8"));
}

// WRITE FILE CODE
//
// let student = { 
//   name: 'Mike',
//   age: 23, 
//   gender: 'Male',
//   department: 'English',
//   car: 'Honda' 
// };
// let studentTwo = { 
//   name: 'Joe',
//   age: 27, 
//   gender: 'Male',
//   department: 'English',
//   car: 'BMW' 
// };
// var dataOne = [student, studentTwo];
// var dataTwo = JSON.stringify(dataOne, null, 2);
// fs.writeFileSync('student-3.json', dataTwo);