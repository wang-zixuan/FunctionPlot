// const saveAs = require("./FileSaver");

// 默认配置，线性刻度
var parameters = {
  target: '#myFunction',
  data: [
  ],

  grid: true,
  xAxis: {
    type: 'linear',
    label: 'x-axis',
    domain: [-5, 5]
  },

  yAxis: {
    label: 'y-axis',
    domain: [-5, 5]
  }
};

// 配置，对数刻度
var parameters1 = {
  target: '#myFunction',
  data: [
      
  ],

  grid: true,
  xAxis: {
    type: 'log',
    label: 'x-axis',
    // 对数刻度 x > 0
    domain: [0.01, 1000] 
  },

  yAxis: {
    label: 'y-axis',
    domain: [-5, 5]
  }
};

// 每个函数的标记
var indexes = [0];

function Add_Normal() {
  // 复制隐藏的模块
  let newInput = document.getElementById("config_block_0").cloneNode(true);
  newInput.style.display = "block";
  // 给当前模块打标记
  var idx = indexes[indexes.length - 1] + 1;

  newInput.setAttribute("id", "config_block_" + idx);
  document.getElementById("config").appendChild(newInput);

  // 每个属性的标记
  newInput.getElementsByTagName('input')[0].id = "color" + idx;
  newInput.getElementsByTagName('input')[1].id = "function" + idx;
  newInput.getElementsByTagName('select')[0].id = "line_type" + idx;
    
    // 分别 push 到线性和对数刻度中
  parameters.data.push({
    fn: document.getElementById("function" + idx).value,
    color: document.getElementById("color" + idx).value,
    graphType: document.getElementById("line_type" + idx).value,
    nSamples: 100
  });

  parameters1.data.push({
    fn: document.getElementById("function" + idx).value,
    color: document.getElementById("color" + idx).value,
    graphType: document.getElementById("line_type" + idx).value,
    nSamples: 100
  });

  indexes.push(idx);
}

function Add_Param() {
  let newInput = document.getElementById("param_config_block_0").cloneNode(true);
  newInput.style.display = "block";
  var idx = indexes[indexes.length - 1] + 1;

  newInput.setAttribute("id", "param_config_block_" + idx);
  document.getElementById("config").appendChild(newInput);

  newInput.getElementsByTagName('input')[0].id = "param_color" + idx;
  newInput.getElementsByTagName('input')[1].id = "param_x" + idx;
  newInput.getElementsByTagName('input')[2].id = "param_y" + idx;
  newInput.getElementsByTagName('select')[0].id = "param_line_type" + idx;
    
  // 分别 push 到线性和对数刻度中
  parameters.data.push({
    x: document.getElementById("param_x" + idx).value,
    y: document.getElementById("param_y" + idx).value,
    fnType: 'parametric',
    color: document.getElementById("param_color" + idx).value,
    graphType: document.getElementById("param_line_type" + idx).value,
    nSamples: 100
  });

  parameters1.data.push({
    x: document.getElementById("param_x" + idx).value,
    y: document.getElementById("param_y" + idx).value,
    fnType: 'parametric',
    color: document.getElementById("param_color" + idx).value,
    graphType: document.getElementById("param_line_type" + idx).value,
    nSamples: 100
  });

  indexes.push(idx);
}

function Delete(node) {
  // 删除对应标记的图像
  var f = node.getElementsByTagName('input')[1].id;
  var id_index = f[f.length - 1];
  var idx;
    
  // 找到要删除的标记，并从 indexes 里删除
  for (idx = 0; idx < indexes.length; idx++) {
    if (indexes[idx] == id_index) {
      indexes.splice(idx, 1);
      break;
    }
  }

  // 从 parameters 里删除
  parameters.data.splice(idx - 1, 1);
  node.parentNode.removeChild(node);

  parameters1.data.splice(idx - 1, 1);
  
  // 图像全部清除后再重新 plot
  d3.select("#myFunction").selectAll("*").remove();
  plot();
}

// 保存为图片
function Save(graph_id) {
  // 使用 html2canvas.min.js
  html2canvas(document.getElementById(graph_id)).then(canvas => {
    canvas.toBlob(function(blob) {
        saveAs(blob, graph_id + ".png");
      });
    }
  );
}

function plot() {
  var x_axis_type = document.querySelector("#x_axis_type").value;
  var xMin = document.querySelector("#xMin").value;
  var xMax = document.querySelector("#xMax").value;
  var yMin = document.querySelector("#yMin").value;
  var yMax = document.querySelector("#yMax").value;
  var show_grid = document.querySelector("#show_grid").value;
  var xLabel = document.querySelector("#xLabel").value;
  var yLabel = document.querySelector("#yLabel").value;

  // 线性刻度
  if (x_axis_type == "linear") {
    if (show_grid == "true") {
      parameters.grid = true;
    }
    else {
      parameters.grid = false;
    }

    parameters.xAxis.domain = [xMin, xMax];
    parameters.yAxis.domain = [yMin, yMax];

    parameters.xAxis.label = xLabel;
    parameters.yAxis.label = yLabel;

    for (var i = 1; i < indexes.length; i++) {
      // 每个函数的属性，普通方程
      if (document.querySelector("#function" + indexes[i])) {
        var f = document.querySelector("#function" + indexes[i]).value;
        var color = document.querySelector("#color" + indexes[i]).value;
        var line_type = document.querySelector("#line_type" + indexes[i]).value;

        parameters.data[i - 1].fn = f;
        parameters.data[i - 1].color = color;
        parameters.data[i - 1].graphType = line_type;
      }

      // 参数方程
      else {
        var param_x = document.querySelector("#param_x" + indexes[i]).value;
        var param_y = document.querySelector("#param_y" + indexes[i]).value;
        var param_fnType = 'parametric';
        var param_color = document.querySelector("#param_color" + indexes[i]).value;
        var param_line_type = document.querySelector("#param_line_type" + indexes[i]).value;

        parameters.data[i - 1].x = param_x;
        parameters.data[i - 1].y = param_y;
        parameters.data[i - 1].fnType = param_fnType;
        parameters.data[i - 1].color = param_color;
        parameters.data[i - 1].graphType = param_line_type;
      }
    }

    d3.select("#myFunction").selectAll("*").remove();
    functionPlot(parameters);
  }

  // 对数刻度
  else {
    if (show_grid == "true") {
      parameters1.grid = true;
    }
    else {
      parameters1.grid = false;
    }

    // 设置坐标轴范围
    parameters1.xAxis.domain = [0.01, 100];
    parameters1.yAxis.domain = [yMin, yMax];

    parameters1.xAxis.label = xLabel;
    parameters1.yAxis.label = yLabel;

    for (var i = 1; i < indexes.length; i++) {
      if (document.querySelector("#function" + indexes[i])) {
        var f = document.querySelector("#function" + indexes[i]).value;
        var color = document.querySelector("#color" + indexes[i]).value;
        var line_type = document.querySelector("#line_type" + indexes[i]).value;

        parameters1.data[i - 1].fn = f;
        parameters1.data[i - 1].color = color;
        parameters1.data[i - 1].graphType = line_type;
      }

      else {
        var param_x = document.querySelector("#param_x" + indexes[i]).value;
        var param_y = document.querySelector("#param_y" + indexes[i]).value;
        var param_fnType = 'parametric';
        var param_color = document.querySelector("#param_color" + indexes[i]).value;
        var param_line_type = document.querySelector("#param_line_type" + indexes[i]).value;

        parameters.data[i - 1].x = param_x;
        parameters.data[i - 1].y = param_y;
        parameters.data[i - 1].fnType = param_fnType;
        parameters.data[i - 1].color = param_color;
        parameters.data[i - 1].graphType = param_line_type;
      }
    }

    d3.select("#myFunction").selectAll("*").remove();
    functionPlot(parameters1);
  }
}
