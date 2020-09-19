//async/await的使用方法

// function getSomething() {
//   return 'something'
// }


// async function testAsync() {
//   return 'hello async'
// }

// async function test() {
//   const v1 = await getSomething()
//   const v2 = await testAsync()
//   console.log(v1, v2)
// }

// test()

function takeLongTime() {
  return new Promise(resolve => {
    setTimeout(() => resolve('long_time_value'),3000)
  })
}

async function test() {
  const v = await takeLongTime()
  console.log(v);
}

test()