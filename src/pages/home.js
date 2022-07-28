import { useEffect, useState } from "react"
import axios from 'axios'
import { GetDrawNumber } from '../utils/time'

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
    const [drawNum, setDrawNum] = useState();
    const [winNum, setWinNum] = useState([]);

    useEffect(() => {
        window.exp = {}
        window.exp.SelectRandomNumber = SelectRandomNumber
        window.exp.AutoPick = AutoPick


        fetchWinNumbers()

    }, [])

    function fetchWinNumbers() {

        let prevDrawNumber = localStorage.getItem("drawNum") ?? 0;
        console.log(prevDrawNumber)
        let drawNum = GetDrawNumber()
        console.log(drawNum)
        // 로컬스토러지에 저장한 회자 번호와 , getdrawnumber 로 나온 번호가 다를시 
        // 1주일에 한번 날리기
        // string 1025 랑 숫자 1025 랑 다르구나 
        if (prevDrawNumber !== `${drawNum}`) {

            axios.get('https://square-disk-826c.kirklayer6590.workers.dev')
                .then(function (response) {
                    // handle success
                    console.log(response);
                    const data = response.data
                    // local storage 에 저장 ...
                    localStorage.setItem('data', JSON.stringify(data))
                    localStorage.setItem('drawNum', data.drwNo)
                    localStorage.setItem('winNum', JSON.stringify([data.drwtNo1, data.drwtNo2, data.drwtNo3, data.drwtNo4, data.drwtNo5, data.drwtNo6, data.bnusNo]))

                    // setState , 회차 , 숫자 
                    setDrawNum(localStorage.getItem('drawNum'))
                    setWinNum(localStorage.getItem('winNum'))
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                })
                .then(function () {
                    // always executed
                });
        } else {
            console.log('using localstorage data');
            // 여기서 get Item 한걸로 setstate ...
            setDrawNum(localStorage.getItem('drawNum'))
            setWinNum(JSON.parse(localStorage.getItem('winNum')))
            console.log(JSON.parse(localStorage.getItem('winNum')));
            // console.log();
        }
    }

    return (
        <div>
            <h1>{drawNum} 회</h1>
            <div>
                {
                    winNum && winNum.map((v, i) => {
                        return (
                            <span style={{margin:"8px"}} key={i}>{v}</span>
                        )
                    })
                }
            </div>
        </div>
    )
}


