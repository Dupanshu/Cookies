/*------------------------------------------------

  API and Cookies
  Dupanshu

-------------------------------------------------*/
"use strict";
console.log();

function onEvent(event, selector, callback) {
    return selector.addEventListener(event, callback);
  }
  function select (selector, parent = document) {
    return parent.querySelector(selector);
  }
  function selectAll (selector, parent = document) {
    return [...parent.querySelectorAll(selector)];
  }
  function print(arg) {
    console.log(arg);
  }
  function create(element, parent = document) {
    return parent.createElement(element);
  }
  
  function setCookie(name, value, options = {}) {
    options = {path: '/', SameSite: 'Lax', ...options};

    const keys = Object.keys(options);
    const values = Object.values(options);
    if (options.expires instanceof Date) {
      options.expires = options.expires.toUTCString();
    }
    let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);
    for (let i = 0; i < keys.length; i++) {
      updatedCookie += `; ${keys[i]}=${values[i]}`;
    }
    document.cookie = updatedCookie;
  }
  
  function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
      "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
  }
  
  function deleteCookie(name) {
    setCookie(name, '', {'max-age': -1});
  }
  
  const acceptBtn = select('.accept');
  const settingsBtn = select('.settings');
  const browser = select('.browser');
  const operatingSystem = select('.operating_system');
  const screenWidth = select('.screen_width');
  const screenHeight = select('.screen_height');
  const one = select('.one');
  const two = select('.two');
  const saveBtn = select('.save_preferences');
  
  window.onload = function () {
    if (!checkCookie()) {
      setTimeout(() => {
        one.showModal();
      }, 1000);
    } else {
      getCookies();
    }
  }
  onEvent('click', acceptBtn, () => {
    one.close();
    printCookie();
    console.log('Cookie saved successfully');
  })
  onEvent('click', settingsBtn, () => {
    one.close();
    two.showModal();
  })
  onEvent('click', saveBtn, () => {
    printCookie();
    two.close();
  })
  function getCookies() {
    console.log(`Browser: ${getCookie('Browser')}`);
    console.log(`System: ${getCookie('System')}`);
    console.log(`Screen-width (px): ${getCookie('Screen-width')}`);
    console.log(`Screen-height (px): ${getCookie('Screen-height')}`);
  }
  function printCookie() {
    if (browser.checked) {
      setCookie('Browser', `${browserDetect()}`, {'max-age': 15});
      console.log(`Browser: ${getCookie('Browser')}`);
    } else {
      setCookie('Browser', `Rejected`, {'max-age': 15});
    }
    if (operatingSystem.checked) {
      setCookie('System', `${systemDetect()}`, {'max-age': 15});
      console.log(`System: ${getCookie('System')}`);
    } else {
      setCookie('System', `Rejected`, {'max-age': 15});
    }
    if (screenWidth.checked) {
      setCookie('Screen-width', `${screen.width}`, {'max-age': 15});
      console.log(`Screen-width (px): ${getCookie('Screen-width')}`);
    } else {
      setCookie('Screen-width', `Rejected`, {'max-age': 15});
    }
    if (screenHeight.checked) {
      setCookie('Screen-height', `${screen.height}`, {'max-age': 15});
      console.log(`Screen-height (px): ${getCookie('Screen-height')}`);
    } else {
      setCookie('Screen-height', `Rejected`, {'max-age': 15});
    }
    if (!browser.checked && !operatingSystem.checked && !screenWidth.checked && !screenHeight.checked) {
      console.log('Cookies rejected by user');
    }
  }
  function checkCookie() {
    if (document.cookie.length > 0) {
      return true;
    } else {
      return false;
    }
  }
  function browserDetect(){    
    let userAgent = navigator.userAgent;
    let browserName = '';
    if (userAgent.match(/chrome|chromium|crios/i)){
        browserName = "chrome";
      } else if (userAgent.match(/firefox|fxios/i)){
        browserName = "firefox";
      } else if (userAgent.match(/safari/i)){
        browserName = "safari";
      } else if( userAgent.match(/opr\//i)){
        browserName = "opera";
      } else if( userAgent.match(/edg/i)){
        browserName = "edge";
      } else {
        browserName = "Other Browser";
      }
    return browserName;    
  }
  function systemDetect(){    
    let userAgent = navigator.userAgent;
    let systemName = '';
    if (userAgent.match(/Win/i)){
        systemName = "Windows";
      } else if (userAgent.match(/Mac/i)){
        systemName = "MacOS";
      } else if (userAgent.match(/Linux/i)){
        systemName = "Linux";
      } else {
        systemName = "Other operating system";
      }
    return systemName;    
  } 