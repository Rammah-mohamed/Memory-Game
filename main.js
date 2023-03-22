//create level obj
const lvlObj = {
    "easy": 5,
    "normal": 3,
    "hard": 2
}
const catObj = {
    "Cartoon": [
        {
            "data": "c1",
            "img": "imgs/cartoon 1.jpg"

        },
        {
            "data": "c2",
            "img": "imgs/cartoon 2.jpg"

        },
        {
            "data": "c3",
            "img": "imgs/cartoon 3.jpg"

        },
        {
            "data": "c4",
            "img": "imgs/cartoon 4.jpg"

        },
        {
            "data": "c5",
            "img": "imgs/cartoon 5.jpg"

        },
        {
            "data": "c6",
            "img": "imgs/cartoon 6.jpg"

        },
        {
            "data": "c7",
            "img": "imgs/cartoon 7.jpg"

        },
        {
            "data": "c8",
            "img": "imgs/cartoon 8.jpg"

        },
        {
            "data": "c9",
            "img": "imgs/cartoon 9.jpg"

        },
        {
            "data": "c10",
            "img": "imgs/cartoon 10.jpg"

        }
    ],
    "Sport": [
        {
            "data": "s1",
            "img": "imgs/sport 1.jpg"
        },
        {
            "data": "s2",
            "img": "imgs/sport 2.jpg"
        },
        {
            "data": "s3",
            "img": "imgs/sport 3.jpg"
        },
        {
            "data": "s4",
            "img": "imgs/sport 4.jpg"
        },
        {
            "data": "s5",
            "img": "imgs/sport 5.jpg"
        },
        {
            "data": "s6",
            "img": "imgs/sport 6.jpg"
        },
        {
            "data": "s7",
            "img": "imgs/sport 7.jpg"
        },
        {
            "data": "s8",
            "img": "imgs/sport 8.jpg"
        },
        {
            "data": "s9",
            "img": "imgs/sport 9.jpg"
        },
        {
            "data": "s10",
            "img": "imgs/sport 10.jpg"
        }
    ],
    "Animal": [
        {
            "data": "a1",
            "img": "imgs/Animal 1.jpg"
        },

        {
            "data": "a2",
            "img": "imgs/Animal 2.jpg"
        },

        {
            "data": "a3",
            "img": "imgs/Animal 3.jpg"
        },

        {
            "data": "a4",
            "img": "imgs/Animal 4.jpg"
        },

        {
            "data": "a5",
            "img": "imgs/Animal 5.jpg"
        },

        {
            "data": "a6",
            "img": "imgs/Animal 6.jpg"
        },

        {
            "data": "a7",
            "img": "imgs/Animal 7.jpg"
        },

        {
            "data": "a8",
            "img": "imgs/Animal 8.jpg"
        },

        {
            "data": "a9",
            "img": "imgs/Animal 9.jpg"
        },

        {
            "data": "a10",
            "img": "imgs/Animal 10.jpg"
        },

    ]
}
// select Starting Buttons
let catsElement = document.querySelectorAll(".cat span"),
    lvlsElement = document.querySelectorAll(".lvl span"),
    userIn = document.querySelector(".start input"),
    startButton = document.querySelector(".start-button");
//select game blocks element
let gameBlocks = document.querySelector(".game-blocks"),
    gameBlock = document.querySelectorAll(".game-block"),
    matched = 0;
//select info elements & imgs
let userName = document.querySelector(".userName span"),
    lvl = document.querySelector(".info-lvl span"),
    cat = document.querySelector(".info-cat span"),
    count,
    timerMin = document.querySelector(".timer .min"),
    timerSec = document.querySelector(".timer .sec"),
    tries = document.querySelector(".tries span"),
    imgs = document.querySelectorAll(".back img");
//add starting button selection to content
//Default value
cat.innerHTML = "Animal";
lvl.innerHTML = "Normal";
timerMin.innerHTML = lvlObj["normal"];
//[1] category done
catsElement.forEach(category => {
    category.onclick = () => {
        cat.innerHTML = category.dataset.cat;
        //add imgs src from catobj & set first index for itration
        let iImg = 0;
        let countImg = 2;
        imgs.forEach(image => {
            if (countImg > 0) {
                image.src = catObj[category.dataset.cat][iImg]["img"];
                countImg--;
            } else {
                countImg = 1;
                iImg++;
                image.src = catObj[category.dataset.cat][iImg]["img"];
            }
        });
        //add data match to game blocks
        let i = 0;
        let count = 2
        gameBlock.forEach(block => {
            if (count > 0) {
                block.dataset.match = catObj[category.dataset.cat][i]["data"];
                count--;
            } else {
                count = 1;
                i++;
                block.dataset.match = catObj[category.dataset.cat][i]["data"];
            }
        })
        category.style.backgroundColor = "#50031d";
    };
});
//[2] levels
lvlsElement.forEach(level => {
    level.onclick = () => {
        lvl.innerHTML = level.dataset.lvl;
        timerMin.innerHTML = lvlObj[level.dataset.lvl];
        level.style.backgroundColor = "#50031d";
    };
});
//[3] input
startButton.onclick = () => {
    if (userIn.value === "" || userIn.value === null) {
        userName.innerHTML = "Unknown";
    } else {
        userName.innerHTML = userIn.value;
    };
    document.querySelector(".starting").remove();
    document.querySelector(".background-music").play();
    //start count
    counter();
    //suffled order array
    let orderRange = [...Array(gameBlock.length).keys()];
    shuffle(orderRange);
    // change game block ordering 
    gameBlock.forEach((block, index) => {
        block.style.order = orderRange[index];
    })
    //trigger flip function
    flip();
};
//counter function
function counter() {
    count = setInterval(() => {
        if (timerSec.innerHTML > 0) {
            `0${timerSec.innerHTML--}`;
        } else {
            timerSec.innerHTML = 59;
            timerMin.innerHTML > 0 ? `0${timerMin.innerHTML--}` : endGame();
        }
    }, 1000)
}
//end game function 
function endGame() {
    if (timerMin.innerHTML === "0") {
        timerSec.innerHTML = "00";
        timerMin.innerHTML = "00";
        clearInterval(count);
        gameBlocks.innerHTML = "<span>game over</span>";
        console.log(matched);
    } else if (matched === 10) {
        clearInterval(count);
        gameBlocks.innerHTML = "<span>congradulation</span>";
    }
}
//shuffle function
function shuffle(arr) {
    let current = arr.length,
        temp,
        random;
    while (current > 0) {
        random = Math.floor(Math.random() * current);
        current--;
        temp = arr[current];
        arr[current] = arr[random];
        arr[random] = temp;
    }
    return arr;
}
//flip function
function flip() {
    let flipNum = 0;
    gameBlock.forEach(b => {
        b.onclick = () => {
            b.classList.add("is-flipped");
            if (flipNum < 1) {
                flipNum++;
            } else {
                let FlippedBlocks = document.querySelectorAll(".is-flipped");
                if (FlippedBlocks[0].dataset.match === FlippedBlocks[1].dataset.match) {
                    matched++;
                    //trigger end game function
                    endGame();
                    document.querySelector(".success").play();
                    FlippedBlocks[0].classList.add("match");
                    FlippedBlocks[0].classList.remove("is-flipped");
                    FlippedBlocks[1].classList.add("match");
                    FlippedBlocks[1].classList.remove("is-flipped");
                } else {
                    tries.innerHTML++;
                    document.querySelector(".fail").play();
                    setTimeout(() => {
                        FlippedBlocks[0].classList.remove("is-flipped");
                        FlippedBlocks[1].classList.remove("is-flipped");
                    }, 200)
                }
            }
        }
    })
}