// export default class Slider {
// // isActive = 'intro';
// index = 0;
// constructor(arr) {
//   this.arr = arr;
// }
//
//
// toggleTemplates(index) {
//   let elem = document.createElement('div');
//   if (typeof(index) == 'number') {
//     elem.append(document.getElementById(this.arr[index]).content.cloneNode(true));
//   }
//   if (typeof(index) == 'string') {
//     elem.append(document.getElementById(index).content.cloneNode(true));
//   }
//   // this.activeValue = index;
//   // this.cl(this.activeValue);
//   document.querySelector('#main').replaceChild(elem, document.querySelector('#main > div'));
// //console.log(index);
// }
// // introListener() {
// //   this.activeValue = 'dasasd';
// //   return this.toggleTemplates = 3;
// // }
// actionSlider(){
//
//
//   //console.log(this.arr);
//   // let that = this;
//   // const prev = (e) => {
//   //   e.preventDefault();
//   //     if (index <= 0) {
//   //       index = arr.length - 1;
//   //     }else {
//   //       index--;
//   //     }
//   //   toggleTemplates(arr, index);
//   // }
//   // const next = (e) => {
//   //   e.preventDefault();
//   //     if (index >= arr.length - 1) {
//   //       index = 0;
//   //     }else {
//   //       index++;
//   //     }
//   //   toggleTemplates(arr, index);
//   // }
//   // let index = -1;
//
//  // document.querySelector('.intro__asterisk').addEventListener('click', function(e) {
//  //   return this.toggleTemplates('greeting');
//  //   //setActive('greeting');
//  //   //func1(isActive)
//  // });
//
//   // func1(isActive) {
//
//   // }
//   //       document.querySelector('.rules__input').addEventListener('change', function(e) {
//   //         console.log(e.target.value);
//   //         func1(isActive)
//   //       });
//   //  document.querySelector('.greeting__continue').addEventListener('click', function(e) {
//   //    toggleTemplates(arr, 2);
//   //  });
//   //
//   // document.addEventListener('keydown', function(e) {
//   //   if (e.keyCode === 37) {
//   //     prev(e);
//   //   }
//   //   if (e.keyCode === 39) {
//   //     next(e);
//   //   }
//   // });
//   // document.querySelector('.arrows__btn--prev').addEventListener('click', function(e) {
//   //   prev(e);
//   // });
//   // document.querySelector('.arrows__btn--next').addEventListener('click', function(e) {
//   //   next(e);
//   // });
//   }
//
// }

const toggleTemplates = (index, id = ``, className = ``) => {
    let elem = document.createElement('div');
    if (id != '' ) {
      elem.id = id;
    }
    if (className != '' ) {
      elem.className = className;
    }
    if (typeof(index) == 'number') {
      elem.append(document.getElementById(this.arr[index]).content.cloneNode(true));
    }
    if (typeof(index) == 'string') {
      elem.append(document.getElementById(index).content.cloneNode(true));
    }
    // this.activeValue = index;
    // this.cl(this.activeValue);
    document.querySelector('#main').replaceChild(elem, document.querySelector('#main > div'));
}
export default toggleTemplates;
