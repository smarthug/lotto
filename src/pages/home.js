import { useEffect, useState } from "react"
import axios from 'axios'
import { GetDrawNumber } from '../utils/time'
import { Button, ButtonGroup } from '@mui/material'
import _ from 'lodash'
import { numToKorean } from 'num-to-korean';
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
    const [winNum, setWinNum] = useState([0]);
    const [bonusNum, setBonusNum] = useState(0)

    const [prize1, setPrize1] = useState(0);
    const [prize2, setPrize2] = useState(0);
    const [prize3, setPrize3] = useState(0);
    const [prize4, setPrize4] = useState(0);
    const [prize5, setPrize5] = useState(0);
    const [money, setMoney] = useState(0);

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
                    localStorage.setItem('winNum', JSON.stringify([data.drwtNo1, data.drwtNo2, data.drwtNo3, data.drwtNo4, data.drwtNo5, data.drwtNo6]))
                    localStorage.setItem('bonusNum', JSON.stringify(data.bnusNo))

                    // setState , 회차 , 숫자 
                    setDrawNum(localStorage.getItem('drawNum'))
                    setWinNum(localStorage.getItem('winNum'))
                    setBonusNum(localStorage.getItem('bonusNum'))
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
            setBonusNum(localStorage.getItem('bonusNum'))
            console.log(JSON.parse(localStorage.getItem('winNum')));
            // console.log();
        }
    }


    function checkLotto(inputMoney) {
        // const winNums = [8, 9, 20, 25, 29, 33]
        // const bonusNum = 7

        const winNums = winNum
        // const bonusNum = bonusNum
        // 배열로 만들고 , 배열의 숫자를 올리자,
        // 5등 , 4등 , 3등 , 1등 ,2 등
        const prizeCount = [0, 0, 0, 0, 0]

        console.log(winNums);
        console.log(bonusNum)

        for (let index = 0; index < inputMoney; index++) {
            const pickedNums = AutoPick();

            const result = _.intersection(winNums, pickedNums)

            if (result.length === 5 && pickedNums.includes(bonusNum)) {
                // if (result.length === 5 ) {
                // 2등 
                prizeCount[4] += 1;
                console.log(pickedNums);
                if (pickedNums.includes(bonusNum)) {
                    console.log("2등 당첨");
                }
            } else if (result.length > 2) {

                // console.log(result)
                prizeCount[result.length - 3] += 1;


            }
        }
        console.log(prizeCount)

        setPrize5(prizeCount[0])
        setPrize4(prizeCount[1])
        setPrize3(prizeCount[2])
        setPrize1(prizeCount[3])

        setPrize2(prizeCount[4]);

        const totalMoney = prizeCount[0] * 5000 + prizeCount[1] * 50000 + prizeCount[2] * 1500000 + prizeCount[3] * 6118853344 + prizeCount[4] * 53260477

        setMoney(numToKorean(totalMoney, 'mixed'))
    }

    return (
        <div>
            <h1>{drawNum} 회</h1>
            <div>
                {
                    winNum.length > 1 && winNum.map((v, i) => {
                        return (
                            <span style={{ margin: "8px" }} key={i}>{v}</span>
                        )
                    })
                }
                <span style={{ margin: "8px" }} >+{bonusNum}</span>
            </div>
            <div>
                <div>1등 {prize1}회</div>
                <div>2등 {prize2}회</div>
                <div>3등 {prize3}회</div>
                <div>4등 {prize4}회</div>
                <div>5등 {prize5}회</div>
            </div>
            <div>수령금: {money}원</div>
            <ButtonGroup variant="contained" aria-label="outlined primary button group">
                <Button variant="contained" color="success" onClick={() => checkLotto(1000)} >100만원 자동구매</Button>
                <Button variant="contained" color="success" onClick={() => checkLotto(10000)} >1000만원 자동구매</Button>
                <Button variant="contained" color="success" onClick={() => checkLotto(100000)} >1억원 자동구매</Button>
                {/* <Button variant="contained" color="success" onClick={() => checkLotto(1000000)} >10억원 자동구매</Button>
                <Button variant="contained" color="success" onClick={() => checkLotto(10000000)} >100억원 자동구매</Button> */}
            </ButtonGroup>
        </div >
    )
}


