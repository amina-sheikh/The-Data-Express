const url = "http://localhost:3000/api"

const q1c = document.getElementById("q1")
const ctx1 = q1c.getContext("2d")
const q2c = document.getElementById("q2")
const ctx2 = q2c.getContext("2d")
const q3c = document.getElementById("q3")
const ctx3 = q3c.getContext("2d")

const barLength = q1c.width*(4.5/8)
const barStartX = (q1c.width*(3/8))-40

const question1 = 'What is your favorite pet?'
const question2 = 'How do you get to school?'
const question3 = 'What is your favorite snack?'
let q1Answers
let q1a1 = 'Cat: '
let q1a2 = 'Dog: '
let q1a3 = 'Snake: '
let q1a4 = 'Fish: '
let q2Answers
let q2a1 = 'Bus: '
let q2a2 = 'Trax: '
let q2a3 = 'Car: '
let q2a4 = 'Bike: '
let q3Answers
let q3a1 = 'Chips: '
let q3a2 = 'Candy: '
let q3a3 = 'Crackers: '
let q3a4 = 'Cookies: '

//draw first graph
const drawQ1 = myData => {
    //console.log('Drawing question 1 graph')
    let total = myData["What is your favorite pet?"].Cat + myData["What is your favorite pet?"].Dog + myData["What is your favorite pet?"].Snake + myData["What is your favorite pet?"].Fish
    let a1length = (myData["What is your favorite pet?"].Cat/total)*barLength
    let a2length = (myData["What is your favorite pet?"].Dog/total)*barLength
    let a3length = (myData["What is your favorite pet?"].Snake/total)*barLength
    let a4length = (myData["What is your favorite pet?"].Fish/total)*barLength

    ctx1.font = "40px Times New Roman";
    ctx1.textAlign = "center"
    ctx1.fillText(question1, q1c.width/2, 60);

    ctx1.font = "30px Calibri";
    ctx1.fillStyle = "black"
    ctx1.textAlign = "left"
    ctx1.fillText(q1a1 + myData["What is your favorite pet?"].Cat, q1c.width/8, 120);
    ctx1.fillStyle = "#D2B48C"
    ctx1.fillRect((q1c.width/8)-40, 120, 30, -20)

    ctx1.font = "30px Calibri";
    ctx1.fillStyle = "black"
    ctx1.textAlign = "left"
    ctx1.fillText(q1a2 + myData["What is your favorite pet?"].Dog, q1c.width/8, 180);
    ctx1.fillStyle = "#FFA07A"
    ctx1.fillRect((q1c.width/8)-40, 180, 30, -20)

    ctx1.font = "30px Calibri";
    ctx1.fillStyle = "black"
    ctx1.textAlign = "left"
    ctx1.fillText(q1a3 + myData["What is your favorite pet?"].Snake, q1c.width/8, 240);
    ctx1.fillStyle = "#FFDEAD"
    ctx1.fillRect((q1c.width/8)-40, 240, 30, -20)

    ctx1.font = "30px Calibri";
    ctx1.fillStyle = "black"
    ctx1.textAlign = "left"
    ctx1.fillText(q1a4 + myData["What is your favorite pet?"].Fish, q1c.width/8, 300);
    ctx1.fillStyle = "#FFB6C1"
    ctx1.fillRect((q1c.width/8)-40, 300, 30, -20)

    // ctx1.fillStyle = "red"
    ctx1.fillStyle = "#D2B48C"
    ctx1.fillRect(barStartX, 300, a1length, -200)
    // ctx1.fillStyle = "blue"
    ctx1.fillStyle = "#FFA07A"
    ctx1.fillRect(barStartX+a1length, 300, a2length, -200)
    // ctx1.fillStyle = "green"
    ctx1.fillStyle = "#FFDEAD"
    ctx1.fillRect(barStartX+a1length+a2length, 300, a3length, -200)
    // ctx1.fillStyle = "purple"
    ctx1.fillStyle = "#FFB6C1"
    ctx1.fillRect(barStartX+a1length+a2length+a3length, 300, a4length, -200)
}
fetch(url)
    .then(response => response.json())
        .then(data => {drawQ1(data)})

//draw second graph
const drawQ2 = myData => {
    let total = myData["How do you get to school?"].Bus + myData["How do you get to school?"].Trax + myData["How do you get to school?"].Car + myData["How do you get to school?"].Bike
    let a1length = (myData["How do you get to school?"].Bus/total)*barLength
    let a2length = (myData["How do you get to school?"].Trax/total)*barLength
    let a3length = (myData["How do you get to school?"].Car/total)*barLength
    let a4length = (myData["How do you get to school?"].Bike/total)*barLength

    ctx2.font = "40px Times New Roman";
    ctx2.textAlign = "center"
    ctx2.fillText(question2, q1c.width/2, 60);

    ctx2.font = "30px Calibri";
    ctx2.fillStyle = "black"
    ctx2.textAlign = "left"
    ctx2.fillText(q2a1 + myData["How do you get to school?"].Bus, q1c.width/8, 120);
    ctx2.fillStyle = "#D2B48C"
    ctx2.fillRect((q1c.width/8)-40, 120, 30, -20)

    ctx2.font = "30px Calibri";
    ctx2.fillStyle = "black"
    ctx2.textAlign = "left"
    ctx2.fillText(q2a2 + myData["How do you get to school?"].Trax, q1c.width/8, 180);
    ctx2.fillStyle = "#FFA07A"
    ctx2.fillRect((q1c.width/8)-40, 180, 30, -20)

    ctx2.font = "30px Calibri";
    ctx2.fillStyle = "black"
    ctx2.textAlign = "left"
    ctx2.fillText(q2a3 + myData["How do you get to school?"].Car, q1c.width/8, 240);
    ctx2.fillStyle = "#FFDEAD"
    ctx2.fillRect((q1c.width/8)-40, 240, 30, -20)

    ctx2.font = "30px Calibri";
    ctx2.fillStyle = "black"
    ctx2.textAlign = "left"
    ctx2.fillText(q2a4 + myData["How do you get to school?"].Bike, q1c.width/8, 300);
    ctx2.fillStyle = "#FFB6C1"
    ctx2.fillRect((q1c.width/8)-40, 300, 30, -20)
    
    ctx2.fillStyle = "#D2B48C"
    ctx2.fillRect(barStartX, 300, a1length, -200)
    ctx2.fillStyle = "#FFA07A"
    ctx2.fillRect(barStartX+a1length, 300, a2length, -200)
    ctx2.fillStyle = "#FFDEAD"
    ctx2.fillRect(barStartX+a1length+a2length, 300, a3length, -200)
    ctx2.fillStyle = "#FFB6C1"
    ctx2.fillRect(barStartX+a1length+a2length+a3length, 300, a4length, -200)
    }
fetch(url)
    .then(response => response.json())
        .then(data => {drawQ2(data)})

//draw third graph
const drawQ3 = myData => {
    let total = myData["What is your favorite snack?"].Chips + myData["What is your favorite snack?"].Candy + myData["What is your favorite snack?"].Crackers + myData["What is your favorite snack?"].Cookies
    let a1length = (myData["What is your favorite snack?"].Chips/total)*barLength
    let a2length = (myData["What is your favorite snack?"].Candy/total)*barLength
    let a3length = (myData["What is your favorite snack?"].Crackers/total)*barLength
    let a4length = (myData["What is your favorite snack?"].Cookies/total)*barLength

    ctx3.font = "40px Times New Roman";
    ctx3.textAlign = "center"
    ctx3.fillText(question3, q1c.width/2, 60);

    ctx3.font = "30px Calibri";
    ctx3.fillStyle = "black"
    ctx3.textAlign = "left"
    ctx3.fillText(q3a1 + myData["What is your favorite snack?"].Chips, q1c.width/8, 120);
    ctx3.fillStyle = "#D2B48C"
    ctx3.fillRect((q1c.width/8)-40, 120, 30, -20)

    ctx3.font = "30px Calibri";
    ctx3.fillStyle = "black"
    ctx3.textAlign = "left"
    ctx3.fillText(q3a2 + myData["What is your favorite snack?"].Candy, q1c.width/8, 180);
    ctx3.fillStyle = "#FFA07A"
    ctx3.fillRect((q1c.width/8)-40, 180, 30, -20)

    ctx3.font = "30px Calibri";
    ctx3.fillStyle = "black"
    ctx3.textAlign = "left"
    ctx3.fillText(q3a3 + myData["What is your favorite snack?"].Crackers, q1c.width/8, 240);
    ctx3.fillStyle = "#FFDEAD"
    ctx3.fillRect((q1c.width/8)-40, 240, 30, -20)

    ctx3.font = "30px Calibri";
    ctx3.fillStyle = "black"
    ctx3.textAlign = "left"
    ctx3.fillText(q3a4 + myData["What is your favorite snack?"].Cookies, q1c.width/8, 300);
    ctx3.fillStyle = "#FFB6C1"
    ctx3.fillRect((q1c.width/8)-40, 300, 30, -20)
    
    ctx3.fillStyle = "#D2B48C"
    ctx3.fillRect(barStartX, 300, a1length, -200)
    ctx3.fillStyle = "#FFA07A"
    ctx3.fillRect(barStartX+a1length, 300, a2length, -200)
    ctx3.fillStyle = "#FFDEAD"
    ctx3.fillRect(barStartX+a1length+a2length, 300, a3length, -200)
    ctx3.fillStyle = "#FFB6C1"
    ctx3.fillRect(barStartX+a1length+a2length+a3length, 300, a4length, -200)
    }
fetch(url)
    .then(response => response.json())
        .then(data => {drawQ3(data)})
