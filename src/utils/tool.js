/**
 * 常用工具
 * huqinggang
 */
let Tool = {};
// 页面刷新或关闭时执行的方法
Tool.exitConfirm = function(e) {
  let message = '您有等待下载的文件，刷新或关闭浏览器将导致下载失效！';
  e = e || window.event;
  if (e) {
    e.returnValue = message;
  }
  return message;
};
// 拼接两个数组
Tool.concatArray = function(arr1, arr2) {
  arr1.concat(arr2);
  return arr1.concat(arr2);
};
Tool.isArray = function(obj) {
  return Object.prototype.toString.call(obj) === '[object Array]';
};
// 字符串转json对象
Tool.strToJSON = function(data) {
  if (Tool.isNullOrUndefOrSpace(data)) {
    return {};
  } else {
    // eslint-disable-next-line no-eval
    return eval('(' + data + ')');
  }
};
// 判断对象是否为空，包括：空对象，未定义，字符串类型的话判断是否为空字符串,obj:值， isContinuous：是否处连续为空的情况，
// 返回：true：是， false：否
Tool.isNullOrUndefOrSpace = function(obj, isContinuous) {
  // 未定义设置默认值
  if (isContinuous === undefined) {
    isContinuous = true;
  }

  if (obj === undefined || obj === null) {
    return true;
  } else if (Tool.isArray(obj) && obj.length === 0) {
    return true;
  } else {
    return isContinuous ? obj.toString().trim() === '' : obj.toString() === '';
  }
};
// 判断两数组是否相等
Tool.isSameArray = function(arr1, arr2) {
  let minLen = arr1.length > arr2.length ? arr2.length : arr1.length;
  for (let i = 0; i < minLen; i++) {
    if (arr1[i] !== arr2[i]) {
      return false;
    }
  }
  return true;
};
/** *
 * 判断对象是否在数组
 * @param a 对象数组
 * @param o 如果id为空，则o就是需要查找的对，否则o就是需要查找的属性
 * @param id 需要查找的数学值
 * @returns {number}
 */
Tool.indexOfArray = function(a, o, id) {
  if (!Tool.isArray(a)) {
    return -1; // 参数异常处理
  }
  for (let i = 0, len = a.length; i < len; i++) {
    if (id === undefined) {
      if (a[i] === o) {
        return i;
      }
    } else if (a[i][o] === id) {
      return i;
    }
  }
  return -1;
};
// 判断arr1是否包含数组2，key为对象主键字段
Tool.isContantArray = function(arr1, arr2, key) {
  if (Tool.isNullOrUndefOrSpace(arr2) || Tool.isNullOrUndefOrSpace(arr1)) {
    return false;
  } else if (Tool.isArray(arr2)) {
    if (arr1.length < arr2.length) {
      return false;
    } else {
      for (let i = 0; i < arr2.length; i++) {
        if (Tool.indexOfArray(arr1, arr2[i], key) < 0) {
          return false;
        }
      }
      return true;
    }
  } else {
    return Tool.indexOfArray(arr1, arr2) >= 0;
  }
};
/**
 * 生成UID字符串
 * @param prefix
 * @returns {string}
 */
Tool.getUUID = function(prefix) {
  let res = [],
    hex = '0123456789ABCDEF';
  for (let i = 0; i < 36; i++) {
    res[i] = Math.floor(Math.random() * 0x10);
  }
  res[14] = 4;
  res[19] = (res[19] & 0x3) | 0x8;
  for (let i = 0; i < 36; i++) {
    res[i] = hex[res[i]];
  }
  res[8] = res[13] = res[18] = res[23] = '-';
  return (prefix || '') + res.join('');
};
/**
 * base64编码
 */
Tool.base64 = {
  map: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=',
  encoded: function(input) {
    if (Tool.isNullOrUndefOrSpace(input)) {
      return;
    }
    input = Tool.utf16to8(input);
    let output = '';
    let chr1,
      chr2,
      chr3 = '';
    let enc1,
      enc2,
      enc3,
      enc4 = '';
    let i = 0;
    do {
      chr1 = input.charCodeAt(i++);
      chr2 = input.charCodeAt(i++);
      chr3 = input.charCodeAt(i++);
      enc1 = chr1 >> 2;
      enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
      enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
      enc4 = chr3 & 63;
      if (isNaN(chr2)) {
        enc3 = enc4 = 64;
      } else if (isNaN(chr3)) {
        enc4 = 64;
      }
      output =
        output +
        Tool.base64.map.charAt(enc1) +
        Tool.base64.map.charAt(enc2) +
        Tool.base64.map.charAt(enc3) +
        Tool.base64.map.charAt(enc4);
      chr1 = chr2 = chr3 = '';
      enc1 = enc2 = enc3 = enc4 = '';
    } while (i < input.length);
    return output;
  },
  decoded: function(input) {
    if (Tool.isNullOrUndefOrSpace(input)) {
      return input;
    }

    let output = '';
    let chr1,
      chr2,
      chr3 = '';
    let enc1,
      enc2,
      enc3,
      enc4 = '';
    let i = 0;

    if (input.length % 4 !== 0) {
      return '';
    }
    let base64test = /[^A-Za-z0-9+/=]/g;
    if (base64test.exec(input)) {
      return '';
    }
    do {
      enc1 = Tool.base64.map.indexOf(input.charAt(i++));
      enc2 = Tool.base64.map.indexOf(input.charAt(i++));
      enc3 = Tool.base64.map.indexOf(input.charAt(i++));
      enc4 = Tool.base64.map.indexOf(input.charAt(i++));
      chr1 = (enc1 << 2) | (enc2 >> 4);
      chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
      chr3 = ((enc3 & 3) << 6) | enc4;

      output = output + String.fromCharCode(chr1);
      if (enc3 !== 64) {
        output += String.fromCharCode(chr2);
      }
      if (enc4 !== 64) {
        output += String.fromCharCode(chr3);
      }
      chr1 = chr2 = chr3 = '';
      enc1 = enc2 = enc3 = enc4 = '';
    } while (i < input.length);
    return Tool.utf8to16(output);
  }
};
/**
 * UTF-16转UTF-8
 */
Tool.utf16to8 = function(str) {
  let out, i, len, c;
  out = '';
  len = str.length;
  for (i = 0; i < len; i++) {
    c = str.charCodeAt(i);
    if (c >= 0x0001 && c <= 0x007f) {
      out += str.charAt(i);
    } else if (c > 0x07ff) {
      out += String.fromCharCode(0xe0 | ((c >> 12) & 0x0f));
      out += String.fromCharCode(0x80 | ((c >> 6) & 0x3f));
      out += String.fromCharCode(0x80 | ((c >> 0) & 0x3f));
    } else {
      out += String.fromCharCode(0xc0 | ((c >> 6) & 0x1f));
      out += String.fromCharCode(0x80 | ((c >> 0) & 0x3f));
    }
  }
  return out;
};
/**
 * UTF-8转UTF-16
 */
Tool.utf8to16 = function(str) {
  let out, i, len, c;
  let char2, char3;
  out = '';
  len = str.length;
  i = 0;
  while (i < len) {
    c = str.charCodeAt(i++);
    switch (c >> 4) {
      case 0:
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
      case 6:
      case 7:
        // 0xxxxxxx
        out += str.charAt(i - 1);
        break;
      case 12:
      case 13:
        char2 = str.charCodeAt(i++);
        out += String.fromCharCode(((c & 0x1f) << 6) | (char2 & 0x3f));
        break;
      case 14:
        char2 = str.charCodeAt(i++);
        char3 = str.charCodeAt(i++);
        out += String.fromCharCode(
          ((c & 0x0f) << 12) | ((char2 & 0x3f) << 6) | ((char3 & 0x3f) << 0)
        );
        break;
      default:
        break;
    }
  }
  return out;
};
/**
 * 替换字符串
 */
Tool.replaceAll = function(val, oldVal, newVal) {
  return val.split(oldVal).join(newVal);
};
/**
 * 字符串加密， 加密规则：
 * （加密值的base64编码再进行base64编码, 替换“=”为“#”， 对长度进行编码（最大值限制为9），长度进行编码后取前两位）
 * + （加密值的base64编码再进行base64编码, 替换“=”为“#”， 取前9位（不足9位，则取全部））
 * + 编码后的字符串值（替换“=”为“#”）
 *
 * @param value
 * @return
 *
 */
Tool.encode = function(value) {
  // 为空时，不进行编码
  if (Tool.isNullOrUndefOrSpace(value)) {
    return '';
  }
  // 对值进行base64编码
  let encodeVal = Tool.base64.encoded(value);
  // 对编码后的值进行编码，替换=为#，取前9位
  let tempVal = Tool.replaceAll(Tool.base64.encoded(encodeVal), '=', '#').substr(0, 9);
  // 生成加密字符串
  return (
    Tool.base64.encoded(tempVal.length.toString()).substr(0, 2) +
    tempVal +
    Tool.replaceAll(encodeVal, '=', '#')
  );
};
/**
 * 字符串解密， 解密规则：
 * 1、获取随机字符串长度（取前两位并补“==”，base64解码）
 * 2、截取以随机字符串结束索引位置为开始的字符串
 * 3、将截取到的字符串进行base64解码
 *
 * @param value
 * @return
 *
 */
Tool.decode = function(value) {
  let result = '';
  if (!Tool.isnUndefOrNull(value) && value.length >= 2) {
    let preValue = parseInt(Tool.base64.decoded(value.substr(0, 2) + '=='));
    if (value.length >= preValue + 2) {
      result = Tool.base64.decoded(Tool.replaceAll(value.substr(2 + preValue), '#', '='));
    }
  }
  return result;
};
// 字符串转日期 @param val, formmater
Tool.stringToDate = function(val) {
  // formmater = 'yyyy-MM-dd hh:mm:ss';
  val = val.replace(/-/g, '/');
  return new Date(val);
};
/**
 * 生成元素随机id
 * @param pre
 * @param lenght
 * @returns {*}
 */
Tool.getRandomId = function(pre, lenght) {
  if (Tool.isNullOrUndefOrSpace(pre)) {
    pre = '_element_';
  }

  if (Tool.isNullOrUndefOrSpace(lenght)) {
    lenght = 100000000;
  }
  return pre + Math.ceil(Math.random() * lenght);
};
Tool.clone = function(obj) {
  //  处理3种简单的类型，数字和字符串和布尔
  if (null === obj || 'object' !== typeof obj) {
    return obj;
  }

  // 处理日期
  if (obj instanceof Date) {
    let copy = new Date();
    copy.setTime(obj.getTime());
    return copy;
  }
  // 处理Map类型
  if (obj instanceof Map) {
    let mapObj = Object.create(null);
    for (let [k, v] of obj) {
      mapObj[k] = v;
    }
    mapObj = JSON.stringify(mapObj);
    mapObj = JSON.parse(mapObj);
    let tmpMap = new Map();
    for (let k of Object.keys(mapObj)) {
      tmpMap.set(k, mapObj[k]);
    }
    return tmpMap;
  }
  // 处理数组或对象
  if (obj instanceof Array || obj instanceof Object) {
    let copy = obj instanceof Array ? [] : {};
    for (let attr in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, attr)) {
        copy[attr] = this.clone(obj[attr]);
      }
    }
    return copy;
  }
  throw new Error('无法克隆Object！不支持其类型.');
};
// 数组去重
Tool.uniq = function(array) {
  let temp = [];
  // let index = [];
  let l = array.length;
  for (let i = 0; i < l; i++) {
    for (let j = i + 1; j < l; j++) {
      if (array[i].value === array[j].value) {
        i++;
        j = i;
      }
    }
    temp.push(array[i]);
    // index.push(i);
  }
  return temp;
};
// 数组指定属性名去重
Tool.uniqueArray = function(array, propertyName) {
  let temp = [];
  // let index = [];
  let l = array.length;
  for (let i = 0; i < l; i++) {
    for (let j = i + 1; j < l; j++) {
      if (array[i][propertyName] === array[j][propertyName]) {
        i++;
        j = i;
      }
    }
    temp.push(array[i]);
    // index.push(i);
  }
  return temp;
};

Tool.uniq2 = function(arr) {
  let hash = [];
  for (let i = 0; i < arr.length; i++) {
    if (hash.indexOf(arr[i]) === -1) {
      hash.push(arr[i]);
    }
  }
  return hash;
}; // 获取对象中的对应属性
Tool.getKeyByKeyName = function(obj, keyName) {
  if (keyName === '' || keyName === undefined) {
    return undefined;
  }
  if (obj instanceof Object) {
    let keyList = Object.keys(obj);
    if (keyList.length > 0) {
      for (let i = 0; i < keyList.length; i++) {
        if (keyName === keyList[i]) {
          return obj[keyList[i]];
        }
      }
      return undefined;
    } else {
      return undefined;
    }
  } else {
    return undefined;
  }
};

// 返回数组2中和数组1相同的某个属性的对象的列表

// 将时间戳转化为需要的格式
Tool.timeToDate = function(timestamp) {
  let date = new Date(timestamp);
  let y = date.getFullYear();
  let m = date.getMonth() + 1;
  m = m < 10 ? '0' + m : m;
  let d = date.getDate();
  d = d < 10 ? '0' + d : d;
  return y + '-' + m + '-' + d;
};

// 处理记录仪sn号
Tool.convertSn = function(sn) {
  /*
   *   从3代记录仪开始 sn格式为 0x(x为记录仪代数)
   *   在tb处理记录仪遥测数据时 其中的sn属性的值 前面的0会被清掉(如 0300001 会变为 300001)
   */
  if (sn.substring(0, 1) === '0') {
    return sn.substring(1, sn.length);
  } else {
    return sn;
  }
};
// 获取数组中对应属性的对象(对应属性只能为主键之类不可重复的属性)
Tool.getObjFromArray = function(arr, attr, value) {
  if (arr.length > 0) {
    for (let obj of arr) {
      if (obj[attr] === value) {
        return obj;
      }
    }
  }
  return null;
};

// 获取下拉框选中的对象的下标
Tool.getIndexFromArray = function(arr, attr, value) {
  if (arr.length > 0) {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i][attr] === value) {
        return i;
      }
    }
  }
  return null;
};

// 将CANFD 、LIN、FlexRay总线类型对应的总线ID转换成 0~16
Tool.zxidToNumber = function(zxid) {
  if (zxid === '' && zxid === null) {
    return;
  }
  let str;
  if (zxid.indexOf('CAN/CANFD') !== -1) {
    str = zxid.replace('CAN/CANFD', '') * 1 - 1;
  } else if (zxid.indexOf('LIN') !== -1) {
    str = zxid.replace('LIN', '') * 1 - 1;
  } else if (zxid.indexOf('FlexRay') !== -1) {
    str = zxid.replace('FlexRay', '') * 1 - 1;
  } else {
    str = zxid * 1;
  }
  return str;
};
// 将2020-03-17T03:13:01.000+0000 格式日期转化成YY-MM-DD hh:mm:ss
Tool.strTimeToDateTime = function(str) {
  let d = new Date(str);
  let month = d.getMonth() + 1 < 10 ? '0' + (d.getMonth() + 1) : d.getMonth() + 1;
  let day = d.getDate() < 10 ? '0' + d.getDate() : d.getDate();
  let hour = d.getHours() < 10 ? '0' + d.getHours() : d.getHours();
  let minute = d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes();
  let second = d.getSeconds() < 10 ? '0' + d.getSeconds() : d.getSeconds();
  return d.getFullYear() + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
};
// 获取sesstionStorage的数据
Tool.getSessionStorage = function(key) {
  let value = window.sessionStorage.getItem(key);
  if (!value || value === 'null' || value === 'undefined') {
    return null;
  }
  return value;
};
// 获取n位随机数
Tool.randomN = function(n) {
  let res = '';
  for (
    ;
    res.length < n;
    res += Math.random()
      .toString(36)
      .substr(2)
      .toUpperCase() // eslint-disable-next-line no-empty
  ) {}
  return res.substr(0, n);
};
// 生成随机的grb颜色
Tool.randomColor = function() {
  let r = Math.floor(Math.random() * 256);
  let g = Math.floor(Math.random() * 256);
  let b = Math.floor(Math.random() * 256);
  return 'rgb(' + r + ',' + g + ',' + b + ')';
};
// 将rgb颜色转为16进制
Tool.colorHex = function(rgbColor) {
  // RGB颜色值的正则
  let reg = /^(rgb|RGB)/;
  let color = rgbColor;
  if (reg.test(color)) {
    let strHex = '#';
    // 把RGB的3个数值变成数组
    let colorArr = color.replace(/(?:\(|\)|rgb|RGB)*/g, '').split(',');
    // 转成16进制
    for (let i = 0; i < colorArr.length; i++) {
      let hex = Number(colorArr[i]).toString(16);
      if (hex === '0') {
        hex += hex;
      }
      strHex += hex;
    }
    return strHex;
  } else {
    return String(color);
  }
};
// 将时间戳转为需要的格式
// formats:Y-m-d/Y-m-d H:i:s/Y年m月d日/Y年m月d日 H时i分,不设置则为Y-m-d
// 注 ： 只能用一个Y来代表年，一个m来代表月。以此类推
Tool.timeFormat = function(timestamp, formats) {
  formats = formats || 'Y-m-d';

  let zero = function(value) {
    if (value < 10) {
      return '0' + value;
    }
    return value;
  };
  timestamp = Number(timestamp);
  let myDate = timestamp ? new Date(timestamp) : new Date();

  let year = myDate.getFullYear();
  let month = zero(myDate.getMonth() + 1);
  let day = zero(myDate.getDate());

  let hour = zero(myDate.getHours());
  let minite = zero(myDate.getMinutes());
  let second = zero(myDate.getSeconds());

  return formats.replace(/Y|m|d|H|i|s/gi, function(matches) {
    return {
      Y: year,
      m: month,
      d: day,
      H: hour,
      i: minite,
      s: second
    }[matches];
  });
};

// 深拷贝
Tool.deepCopy = function(obj) {
  let result = Array.isArray(obj) ? [] : {};
  for (let key in obj) {
    // eslint-disable-next-line
    if (obj.hasOwnProperty(key)) {
      if (typeof obj[key] === 'object' && obj[key] !== null) {
        result[key] = Tool.deepCopy(obj[key]); // 递归复制
      } else {
        result[key] = obj[key];
      }
    }
  }
  return result;
};

export default Tool;
