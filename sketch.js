var pot;
var doingTask = 0;
var task1progress = 0;
var ledleDist = 0;
var ledlePrevX;
var diff = 2;
var money = 0
var experience = 0;
var expToLevelUp = 100;
var level = 0;
var task2progress = 0;
var taskCompletedMsgLife = 0;
var levelUpBonusMsgLife = 0;
var taskXpMult = 1;
var taskXpMultPrice = 50;
var taskCashMult = 1;
var levelBonusMult = 1;
var taskCashMultPrice = 50;
var taskCashMultMsgLife = 0;
var taskXpMultMsgLife = 0;
var taskFailedMsgLife = 0;
var investFailureMsgLife = 0;
var stand1;
var stand1Ready = false;
var stand2;
var stand2Ready = false;
var stand3;
var stand3Ready = false;
var stand4;
var stand4Ready = false;
var placeValueList = [];
var gems = 0;
var prestigeBtn;
var prestigeLevel = 0;
var prestigeLevelPrice = 1000000000
var prestigeReady = false;
var task4msgLife = 0;
var task4msg = "";
var task4input;
var task4submit;
var investXpBoost = 1;
var investCashBoost = 1;
var bankMoney = 0;
var bankSpace = 1e+3;
var bankInterest = 1;



function preload() {
  potImg = loadImage("pot.png")
  ledleImg = loadImage("ledle.png")
  readyImg = loadImage("ready.png")
  machineImg = loadImage("machine.png")
  keyboardImg = loadImage("keyboard.png")
  passwordImg = loadImage("password.png")
}

function setup() {
  createCanvas(1200, 1200)
  frameRate(100)
  speed = 2.5
  taskCashMultBtn = createButton("Task cash multiplier")
  taskCashMultBtn.position(0, 125)
  taskCashMultBtn.mouseClicked(taskCashMultUpgrade)
  taskXpMultBtn = createButton("Task experience multiplier")
  taskXpMultBtn.position(0, 225)
  taskXpMultBtn.mouseClicked(taskXpMultUpgrade)
  stand1 = createSprite(400, 200, 100, 100)
  stand1.addImage("stand1", potImg)
  stand1.scale = 0.7
  stand1ReadySprite = createSprite(-500, -500)
  stand1ReadySprite.addImage("ready", readyImg)
  stand1ReadySprite.scale = 0.8
  stand2 = createSprite(600, 800, 100, 100)
  stand2.addImage("stand2", machineImg)
  stand2.scale = 0.7
  stand2ReadySprite = createSprite(-500, -500)
  stand2ReadySprite.addImage("ready", readyImg)
  stand2ReadySprite.scale = 0.8
  stand3 = createSprite(200, 600, 100, 100)
  stand3.addImage("stand3", keyboardImg)
  stand3ReadySprite = createSprite(-500, -500)
  stand3ReadySprite.addImage("ready", readyImg)
  stand3ReadySprite.scale = 0.8
  stand4 = createSprite(900, 600, 100, 100)
  stand4.addImage("stand2", passwordImg)
  stand4.scale = 0.7
  stand4ReadySprite = createSprite(-500, -500)
  stand4ReadySprite.addImage("ready", readyImg)
  stand4ReadySprite.scale = 0.8
  pot = createSprite(width / 2, height / 2)
  pot.visible = false
  pot.scale = 3
  pot.addImage("pot", potImg)
  ledle = createSprite(775, 430)
  ledle.addImage("ledle", ledleImg)
  ledle.visible = false;
  ledle.scale = 2;
  player = createSprite(width / 2, height / 2, 25, 25)
  prestigeBtn = createButton("Prestige")
  prestigeBtn.position(1125, 25)
  prestigeBtn.mouseClicked(prestige)
  task4input = createInput()
  task4input.position(-500, -500);
  task4submit = createButton("Submit")
  task4submit.position(-500, -500);
  task4submit.mouseClicked(checkTask4)
  investButton = createButton("Invest")
  investButton.position(-500, -500);
  investButton.mouseClicked(invest)
  investCash = createInput("0")
  investCash.position(-500, -500)
  investXp = createInput("0")
  investXp.position(-500, -500)
  depositBtn = createButton("Deposit")
  depositBtn.position(1130, 375)
  depositBtn.mouseClicked(deposit)
  withdrawBtn = createButton("Withdraw")
  withdrawBtn.position(1050, 375)
  withdrawBtn.mouseClicked(withdraw)
  bankInput = createInput("0")
  bankInput.position(1050, 400)
  placeValueList = ["K", "M", "B", "T", "Qd", "Qt", "Sx", "Sp", "Oc", "No", "Dc", "UDc", "DDc", "TDc", "qDc", "QDc", "sDc", "SDc", "ODc", "NDc", "Vg", "UVg", "DVg", "TVg", "qVg", "QVg", "sVg", "SVg", "OVg", "NVg", "Tg", "UTg", "DTg", "sTg", "STg", "OTg", "NTg", "qDg", "UqDg", "DqDg", "TqDg", "qqDg", "QqDg", "sqDg", "SqDg", "OqDg", "NqDg", "Qqg", "UQqg"]
}

function draw() { 
  background(220)
  frameRate(60)
  text(`Framerate: ${getFrameRate()}`, 50, 50)
  bankSpace = Math.pow(1.25, level) * 2000
  bankInterest = Math.floor(level / 15) * 0.0004 + 1
  if (frameCount % 200 == 0) {
    if (bankMoney < bankSpace) {
      bankMoney *= bankInterest
      if (bankMoney > bankSpace) {
        bankMoney = bankSpace
      }
    }
  }

  if (bankMoney == bankSpace) {
    push()
    textAlign(RIGHT)
    textSize(20);
    fill("orange")
    text("Your bank is full. You can no longer collect interest.", 1200, 320)
    pop()
  }
  investButton.position(-500, -500)
  investCash.position(-500, -500)
  investXp.position(-500, -500)
  if (doingTask != 0) {
    taskCompletedMsgLife = 0;
    taskFailedMsgLife = 0;
    levelUpBonusMsgLife = 0;
    taskXpMultMsgLife = 0;
    taskCashMultMsgLife = 0;

  }
  if (stand1Ready == true) {
    stand1ReadySprite.x = 400
    stand1ReadySprite.y = 100
  }

  else {
    stand1ReadySprite.x = -500
    stand1ReadySprite.y = -500
  }

  if (stand2Ready == true) {
    stand2ReadySprite.x = 600
    stand2ReadySprite.y = 700
  }

  else {
    stand2ReadySprite.x = -500
    stand2ReadySprite.y = -500
  }

  if (stand3Ready == true) {
    stand3ReadySprite.x = 200
    stand3ReadySprite.y = 500
  }

  else {
    stand3ReadySprite.x = -500
    stand3ReadySprite.y = -500
  }

  if (stand4Ready == true) {
    stand4ReadySprite.x = 900
    stand4ReadySprite.y = 500
  }

  else {
    stand4ReadySprite.x = -500
    stand4ReadySprite.y = -500
  }
  taskCashMultBtn.position(-500, -500)
  taskXpMultBtn.position(-500, -500)
  prestigeBtn.position(-500, -500)
  readyNum = random(0, 500)
  player.collide(stand1)
  player.collide(stand2)
  player.collide(stand3)
  player.collide(stand4)

  console.log(stand1Ready)

  textSize(20);
  text(`Money: $${calculateValue(money, 2)}`, 0, 40)
  text(`Gems: ${calculateValue(gems, 2)}`, 0, 70)
  text(`Experience: ${calculateValue(experience, 2)}/${calculateValue(expToLevelUp, 2)}`, 0, 1160)
  textAlign(RIGHT)
  text(`Bank: $${calculateValue(bankMoney, 2)} / $${calculateValue(bankSpace, 2)} (${calculateValue(bankMoney / bankSpace * 100, 2)}% filled, ${calculateValue(bankInterest * 100 - 100, 2)}% interest)`, 1200, 350)
  textAlign(LEFT)
  text(`Level: ${level}`, 0, 1130)
  rect(0, 1175, 250, 10)
  push()
  fill("blue")
  rect(0, 1175, experience / expToLevelUp * 250 + 0.01, 10)
  pop()
  if (experience >= expToLevelUp) {
    experience -= expToLevelUp
    bonusLevelMoney = 100
    for (var i = 0; i != level; i++) {
      bonusLevelMoneyMult = 1.5 - Math.log(1 + i / 100)
      if (bonusLevelMoneyMult < 1.1) {
        bonusLevelMoneyMult = 1.1
      }
      bonusLevelMoney *= bonusLevelMoneyMult
      
    }
    bonusLevelMoney *= investCashBoost
    money += bonusLevelMoney
    level += 1
    expToLevelUp *= 1.2
    round(expToLevelUp, 0)
    levelUpBonusMsgLife = 150

  }

  if (money >= prestigeLevelPrice) {
    prestigeLevel += 1
    prestigeLevelPrice *= 5
  }

  if (money < prestigeLevelPrice / 5 && prestigeLevel > 0) {
    prestigeLevel -= 1
    prestigeLevelPrice /= 5
  }

  if (doingTask == 0) {
    rect(990, 110, 200, 10)
    push()
    fill(rgb(255 - money / prestigeLevelPrice * 255, money / prestigeLevelPrice * 255, 0))
    rect(990, 110, money / prestigeLevelPrice * 200 + 0.01, 10)
    pop()
    investButton.position(1140, 1170)
    investXp.position(1040, 1145)
    investCash.position(1040, 1090)
    if (prestigeLevel == 0) {
      prestigeReady = true;
    }
    prestigeBtn.position(1125, 25)
    if (readyNum > 499) {
      stand1Ready = true;
    }

    else if (readyNum > 498) {
      stand2Ready = true;
    }

    else if (readyNum > 497) {
      stand3Ready = true;
    }

    else if (readyNum > 496) {
      stand4Ready = true;
    }
    if (diff == 0) {
      diffText = "Very Easy"
    }

    else if (diff == 1) {
      diffText = "Easy"
    }

    else if (diff == 2) {
      diffText = "Normal"
    }

    else if (diff == 3) {
      diffText = "Hard"
    }

    else if (diff == 4) {
      diffText = "Very Hard"
    }

    push()
    textSize(15);
    text(`Money needed to upgrade: $${calculateValue(taskCashMultPrice, 2)}`, 0, 175)
    text(`Current multiplier: x${calculateValue(taskCashMult, 2)}`, 0, 200)
    text(`Money needed to upgrade: $${calculateValue(taskXpMultPrice, 2)}`, 0, 275)
    text(`Current multiplier: x${calculateValue(taskXpMult, 2)}`, 0, 300)
    textAlign(RIGHT)
    text(`Invest 1 gem for a x1.02 multiplier.`, 1200, 1050)
    text(`XP boost (x${calculateValue(investXpBoost, 2)})`, 1200, 1135)
    text(`Cash boost (x${calculateValue(investCashBoost, 2)})`, 1200, 1080)
    pop()
    push()
    textSize(15);
    textAlign(RIGHT)
    text(`Current prestige level: ${calculateValue(prestigeLevel, 2)}`, 1200, 70)
    if (money > prestigeLevelPrice)
    text(`Money needed to level up: $${calculateValue(prestigeLevelPrice, 2)}`, 1200, 95)
    else
    text(`Money needed to level up: $${calculateValue(prestigeLevelPrice - money, 2)}`, 1200, 95)
    pop()
    taskCashMultBtn.position(0, 125);  
    taskXpMultBtn.position(0, 225);  

    text(`Press 'Q' to change difficulty. Current difficulty: ${diffText}, multiplier: x${(diff - 2) * 0.2 + 1}.`, 0, 1010)
    text("Upgrades:", 0, 100)
    if (keyDown("w")) {
      player.y -= speed
    }
  
    if (keyDown("s")) {
      player.y += speed
    }
  
    if (keyDown("a")) {
      player.x -= speed
    }
  
    if (keyDown("d")) {
      player.x += speed
    }

    textAlign(CENTER)

    if (taskCompletedMsgLife > 0) {
      push()
      fill("green")
      text(`Task completed. You received $${calculateValue(bonusMoney, 2)} and ${calculateValue(bonusExp, 2)} experience.`, width / 2, 50)
      taskCompletedMsgLife -= 1
      pop()
    }

    else if (taskFailedMsgLife > 0) {
      push()
      fill("red")
      text(`Task failed. You received no bonuses.`, width / 2, 50)
      taskFailedMsgLife -= 1
      pop()
    }

    else if (levelUpBonusMsgLife > 0) {
      push()
      fill("green")
      text(`Level up! You received $${calculateValue(bonusLevelMoney, 2)}.`, width / 2, 50)
      levelUpBonusMsgLife -= 1
      pop()
    }

    else if (taskCashMultMsgLife > 0) {
      push()
      fill("green")
      text(`Successfully upgraded task cash multiplier to x${calculateValue(taskCashMult, 2)} with $${calculateValue(taskCashMultPrice - (taskCashMult * 10 / 1.1), 2)}.`, width / 2, 50)
      taskCashMultMsgLife -= 1
      pop()
    }

    else if (taskXpMultMsgLife > 0) {
      push()
      fill("green")
      text(`Successfully upgraded task experience multiplier to x${calculateValue(taskXpMult, 2)} with $${calculateValue(taskXpMultPrice - (taskXpMult * 10 / 1.1), 2)}.`, width / 2, 50)
      taskXpMultMsgLife -= 1
      pop()
    }

    else if (investFailureMsgLife > 0) {
      push()
      fill("red")
      text(`Failed to invest.`, width / 2, 50)
      investFailureMsgLife -= 1
      pop()
    }
  }

  textAlign(CENTER)


  if (doingTask == 1) {
    text(`Stir the mixture. Progress: ${task1progress}%`, width / 2, 50)
    if (mouseDown())
    ledle.x = mouseX
    if (ledle.x > 742) {
      ledle.x = 742
    }

    if (ledle.x < 450) {
      ledle.x = 450
    }

    rect(width / 2 - 100, 65, 200, 10)

    push()
    fill(rgb(255 - task1progress * 2.55, 0 + task1progress * 2.55, 0))
    rect(width / 2 - 100, 65, task1progress * 2 + 0.001, 10)
    pop()

    ledleDist += abs(ledle.x - ledlePrevX)
    console.log(`ledleDist: ${ledleDist}`)

    ledlePrevX = ledle.x

    ledle.y = 430
    
    task1progress = (ledleDist / (500 + diff * 100)).toFixed(2)

    if (task1progress >= 100) {
      endTask(1)
    }
  }

  if (doingTask == 2) {
    text(`Click quickly to power the machine. Progress: ${task2progress.toFixed(2)}%`, width / 2, 50)
    if (task2progress > 0) {
      task2progress -= 0.02 + ((diff - 2) * 0.005)
    }

    rect(width / 2 - 100, 65, 200, 10)

    push()
    fill(rgb(255 - task2progress * 2.55, 0 + task2progress * 2.55, 0))
    rect(width / 2 - 100, 65, task2progress * 2 + 0.001, 10)
    pop()

    if (task2progress >= 100) {
      endTask(2)
    }

    if (task2progress < 0) {
      task2progress = 0
    }
  }

  if (doingTask == 3) {
    text(`Fix the code by typing. Progress: ${task3progress.toFixed(2)}%`, width / 2, 50)
    rect(width / 2 - 100, 65, 200, 10)

    push()
    fill(rgb(255 - task3progress * 2.55, 0 + task3progress * 2.55, 0))
    rect(width / 2 - 100, 65, task3progress * 2 + 0.001, 10)
    pop()

    if (task3progress >= 100) {
      endTask(3)
    }
  }

  if (doingTask == 4) {
    if (task4msgLife > 0) {
      push()
      textSize(30);
      textAlign(CENTER)
      text(`Remember!\n${task4msg}`, width / 2, 50)
      task4msgLife -= 1
      pop()
    }

    else {
      push()
      textSize(30);
      textAlign(CENTER)
      text(`Now type it in!`, width / 2, 50)
      pop()
    }
  }


  drawSprites();
}

function doTask(taskID) {
  if (taskID == 1) {
    pot.visible = true
    ledle.x = 742
    ledle.y = 450
    ledlePrevX = 742
    ledle.visible = true;
    doingTask = 1
    ledleDist = 0
  }

  if (taskID == 2) {
    doingTask = 2
    task2progress = 0;
  }

  if (taskID == 3) {
    doingTask = 3
    task3progress = 0;
  }

  if (taskID == 4) {
    doingTask = 4;
    task4input.position(width / 2 - 100, height / 2);
    task4submit.position(width / 2 - 50, height / 2 + 40);
    len = Math.floor(random(5, 10))
    task4msg = generateRandomString(len)
    task4msgLife = len * 15
  }
}

function endTask(taskID) {
  if (taskID == 1) {
    pot.visible = false
    ledle.visible = false
    doingTask = 0
    bonusMoney = random(15, 30) * ((diff - 2) * 0.2 + 1) * taskCashMult * investCashBoost
    bonusExp = random(15, 30) * ((diff - 2) * 0.2 + 1) * taskXpMult * investXpBoost
    money += bonusMoney
    experience += bonusExp
    taskCompletedMsgLife = 150
  }

  if (taskID == 2) {
    doingTask = 0
    bonusMoney = random(15, 30) * ((diff - 2) * 0.2 + 1)  * taskCashMult * investCashBoost
    bonusExp = random(15, 30) * ((diff - 2) * 0.2 + 1) * taskXpMult * investXpBoost
    money += bonusMoney
    experience += bonusExp
    taskCompletedMsgLife = 150
  }

  if (taskID == 3) {
    doingTask = 0
    bonusMoney = random(15, 30) * ((diff - 2) * 0.2 + 1)  * taskCashMult * investCashBoost
    bonusExp = random(15, 30) * ((diff - 2) * 0.2 + 1) * taskXpMult * investXpBoost
    money += bonusMoney
    experience += bonusExp
    taskCompletedMsgLife = 150
  }

  if (taskID == 40) {
    doingTask = 0
    bonusMoney = random(15, 30) * ((diff - 2) * 0.2 + 1)  * taskCashMult * investCashBoost
    bonusExp = random(15, 30) * ((diff - 2) * 0.2 + 1) * taskXpMult * investXpBoost
    money += bonusMoney
    experience += bonusExp
    task4input.position(-500, -500)
    task4submit.position(-500, -500)
    taskCompletedMsgLife = 150
  }

  if (taskID == 41) {
    doingTask = 0
    taskFailedMsgLife = 150
    task4input.position(-500, -500)
    task4submit.position(-500, -500)
  }


} 

function mouseClicked() {
  if (doingTask == 2) {
    task2progress += random(0.4, 0.8)
  }
}

function keyPressed() {
  if (keyCode == 81 && doingTask == 0) {
    if (diff == 4) {
      diff = 0
    }

    else {
      diff += 1
    }
  }

  if (keyCode == 69) {
    if (dist(stand1.x, stand1.y, player.x, player.y) < 125 && stand1Ready == true) {
      doTask(1)
      stand1Ready = false
    }

    if (dist(stand2.x, stand2.y, player.x, player.y) < 125 && stand2Ready == true) {
      doTask(2)
      stand2Ready = false
    }

    if (dist(stand3.x, stand3.y, player.x, player.y) < 125 && stand3Ready == true) {
      doTask(3)
      stand3Ready = false
    }

    if (dist(stand4.x, stand4.y, player.x, player.y) < 125 && stand4Ready == true) {
      doTask(4)
      stand4Ready = false
    }
  }

  if (doingTask == 3) {
    task3progress += (0.10 - (diff - 2) * 0.02) * random(0.7, 1.2)
  }
}

function taskCashMultUpgrade() {
  if (money >= taskCashMultPrice) {
    money -= taskCashMultPrice
    taskCashMultPrice += (taskCashMult * 10)
    taskCashMult *= 1.1
    taskCashMultMsgLife = 150
  }
}

function taskXpMultUpgrade() {
  if (money >= taskXpMultPrice) {
    money -= taskXpMultPrice
    taskXpMultPrice += (taskXpMult * 10)
    taskXpMult *= 1.1
    taskXpMultMsgLife = 150
  }
}

function prestige() {
  if (prestigeLevel == 0 || prestigeReady == false) {
    return 0;
  }
  gems += (prestigeLevel * (prestigeLevel + 1)) / 2
  taskCashMult = 1
  taskCashMultPrice = 50
  taskXpMult = 1
  taskXpMultPrice = 50
  money = 0
  experience = 0
  level = 0
  expToLevelUp = 100
  prestigeReady = false;

}

function calculateValue(value, decimals) {
  placeValue = Math.floor((str(value.toFixed(0)).length - 1) / 3)
  if (value > 1e+21) {
    placeValue = Math.floor((int(str(value).split("e+")[1])) / 3)
  }

  if (placeValue == 0) {
    return Math.floor(value * Math.pow(10, decimals)) / Math.pow(10, decimals)
  }

  else {
    return `${Math.floor(value * Math.pow(10, decimals) / Math.pow(1000, placeValue)) / Math.pow(10, decimals)}${placeValueList[placeValue - 1]}`
  }
}

function checkTask4() {
  if (task4input.value() == task4msg) {
    endTask(40)
  }
  
  else if (task4input.value() != task4msg) {
    endTask(41)
  }
  task4input.value("")
}

function generateRandomString(length) {
  chars = 'qwertyuiopasdfghjklzxcvbnm1234567890QWERTYUIOPASDFGHJKLZXCVBNM'
  result = ''
  for (var i = 0; i != length; i++) {
    result += chars.charAt(Math.floor(random(0, chars.length - 0.01)))
  }
  return result;
}

function invest() {
  if (gems < int(investXp.value()) + int(investCash.value()) || /[^0-9]/.test(investXp.value()) || /[^0-9]/.test(investCash.value())) {
    investFailureMsgLife = 150
    investXp.value("0")
    investCash.value("0")
    return 0;
  }

  else {
    gems -= int(investXp.value()) + int(investCash.value())
    investXpBoost *= Math.pow(1.02, int(investXp.value()))
    investCashBoost *= Math.pow(1.02, int(investCash.value()))
    investXp.value("0")
    investCash.value("0")
  }
}

function deposit() {
  if (/[^0-9]/.test(bankInput.value())) {
    return 0;
  }

  if (bankMoney + float(bankInput.value()) > bankSpace) {
    return 0;
  }

  if (float(bankInput.value()) > money) {
    return 0;
  }

  bankMoney += float(bankInput.value())
  money -= float(bankInput.value())
  bankInput.value("")
}

function withdraw() {
  if (/[^0-9]/.test(bankInput.value())) {
    return 0;
  }

  if (float(bankInput.value()) > bankMoney) {
    return 0;
  }

  bankMoney -= float(bankInput.value())
  money += float(bankInput.value())
  bankInput.value("")
}
