import { useEffect } from "react"
import axios from 'axios'

//https://www.dhlottery.co.kr/common.do?method=getLottoNumber&drwNo=990


const lottoNums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46,];


function AutoPick() {
    const numsToPick = [...lottoNums]
    const pickedNums = []

    pickedNums.push(numsToPick.splice(SelectRandomNumber(46), 1)[0])
    pickedNums.push(numsToPick.splice(SelectRandomNumber(45), 1)[0])
    pickedNums.push(numsToPick.splice(SelectRandomNumber(44), 1)[0])
    pickedNums.push(numsToPick.splice(SelectRandomNumber(43), 1)[0])
    pickedNums.push(numsToPick.splice(SelectRandomNumber(42), 1)[0])
    pickedNums.push(numsToPick.splice(SelectRandomNumber(41), 1)[0])

    pickedNums.sort((a, b) => a - b)

    return pickedNums
}

function SelectRandomNumber(length) {
    return Math.trunc(Math.random() * length)
}

export default function Home() {

    useEffect(() => {
        window.exp = {}
        window.exp.SelectRandomNumber = SelectRandomNumber
        window.exp.AutoPick = AutoPick

        // Make a request for a user with a given ID
        axios.get('https://www.dhlottery.co.kr/common.do?method=getLottoNumber&drwNo=990')
            .then(function (response) {
                // handle success
                console.log(response);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .then(function () {
                // always executed
            });

        // 1000개 테스트
        // console.time('test')
        // for (let index = 0; index < 100000; index++) {


        //     AutoPick()
        // }
        // console.timeEnd('test')
    }, [])

    return (
        <div>
            Home
        </div>
    )
}


