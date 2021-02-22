require('./../../../css/colorPick.less');
import React, {Component} from 'react';

export default class Index extends Component {

  constructor() {
    super();
    this.state = {
      top: 0,
      left: 0,
      selectWidth: 0,
      selectHeight: 0,
      scrollHeight: 0,
      status: true,
      matrix: [],
      activeHex: "",
      scroll: false,
      copy: false,
      content: null
    };
  }

  winScroll(event) {
    let scrollHeight = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
    this.setState({
      selectHeight: document.documentElement.scrollHeight,
      scrollHeight: scrollHeight,
      scroll: true
    });
  }

  componentWillMount() {
    this.capture();
    window.addEventListener('scroll', this.winScroll.bind(this));
    let scrollHeight = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
    let matrix = [];
    let pixel = {backgroundColor: "rgba(255, 255, 255, 1)"};
    for(let i = 0; i < 11; i++) {
      let items = [];
      for(let j = 0; j < 11; j++) {
        items.push(pixel);
      }
      matrix.push(items);
    }
    this.setState({
      selectWidth: document.documentElement.clientWidth,
      selectHeight: document.documentElement.scrollHeight,
      scrollHeight: scrollHeight,
      matrix: matrix
    });
  }

  capture() {
    let _this = this;
    chrome.runtime.sendMessage({type: "capture"}, function(dataURI) {
      let canvas = document.createElement('canvas');
      let content = canvas.getContext('2d');
      let img = new Image();
      img.src = dataURI;
      let width = window.innerWidth;
      let height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      img.onload = function() {
        content.drawImage(img, 0, 0, width, height);
        _this.setState({
          content: content
        });
      };
    });
  }

  chunks(data=[], size) {
    let result = [];
    for (let i = 0; i < data.length; i += size) {
      result.push(data.slice(i, i + size));
    }
    return result;
  }

  pixelToRgba(data = []) {
    let r = data[0]
    let g = data[1]
    let b = data[2]
    let rgba = `rgba(${r}, ${g}, ${b}, ${data[3] / 255})`
    return {
      rgba,
      r,
      g,
      b
    }
  }

  rgbToHex(r, g, b) {
    return ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)
  }

  handleMouse(item) {
    let _this = this;
    if (item.type === "mousemove" || item.type === "mousedown") {
      if (this.state.scroll) {
        this.capture();
        this.setState({
          scroll: false
        });
      }
      let clientX = item.clientX;
      let clientY = item.clientY;
      let originX = clientX - 5;
      let originY = clientY - 5;
      if (this.state.content) {
        let activeHex = this.state.activeHex;
        let matrix = [];
        let imgData = this.state.content.getImageData(originX, originY, 11, 11);
        let pixel = this.chunks(imgData.data, 4);
        let rgbarr = this.chunks(pixel.map(item => _this.pixelToRgba(item)), 11);
        matrix = rgbarr.map((arr, yIndex) => {
          return arr.map((rgba, xIndex) => {
            let x = originX + xIndex
            let y = originY + yIndex
            let isActive = clientX === x && clientY === y;
            if (isActive) {
              activeHex = _this.rgbToHex(rgba.r, rgba.g, rgba.b).toUpperCase()
            }
            return {
              isActive: isActive,
              backgroundColor: rgba.rgba
            }
          })
        });
        this.setState({
          activeHex: "#" + activeHex,
          matrix: matrix
        });
      }
      this.setState({
        top: originY,
        left: originX,
      });
    }
  }

  get_matrix(matrix) {
    let data = matrix.map(function(items) {
      let itemsData = items.map(function(item) {
        return (
          <div className={item.isActive ? "color-active" : "color"} style={{backgroundColor: item.backgroundColor, zIndex: item.isActive ? 1 : 0}}>
          </div>
        )
      });
      return (
        <div className="colors">
          {itemsData}
        </div>
      )
    });
    return data;
  }

  handleClick() {
    let input = document.getElementById("cat_pick_color_color_hex");
    input.focus();
    input.select();
    document.execCommand('copy');
    this.setState({
      copy: true
    });
    setTimeout(() => {
      this.setState({
        status: false
      });
    }, 400)
  }

  render() {
    if (this.state.status) {
      return (
        <div>
          <div className="color-pick"
            style={{width: this.state.selectWidth + "px", height: this.state.selectHeight + "px"}}
            onMouseDown={this.handleMouse.bind(this)}
            onMouseMove={this.handleMouse.bind(this)}
            onClick={this.handleClick.bind(this)}>
          </div>
          <div className="color-pick-selected"
            style={{top: this.state.top + this.state.scrollHeight + 10 + "px", left: this.state.left + 10 + "px", display: this.state.scroll ? "none": "block"}}
            onMouseMove={this.handleMouse.bind(this)}
            >
            <div className="color-pick-data">
              {this.get_matrix(this.state.matrix)}
            </div>
            {this.state.copy ?
              <div className="tips">颜色复制成功</div>
              :
              <input id="cat_pick_color_color_hex" className="color-hex" type="text" value={this.state.activeHex}/>
            }
          </div>
        </div>
      )
    } else {
      return null;
    }
  }
}
