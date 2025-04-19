// const mk = (mas)=>{
// for(let i = 0; i < mas.length; i++){
//  for(let o = 0; o < mas[i].length; o++){
//    console.log(mas[i][2])
//  }
// }
// }

// mk([[1,2,3],[1,2,3],[3,2,1]]);

// const data = {
//   name: 'erdenee',
//   age: 20,
//   job: true
// };

// const m = Object.entries(data).map(([e,f])=>{
//   console.log(e,f)
// })

const data = {
  a1: { name: 'Apple', price: 2 },
  b2: { name: 'Banana', price: 1 },
}

const result = Object.entries(data).map(([id, value]) => ({
  id,
  ...value,
}))

console.log(result)
