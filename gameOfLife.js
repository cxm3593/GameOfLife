var grid_size = 400;
var grid = makeGrid(grid_size);
var mirrorGrid = makeGrid(grid_size);
var canv = document.getElementById("gameCanvas");
console.log("grid_size: " + grid_size); // for debug
populateGrid(grid);
loop(grid,canv,mirrorGrid);


function makeGrid(size){ // creat a grid for the program
	var grid = Array(size);
	for (var i=0; i<size; i++){
		grid[i] = new Array(size);
	}
	return grid;
}

function populateGrid(grid){ // populate the grid randomly.
	var rate = 7
	for(var i=100; i<grid_size-100; i++){
		for(var j=100;j<grid_size-100;j++){
			var randNumber = Math.round(Math.random() * rate); // randomly get 0 or 1
			if(randNumber == rate){
				grid[i][j] = 1;
			}else{
				grid[i][j] = 0;
			}
			
		}
	}
}

function drawGrid() { // draw the grid on canvas on website
	var ctx = canv.getContext("2d");
	ctx.clearRect(0, 0, 400, 400);
	for(var i=0; i<grid_size;i++){
		for(var j=0;j<grid_size;j++){
			if(grid[i][j] == 1){
				ctx.fillStyle = "#000000";
				ctx.fillRect(i, j, 1, 1);
			}
		}
	}
}

function updateGrid(){
	for(i=1;i<grid_size-1;i++){
		for(j=1;j<grid_size-1;j++){
			var cell_count = 0;
			cell_count += grid[i-1][j-1];
			cell_count += grid[i-1][j];
			cell_count += grid[i-1][j+1];
			cell_count += grid[i][j-1];
			cell_count += grid[i][j+1];
			cell_count += grid[i+1][j-1];
			cell_count += grid[i+1][j];
			cell_count += grid[i+1][j+1];

			if(grid[i][j]==0){
				if(cell_count==3){
					mirrorGrid[i][j] = 1;
				}else{
					mirrorGrid[i][j] = 0;
				}
			}else if(grid[i][j]==1){
				if(cell_count==2 || cell_count==3){
					mirrorGrid[i][j]=1;
				}else{
					mirrorGrid[i][j]=0;
				}
			}
		}
	}

	var temp = grid;
	grid = mirrorGrid;
	mirrorGrid = temp;
}

function loop(){
	drawGrid();
	updateGrid();
	requestAnimationFrame(loop);
}


