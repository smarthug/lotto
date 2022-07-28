export function GetDrawNumber() {
    const firstDraw = new Date(2002, 11, 7, 20, 40, 0);
    // console.log(firstDraw.toString())
    // console.log(firstDraw.getTime())

    // console.log(Date.now())

    let elapsedTime = Date.now() - firstDraw.getTime()
    // console.log(elapsedTime* 0.001 /3600/24/7)
    // console.log(elapsedTime/604800000)
    // console.log(Math.trunc(elapsedTime/604800000)+1)

    let drawNum = Math.trunc(elapsedTime / 604800000) + 1

    return drawNum
}

// let response = await fetch(request)
// response = new Response(response.body, response)
// response.headers.set('access-control-allow-origin', '*')
// response.headers.set('access-control-allow-headers', '*')

// 1000개 테스트
        // console.time('test')
        // for (let index = 0; index < 100000; index++) {


        //     AutoPick()
        // }
        // console.timeEnd('test')

        // const test = GetDrawNumber();
        // console.log(test);