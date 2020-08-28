const toggleTemplates = (index, obj = {}) => {
    let elem = document.createElement('div');

    if (obj.id != null ) {
      elem.id = obj.id;
    }
    if (obj.className != null ) {
      elem.className = obj.className;
    }
    if (obj.dataAtr != null ) {
      elem.setAttribute('data-question', obj.dataAtr);
    }
    if (typeof(index) == 'number') {
      elem.append(document.getElementById(this.arr[index]).content.cloneNode(true));
    }
    if (typeof(index) == 'string') {
      elem.append(document.getElementById(index).content.cloneNode(true));
    }
    document.querySelector('#main').replaceChild(elem, document.querySelector('#main > div'));
}
export default toggleTemplates;
