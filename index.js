// Added pause, resume and restart functions based on player input; also added the ability to change color while game is running with key input. Tried with larger grid and everything seems to be running as expected. Let me know if anything is broken.
var grid;
var numberOfColumns;
var numberOfRows;
var cells;

function setup () {
  createCanvas(400, 400);
  grid = new Grid(10);

  grid.randomize();
  keyPressed();
}

function draw () {
  background(250);

  grid.updateNeighborCounts();
  grid.draw(20);
  grid.updatePopulation();
}

function keyPressed () {
  if (keyCode === 80){
    noLoop();
  } else if (keyCode === 82){
    loop();
  } else if (keyCode === ENTER){
    grid.randomize();
  }
}

class Cell {
  constructor (column, row, cellSize) {
    this.column = column;
    this.row = row;
    this.cellSize = cellSize;
    this.isAlive = false;

    this.liveNeighborCount = 0;
  }
// Make each cell responsible for its own appearance
  draw () {
      if (this.isAlive == false) {
        fill(0);
      } else if (this.isAlive == true && keyCode == 66){
        fill(102, 102, 255);
      } else if (this.isAlive == true && keyCode == 76){
        fill(200, 162, 200);
      } else if (this.isAlive == true && keyCode == 71){
        fill(102, 255, 153);
      } else if (this.isAlive == true && keyCode == 79){
        fill(255, 153, 51);
      } else if (this.isAlive == true && keyCode == 89) {
        fill (255, 255, 0);
      } else if (this.isAlive == true && keyIsPressed == false){
        fill (255);
      }
      noStroke();
      rect(this.column * this.cellSize + 1, this.row * this.cellSize + 1, this.cellSize - 1, this.cellSize - 1);
  }
// Make each cell determine if it is dead or alive
  setIsAlive (value) {
    if (value == 1) {
      this.isAlive = true;
    } else if (value == 0) {
      this.isAlive = false;
    }
  }
  liveOrDie(){
    if (this.isAlive == true && this.liveNeighborCount < 2) {
    this.isAlive = false;
    } else if (this.isAlive == true && this.liveNeighborCount == 2) {
    this.isAlive = true;
    } else if (this.isAlive == true && this.liveNeighborCount == 3) {
    this.isAlive = true;
    } else if (this.isAlive == true && this.liveNeighborCount > 3) {
    this.isAlive = false;
    } else if (this.isAlive == false && this.liveNeighborCount == 3) {
    this.isAlive = true;
    }
  }
}

class Grid {
  constructor (cellSize) {
  // Calculate number of columns and rows in grid
    // print(cellSize);
    this.cellSize = cellSize;
    this.numberOfColumns = height/this.cellSize;
    this.numberOfRows = width/this.cellSize;

    this.liveNeighborCount = 0;

// Create a 2D array
    // this.x = 20;
    // this.y = 20;
    this.cells = new Array(this.numberOfRows);
    for (var i = 0; i < this.cells.length; i ++){
      this.cells[i] = new Array(this.y);
      }
    for (var column = 0; column < this.numberOfColumns; column ++) {
      for (var row = 0; row < this.numberOfRows; row++) {
        this.cells[column][row] = new Cell(column, row, cellSize);
      }
    }
    // print(this.cells);
  }

  updateNeighborCounts() {
  // Loop over each cell in grid
    for (var column = 0; column < this.numberOfColumns; column ++) {
      for (var row = 0; row < this.numberOfRows; row ++) {
        var currentCell = this.cells[column][row];
       // Loop over neighbors excluding itself and avoid invalid grid locations
       // Reset neighbor count to 0
        currentCell.liveNeighborCount = 0;
       for (var xOffset = -1; xOffset <= 1; xOffset ++) {
        for (var yOffset = -1; yOffset <= 1; yOffset ++) {
          var neighborColumn = currentCell.column + xOffset
          var neighborRow = currentCell.row + yOffset

          var validColumn = neighborColumn >= 0 && neighborColumn < this.numberOfColumns;
          var validRow = neighborRow >= 0 && neighborRow < this.numberOfRows;

          var sameColumn = currentCell.column == neighborColumn;
          var sameRow = currentCell.row == neighborRow;
          var sameCell = sameColumn && sameRow;
          // do something with neighborX and neighborY

          if (validColumn && validRow && !sameCell){
            var neighborCell = this.cells[neighborColumn][neighborRow];
            if (neighborCell.isAlive) {
            currentCell.liveNeighborCount = currentCell.liveNeighborCount + 1;
            }
          }
          // If neighbor is alive add 1 to neighbor count

          }
        }
      print(currentCell.liveNeighborCount);
      }
    }
  }

  updatePopulation () {
    for (var column = 0; column < this.numberOfColumns; column ++) {
      for (var row = 0; row < this.numberOfRows; row ++) {
        var currentCell = this.cells[column][row];
        currentCell.liveOrDie();
      }
    }
  }
// Draw grid
  draw () {
    for (var column = 0; column < this.numberOfColumns; column ++) {
      for (var row = 0; row < this.numberOfRows; row++) {
        var currentCell = this.cells[column][row];
        currentCell.draw();
      }
    }
  }
// Create random starting values for each cell
  randomize () {
    for (var column = 0; column < this.numberOfColumns; column ++) {
      for (var row = 0; row < this.numberOfRows; row++) {
        var randomizeCell = this.cells[column][row];
        randomizeCell.setIsAlive(floor(random(2)));

      // print(random(2)); preview results in the console
      // print(floor(random(2))); preview results in the console
      }
    }
  }
}
