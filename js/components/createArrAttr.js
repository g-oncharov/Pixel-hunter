const createArrAttr = (arr, selector, attr) => {
  document.querySelectorAll(selector).forEach((item, i) => {
    if (attr == 'id') {
      arr[i] = item.id;
    }else if (attr == 'class') {
      arr[i] = item.className;
    }
    return arr[i];
  });
  console.info(arr);
}

export default createArrAttr;
