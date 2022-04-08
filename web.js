const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json());

app.get("/", function (req, res) {
  res.send("Let the battle begin!");
  res.sendStatus(200);
});

app.post("/", function (req, res) {
  currentPlayers = req.body.arena;
  currentX =
    req.body.arena.state["https://test-2kxpytz2oa-uc.a.run.app"].x;
  currentY =
    req.body.arena.state["https://test-2kxpytz2oa-uc.a.run.app"].y;
  currentDirection =
    req.body.arena.state["https://test-2kxpytz2oa-uc.a.run.app"].direction;
  
  move = "no moves loaded"

  enemyX = findNTLocation(currentPlayers, currentX, currentY)[0]
  enemyY = findNTLocation(currentPlayers, currentX, currentY)[1]

  console.log(enemyX)
  console.log(enemyY)

  if (((currentX - enemyX) >= -3) && ((currentX - enemyX) <= -1) && currentDirection == "E") {
    console.log("1")
    move = "T";
  } 
  else if (((enemyX - currentX) >= -3) && ((enemyX - currentX) <= -1) && currentDirection == "W") {
    console.log("2")
    move = "T";
  }
  else if (((currentY - enemyY) >= -3) && ((currentY - enemyY) <= -1) && currentDirection == "S") {
    console.log("3")
    move = "T";
  }
  else if (((enemyX - currentX) >= -3) && ((enemyX - currentX) <= -1) && currentDirection == "N") {
    console.log("4")
    move = "T";
  }
  else {
    console.log("5")
    const moves = ['F', 'L', 'R'];
    move = moves[Math.floor(Math.random() * moves.length)]
  }

  res.send(move);
});
app.listen(process.env.PORT || 8080);

function faceEast(currentDirection) {
  switch (currentDirection) {
    case "N":
      return "R";
    case "W":
      return "R";
    case "S":
      return "L";
  }
}

function faceWest(currentDirection) {
  switch (currentDirection) {
    case "N":
      return "L";
    case "E":
      return "L";
    case "S":
      return "R";
  }
}

function faceNorth(currentDirection) {
  switch (currentDirection) {
    case "E":
      return "L";
    case "W":
      return "R";
    case "S":
      return "R";
  }
}

function faceSouth(currentDirection) {
  switch (currentDirection) {
    case "E":
      return "R";
    case "W":
      return "L";
    case "N":
      return "R";
  }
}


function findNTLocation(currentPlayers, currentX, currentY) {
  for (const [key, value] of Object.entries(currentPlayers.state)) {
    if (((currentX - value.x) < 3) && ((currentX - value.x) > -3) && key != "https://test-2kxpytz2oa-uc.a.run.app") {
      x = value.x;
      y = value.y;
      return [x, y]
    }
    else if (((currentY - value.y) < 3) && ((currentY - value.y) > -3) && key != "https://test-2kxpytz2oa-uc.a.run.app") {
      x = value.x;
      y = value.y;
      return [x, y]
    }
  }
}

