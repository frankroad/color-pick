import React, {Component} from 'react';

export default class ToolIndex extends Component {

  constructor() {
    super();
  }

  componentWillMount() {
  }

  checkUrl(url) {
    return url.startsWith("http") && !url.startsWith("https://chrome.google.com")
  }

  handleCaptureClick(item) {
    let _this = this;
    if (item === "color_pick") {
      chrome.tabs.query({active: true}, function(tabs) {
        let tab = tabs[0];
        if (_this.checkUrl(tab.url)) {
          chrome.tabs.insertCSS(tab.id, {file: 'css/color_pick_content.css', runAt: 'document_start'})
          chrome.tabs.executeScript(tab.id, {file: 'js/init.js', runAt: 'document_start'});
          chrome.tabs.executeScript(tab.id, {file: 'js/color_pick_content.js', runAt: 'document_start'});
          window.close();
        }
      });
    }
  }

  handleTabClick(url) {
    chrome.tabs.create({url: url});
  }

  render() {
    if (this.props.visible) {
      return (
        <div className="tool">
          <div className="items" style={{height: "90px"}}>
            <div onClick={this.handleCaptureClick.bind(this, "color_pick")} className="item">
              <div className="info">
                <img src="./../../img/color_pick.svg" />
                <p>取色器</p>
              </div>
            </div>
            <div onClick={this.handleTabClick.bind(this, "https://pictureknow.com")} className="item">
              <div className="info">
                <img src="./../../img/pictureknow.png" />
                <p>插件官网</p>
              </div>
            </div>
            <div onClick={this.handleTabClick.bind(this, "https://pictureknow.com/#/extension")} className="item">
              <div className="info">
                <img src="./../../img/navigation.svg" />
                <p>推荐插件</p>
              </div>
            </div>
            <div onClick={this.handleTabClick.bind(this, "https://chrome.google.com/webstore/detail/" + chrome.i18n.getMessage("@@extension_id"))} className="item">
              <div className="info">
                <img src="./../../img/store.png" />
                <p>商店</p>
              </div>
            </div>
          </div>
        </div>
      )
    } else {
      return null;
    }
  }
}
