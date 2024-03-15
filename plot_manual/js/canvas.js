var canvas = document.getElementById('canvas');
var cxt = canvas.getContext('2d');

// 保存图像
download_img = function(el) {
  var image = canvas.toDataURL("image/jpg");
    el.href = image;
};

var clearimg = document.getElementById('clearimg');
var Axis = document.getElementById('Axis');

// 工具标签
var Brush = document.getElementById('means_brush');
var Eraser = document.getElementById('means_eraser');
var Paint = document.getElementById('means_paint');
var text = document.getElementById('means_text');

// 形状标签
var line = document.getElementById('means_line');
var arc = document.getElementById('means_arc');
var rect = document.getElementById('means_rect');
var poly = document.getElementById('means_poly');
var arcfill = document.getElementById('means_arcfill');
var rectfill = document.getElementById('means_rectfill');
var actions = [Brush, Eraser, Paint, text, text, line, line, arc, rect, poly, arcfill, rectfill];

// 线宽
var line_1 = document.getElementById('width_1');
var line_3 = document.getElementById('width_3');
var line_5 = document.getElementById('width_5');
var line_7 = document.getElementById('width_7');
var widthLine = [line_1, line_3, line_5, line_7];

// 颜色
var color_1 = document.getElementById("myColor");

// 设置默认状态
var curTool = 0,
    curColor = color_1.value,
    flagaxis = false,
    curLineWidth = '1';  // 声明当前的工具，颜色和线宽

drawImg(curTool, curLineWidth, curColor);
var accord = []; // accord数组保存笔触到达的信息和使用的画笔信息

// 清空画板
clearimg.addEventListener('click', function () {
  cxt.clearRect(0, 0, 880, 800);
  accord = [];
  if(flagaxis) {
    drawGrid(cxt,"lightgray",10,10);
    drawAxes();			
  }}, false)

// 工具栏
for (var i = 0; i < actions.length; i++) {
  actions[i].index = i;
  actions[i].onclick = function (e) {
    for (var i = 0; i < actions.length; i++) {
      if (i === this.index) {
        actions[i].style.background = "white";
      } else {
        actions[i].style.background = "rgb(232, 242, 248)";
      }
    }
    curTool = this.index;
    drawImg(curTool, curLineWidth, curColor); //调用画图工具
  }
}

// 遍历线宽及虚线
for (var i = 0; i < widthLine.length; i++) {
  widthLine[i].index = i;
  widthLine[i].onclick = function () {
    for (var i = 0; i < widthLine.length; i++) {
      if (i == this.index) {
        widthLine[i].style.background = "white";
      } else {
        widthLine[i].style.background = "rgb(232, 242, 248)";
      }
    }
    if (this.index == widthLine.length-1){
      curLineWidth = 2;
    }
    else {
      curLineWidth = 2 * this.index + 1;
    }
    drawImg(curTool, curLineWidth, curColor); // 调用画图工具
	}
}

// 颜色盘
color_1.onchange = function(){
  curColor = this.value;
  drawImg(curTool, curLineWidth, curColor);
};

// 插入形状封装
var draw = {
	// 绘制线段
  'drawLine': function (startX, startY, moveX, moveY, lineWidths, col) {
    cxt.save();
    cxt.beginPath();
    cxt.moveTo(startX, startY);
    cxt.lineTo(moveX, moveY);
    cxt.closePath();
    cxt.lineWidth = lineWidths;
    if (cxt.lineWidth == 2) {
      cxt.setLineDash([10,20]);
    } else {
      cxt.setLineDash([]);
    }
    cxt.strokeStyle = col;
    cxt.stroke();
    cxt.restore();
  },

	// 绘制圆
  'drawCircle': function (startX, startY, moveX, moveY, lineWidths, col) {
    cxt.save();
    cxt.beginPath();
    var a = moveX - startX;
    var b = moveY - startY;
    var c = Math.sqrt(a * a + b * b);
    cxt.arc(startX, startY, c, 0, 2 * Math.PI, false);
    cxt.closePath();
    cxt.lineWidth = lineWidths;
    if (cxt.lineWidth == 2) {
      cxt.setLineDash([10,20]);
    } else {
      cxt.setLineDash([]);
    }
    cxt.strokeStyle = col;
    cxt.stroke();
    cxt.restore();
  },

  // 绘制实心圆
  'fillCircle': function (startX, startY, moveX, moveY, lineWidths, col) {
    cxt.save();
    cxt.beginPath();
    var a = moveX - startX;
    var b = moveY - startY;
    var c = Math.sqrt(a * a + b * b);
    cxt.arc(startX, startY, c, 0, 2 * Math.PI, false);
    cxt.closePath();
    cxt.lineWidth = lineWidths;
    cxt.fillStyle = col;
    cxt.fill();
    cxt.restore();
  },

  // 绘制长方形
  'drawRect': function (startX, startY, moveX, moveY, lineWidths, col) {
    cxt.save();
    cxt.lineWidth = lineWidths;
    if (cxt.lineWidth == 2){
      cxt.setLineDash([10,20]);
    } else {
      cxt.setLineDash([]);
    }
    cxt.strokeStyle = col;
    var a = Math.abs(moveX - startX);
    var b = Math.abs(moveY - startY);
    if (moveX > startX && moveY > startY) {
      cxt.strokeRect(startX, startY, a, b);
    } else if (moveX > startX && moveY < startY) {
      cxt.strokeRect(startX, startY - b, a, b);
    } else if (moveX < startX && moveY < startY) {
      cxt.strokeRect(moveX, moveY, a, b);
    } else {
      cxt.strokeRect(moveX, moveY - b, a, b);
    }
    cxt.restore();
  },

  // 绘制实心长方形
  'fillRect': function (startX, startY, moveX, moveY, lineWidths, col) {
    cxt.save();
    cxt.lineWidth = lineWidths;
    
    cxt.fillStyle = col;
    var a = Math.abs(moveX - startX);
    var b = Math.abs(moveY - startY);
    if (moveX > startX && moveY > startY) {
      cxt.fillRect(startX, startY, a, b);
    } else if (moveX > startX && moveY < startY) {
      cxt.fillRect(startX, startY - b, a, b);
    } else if (moveX < startX && moveY < startY) {
      cxt.fillRect(moveX, moveY, a, b);
    } else {
      cxt.fillRect(moveX, moveY - b, a, b);
    }
    cxt.restore();
  },

  // 绘制三角形
  'drawTriangle': function (startX, startY, moveX, moveY, lineWidths, col) {
    cxt.save();
    cxt.beginPath();
    if (moveX > startX && moveY > startY) {
      cxt.moveTo(startX, startY);
      cxt.lineTo(moveX, moveY);
      cxt.lineTo(2 * startX - moveX, moveY);
    } else if (moveX < startX && moveY > startY) {
      cxt.moveTo(startX, startY);
      cxt.lineTo(moveX, moveY);
      cxt.lineTo(2 * startX - moveX, moveY);
    } else if (moveX > startX && moveY < startY) {
      cxt.moveTo(startX, startY);
      cxt.lineTo(moveX, moveY);
      cxt.lineTo(2 * moveX - startX, startY);
    } else {
      cxt.moveTo(startX, startY);
      cxt.lineTo(moveX, moveY);
      cxt.lineTo(2 * moveX - startX, startY);
    }
    cxt.closePath();
    cxt.lineWidth = lineWidths;
    if(cxt.lineWidth == 2){
      cxt.setLineDash([10,20]);
    }else{
      cxt.setLineDash([]);
    }
    cxt.strokeStyle = col;
    cxt.stroke();
    cxt.restore();
  },

  // 插入文本
  'drawText': function (startX, startY, col, text) {
    cxt.save();
    cxt.font = "bold 20px Arial";
    cxt.textAlign = 'center';
    cxt.textBaseline = 'middle';
    cxt.fillStyle = col;
    cxt.fillText(text, startX, startY);
    cxt.restore();
  }
}

var accord = []; // 存储全局的图像

// 根据存储的点重新画线
function againDraw(storData) {
  for (var i = 0; i < storData.length; i++) {
    switch (storData[i].type) {
    case 0:
      cxt.beginPath();
      cxt.moveTo(storData[i].down[0], storData[i].down[1]);
      for (var j = 0; j < storData[i].move.length; j++) {
        cxt.lineTo(storData[i].move[j][0], storData[i].move[j][1]);
      }
      cxt.lineWidth = storData[i].line;
      if (cxt.lineWidth == 2) {
        cxt.setLineDash([10,20]);
      } else {
        cxt.setLineDash([]);
      }
      cxt.strokeStyle = storData[i].colors;
      cxt.stroke();
      cxt.restore();
      break;
    case 1:
      cxt.save();
      cxt.beginPath();
      cxt.moveTo(storData[i].down[0], storData[i].down[1]);
      for (var j = 0; j < storData[i].move.length; j++) {
        cxt.lineTo(storData[i].move[j][0], storData[i].move[j][1]);
      }
      cxt.lineWidth = storData[i].line;
      if (cxt.lineWidth == 2) {
        cxt.setLineDash([10,20]);
      } else {
        cxt.setLineDash([]);
      }
      cxt.strokeStyle = '#fff';
      cxt.stroke();
      cxt.restore();
      break;
    case 2:
      cxt.fillStyle = storData[i].colors;
      cxt.fillRect(0, 0, 880, 800);
    case 4:
      draw.drawText(storData[i].down[0], storData[i].down[1], storData[i].colors, storData[i].text[0]);
      break;
    case 6:
      draw.drawLine(storData[i].down[0], storData[i].down[1], storData[i].up[0], storData[i].up[1], storData[i].line, storData[i].colors);
      break;
    case 7:
      draw.drawCircle(storData[i].down[0], storData[i].down[1], storData[i].up[0], storData[i].up[1], storData[i].line, storData[i].colors);
      break;
    case 8:
      draw.drawRect(storData[i].down[0], storData[i].down[1], storData[i].up[0], storData[i].up[1], storData[i].line, storData[i].colors);
      break;
    case 9:
      draw.drawTriangle(storData[i].down[0], storData[i].down[1], storData[i].up[0], storData[i].up[1], storData[i].line, storData[i].colors);
      break;
    case 10:
      draw.fillCircle(storData[i].down[0], storData[i].down[1], storData[i].up[0], storData[i].up[1], storData[i].line, storData[i].colors);
      break;
    case 11:
      draw.fillRect(storData[i].down[0], storData[i].down[1], storData[i].up[0], storData[i].up[1], storData[i].line, storData[i].colors);
      break;
    }
  }
}


// Axis 坐标轴与栅格
AXIS_MARGIN = 40,  //一个常量
AXIS_ORIGIN_1 = {x: AXIS_MARGIN, y: canvas.height / 2},  //原点坐标
AXIS_ORIGIN_2 = {x: canvas.width / 2, y: canvas.height - AXIS_MARGIN},  //原点坐标


AXIS_TOP = AXIS_MARGIN,  //纵轴端点
AXIS_RIGHT = canvas.width - AXIS_MARGIN,  //横轴端点

HORIZONTAL_TICK_SPACING = 10,  //横轴间距
VERTICAL_TICK_SPACING = 10,  //纵轴间距

AXIS_WIDTH = canvas.width - 2 * AXIS_MARGIN,  //横轴长度
AXIS_HEIGHT= canvas.height - 2 * AXIS_MARGIN,  //纵轴长度

NUM_VERTICAL_TICKS = AXIS_HEIGHT / VERTICAL_TICK_SPACING,  //纵轴标尺的数量
NUM_HORIZONTAL_TICKS = AXIS_WIDTH / HORIZONTAL_TICK_SPACING,  //横轴标尺的数量

TICK_WIDTH = 10,
TICKS_LINEWIDTH = 0.5,
TICKS_COLOR = "navy",

AXIS_LINEWIDTH = 1.0,
AXIS_COLOR = "black";

// 绘制网格
function drawGrid(cxt,color,stepx,stepy) {
  cxt.strokeStyle = color;
  cxt.lineWidth = 0.5;

  for (var i = stepx + 0.5; i < cxt.canvas.width;i += stepx) {
    cxt.beginPath();
    cxt.setLineDash([]);
    cxt.moveTo(i,0);
    cxt.lineTo(i,cxt.canvas.height);
    cxt.setLineDash([]);
    cxt.stroke();
  }

  for (var i = stepy + 0.5; i < cxt.canvas.height; i += stepy) {
    cxt.beginPath();
    cxt.setLineDash([]);
    cxt.moveTo(0,i);
    cxt.lineTo(cxt.canvas.width,i);
    cxt.setLineDash([]);
    cxt.stroke();
  }
}

function drawAxes() {
  cxt.save();
  cxt.strokeStyle = AXIS_COLOR;
  cxt.lineWidth = AXIS_LINEWIDTH;
  cxt.setLineDash([]);

  drawHorizontalAxis();
  drawVerticalAxis();

  cxt.lineWidth = 0.5;
  cxt.lineWidth = TICKS_LINEWIDTH;
  cxt.strokeStyle = TICKS_COLOR;
  cxt.setLineDash([]);

  drawHorizontalAxisTicks();
  drawVertialAxisTicks();
  drawNumberals();
}

// 横坐标
function drawHorizontalAxis() {
  cxt.beginPath();
  cxt.setLineDash([]);
  cxt.moveTo(AXIS_ORIGIN_1.x, AXIS_ORIGIN_1.y);
  cxt.lineTo(AXIS_ORIGIN_1.x + AXIS_WIDTH, AXIS_ORIGIN_1.y);
  cxt.lineTo(AXIS_ORIGIN_1.x + AXIS_WIDTH - 10, AXIS_ORIGIN_1.y - 5);
  cxt.lineTo(AXIS_ORIGIN_1.x + AXIS_WIDTH, AXIS_ORIGIN_1.y);
  cxt.lineTo(AXIS_ORIGIN_1.x + AXIS_WIDTH - 10,AXIS_ORIGIN_1.y + 5);
  cxt.setLineDash([]);
  cxt.stroke();
}

// 纵坐标
function drawVerticalAxis() {
  cxt.beginPath();
  cxt.setLineDash([]);
  cxt.moveTo(AXIS_ORIGIN_2.x, AXIS_ORIGIN_2.y);
  cxt.lineTo(AXIS_ORIGIN_2.x, AXIS_ORIGIN_2.y - AXIS_HEIGHT);
  cxt.lineTo(AXIS_ORIGIN_2.x - 5, AXIS_ORIGIN_2.y-AXIS_HEIGHT + 10);
  cxt.lineTo(AXIS_ORIGIN_2.x, AXIS_ORIGIN_2.y - AXIS_HEIGHT);
  cxt.lineTo(AXIS_ORIGIN_2.x + 5, AXIS_ORIGIN_2.y - AXIS_HEIGHT + 10);
  cxt.setLineDash([]);
  cxt.stroke();
}

// 绘制纵坐标标尺及刻度数
function drawHorizontalAxisTicks() {
  var deltaY,num=0;

  for (var i = 1; i < NUM_HORIZONTAL_TICKS; ++i){
    cxt.beginPath();
    cxt.setLineDash([]);
    if(i%5 === 0) {
      deltaY = TICK_WIDTH;
      text();
      num++;
    } else {
        deltaY = TICK_WIDTH/2;
    }
    cxt.moveTo(AXIS_MARGIN + i * HORIZONTAL_TICK_SPACING, AXIS_ORIGIN_1.y - deltaY);
    cxt.lineTo(AXIS_MARGIN + i * HORIZONTAL_TICK_SPACING, AXIS_ORIGIN_1.y + deltaY);
    cxt.stroke();

    function text() {
      cxt.font = "10pt Helvetica";
      cxt.fillText(num - 8, AXIS_ORIGIN_1.x + (i - 6) * HORIZONTAL_TICK_SPACING, AXIS_ORIGIN_1.y + 3 * deltaY);
    }
  }
}

// 横坐标标尺及刻度
function drawVertialAxisTicks() {
  var deltaX, num=1;

  for (var i = 1; i < NUM_VERTICAL_TICKS; ++i) {
    cxt.beginPath();
    cxt.setLineDash([]);
    if(i % 5 === 0) {
        deltaX = TICK_WIDTH;
        text();
        num++;
    } else {
        deltaX = TICK_WIDTH/2;
    }
    cxt.moveTo(AXIS_ORIGIN_2.x - deltaX, AXIS_MARGIN+ (i + 1) * VERTICAL_TICK_SPACING);
    cxt.lineTo(AXIS_ORIGIN_2.x + deltaX, AXIS_MARGIN+ (i + 1) * VERTICAL_TICK_SPACING);
    cxt.stroke();

    function text(){
      cxt.font = "10pt Helvetica";
      cxt.fillText(num - 7, AXIS_ORIGIN_2.x - 3 * deltaX, AXIS_ORIGIN_2.y - i * VERTICAL_TICK_SPACING);
    }
  }
}

Axis.addEventListener("click", function() {
  flagaxis = !flagaxis;
  if (flagaxis) {
    cxt.setLineDash([]);
    drawGrid(cxt,"lightgray", 10, 10);
    drawAxes();		
  } else {
    cxt.clearRect(0, 0, 880, 800);
    againDraw(accord);
  }
});

// 确定画图的工具线宽和颜色
function drawImg(tools, lineWidths, col) {
  var startX, startY, 
      moveX, moveY, 
      upX, upY; 
  var temp = { 
    'type': tools,
    'line': lineWidths,
    'colors': col,
    'down': [],
    'move': [],
    'up': [],
    'text': []
  };

  flag = 0; 
  canvas.onmousedown = function (e) {
    e = window.event || e;
    flag = 1;

    startX = e.pageX - this.offsetLeft;
    startY = e.pageY - this.offsetTop;
    temp.down.push(startX, startY);
    switch (tools) {
    case 0:
      cxt.save();
      cxt.beginPath();
      cxt.moveTo(startX, startY);
      break;
    case 1:
      cxt.save();
      cxt.beginPath();
      cxt.moveTo(startX, startY);	
      break;
    case 2: 
      cxt.fillStyle = col;
      cxt.fillRect(0, 0, 880, 800);
      if(flagaxis){
        drawAxes();	
      }	
      break;
    case 3:
      break;
    }
  }
  
  canvas.onmousemove = function (e) {
    e = window.event || e;
    moveX = e.pageX - this.offsetLeft;
    moveY = e.pageY - this.offsetTop;
    if (flag) {
      temp.move.push([moveX, moveY]);
      switch (tools) {
      case 0: //画笔
        cxt.lineTo(moveX, moveY);
        cxt.lineWidth = lineWidths;
        if(cxt.lineWidth == 2) {
          cxt.setLineDash([10,20]);
        } else {
          cxt.setLineDash([]);
        }
        cxt.strokeStyle = col;
        cxt.stroke();
        cxt.restore();

        break;
      case 1: //橡皮
        cxt.lineTo(moveX, moveY);
        cxt.lineWidth = lineWidths;
        if(cxt.lineWidth == 2) {
          cxt.setLineDash([10,20]);
        } else {
          cxt.setLineDash([]);
        }
        cxt.strokeStyle = "#fff";
        cxt.stroke();
        cxt.restore();
        break;
      case 3:
        break;
      case 6: //直线
        if (flagaxis) {
          cxt.clearRect(0, 0, 880, 800);
          againDraw(accord);
          draw.drawLine(startX, startY, moveX, moveY, lineWidths, col);
          cxt.setLineDash([]);
          drawGrid(cxt,"lightgray",10,10);
          drawAxes();		
        } else {
          cxt.clearRect(0, 0, 880, 800);
          againDraw(accord);
          cxt.clearRect(0, 0, 880, 800);
          againDraw(accord);
          draw.drawLine(startX, startY, moveX, moveY, lineWidths, col);
        }
        break;
      case 7: //圆
        if (flagaxis) {
          cxt.clearRect(0, 0, 880, 800);
          againDraw(accord);
          draw.drawCircle(startX, startY, moveX, moveY, lineWidths, col);
          cxt.setLineDash([]);
          drawGrid(cxt,"lightgray",10,10);
          drawAxes();
        } else {
          cxt.clearRect(0, 0, 880, 800);
          againDraw(accord);
          draw.drawCircle(startX, startY, moveX, moveY, lineWidths, col);
        }
        break;
      case 8: //长方形
        if(flagaxis){
          cxt.clearRect(0, 0, 880, 800);
          againDraw(accord);
          draw.drawRect(startX, startY, moveX, moveY, lineWidths, col);
          cxt.setLineDash([]);
          drawGrid(cxt,"lightgray",10,10);
          drawAxes();
        } else {
          cxt.clearRect(0, 0, 880, 800);
          againDraw(accord);
          draw.drawRect(startX, startY, moveX, moveY, lineWidths, col);
        }
        break;
      case 9: //三角形
        if(flagaxis) {
          cxt.clearRect(0, 0, 880, 800);
          againDraw(accord);
          draw.drawTriangle(startX, startY, moveX, moveY, lineWidths, col);
          cxt.setLineDash([]);
          drawGrid(cxt,"lightgray",10,10);
          drawAxes();
        } else {
          cxt.clearRect(0, 0, 880, 800);
          againDraw(accord);
          draw.drawTriangle(startX, startY, moveX, moveY, lineWidths, col);
        }
        break;
      case 10: //实心圆
        if(flagaxis) {
          cxt.clearRect(0, 0, 880, 800);
          againDraw(accord);
          draw.fillCircle(startX, startY, moveX, moveY, lineWidths, col);
          cxt.setLineDash([]);
          drawGrid(cxt,"lightgray",10,10);
          drawAxes();
        } else {
          cxt.clearRect(0, 0, 880, 800);
          againDraw(accord);
          draw.fillCircle(startX, startY, moveX, moveY, lineWidths, col);
        }
        break;
      case 11: //实心长方形
        if(flagaxis){
          cxt.clearRect(0, 0, 880, 800);
          againDraw(accord);
          draw.fillRect(startX, startY, moveX, moveY, lineWidths, col);
          cxt.setLineDash([]);
          drawGrid(cxt,"lightgray",10,10);
          drawAxes();
        } else {
          cxt.clearRect(0, 0, 880, 800);
          againDraw(accord);
          draw.fillRect(startX, startY, moveX, moveY, lineWidths, col);
        }
        break;
      }
    }
  }

  canvas.onmouseup = function () {
    e = window.event || e;
    flag = 0;
    upX = e.pageX - this.offsetLeft;
    upY = e.pageY - this.offsetTop;
    temp.up.push(upX, upY);
    if (tools === 4) {
      var textValue = window.prompt('请在这里输入文字');
      textValue = textValue === null ? '' : textValue;
      temp.text.push(textValue);
      draw.drawText(startX, startY, col, textValue);
    }
    accord.push(temp);
    temp = { //存存储某一次鼠标点击到释放的坐标
      'type': tools,
      'line': lineWidths,
      'colors': col,
      'down': [],
      'move': [],
      'up': [],
      'text': []
    };
  }
    
  canvas.onmouseout = function (e) {
    flag = 0;
  }
}