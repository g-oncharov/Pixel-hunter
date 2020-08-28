export default class Timer {
  constructor (selector, value, timeIsOver, obj = null) {
    this.selector = selector;
    this.value = value;
    this.timeIsOver = timeIsOver;
    this.times = 0;
    this.timeout = 0;
    if (obj !== null) {
    this.obj = obj;
    }
  }
  show() {
    let elem = document.querySelector(this.selector);
    if(this.times > 0 && this.times !== null && elem !== null) {
      elem.innerHTML = this.times;
      this.times--;
    }else {
      this.deactivate();
      clearInterval(this.timeout);
    }
  }

  deactivate() {
    clearInterval(this.timeout);
    this.times = 0;
  }

  scoreLogic() {
    if (this.times > this.value[1]) {
      this.obj.speedAnswer[this.obj.countAnswer] = 2;
    }else if (this.times > this.value[2] && this.times < this.value[1]) {
      this.obj.speedAnswer[this.obj.countAnswer] = 1;
    }else if (this.times < this.value[2]) {
      this.obj.speedAnswer[this.obj.countAnswer] = 0;
    }else {
      this.obj.speedAnswer[this.obj.countAnswer] = 1;
    }
  };
  activate() {
    this.times = this.value[0];
    this.show()
    this.timeout = window.setInterval(() => {
      if (this.times === 0) {
        this.deactivate();
        this.timeIsOver();
      }
      this.show();
    }, 1000);
  }
}
