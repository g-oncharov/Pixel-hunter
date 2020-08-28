export default class Score {
  constructor(statusArr, statusResult, maxMistake) {
    this.score = 0;
    this.statusArr = statusArr;
    this.statusResult = statusResult;
    this.maxMistake = maxMistake;
    this.correctCount = 0;
    this.fastCount = 0;
    this.slowCount = 0;
    this.mistakeCount = maxMistake;
    this.correctTotal;
    this.fastTotal;
    this.slowTotal;
    this.mistakeTotal;
  }
  calcStatusScore() {
    for (let i = 0; i < this.statusArr.length; i++) {
      if (this.statusArr[i] === this.statusResult.WRONG) {
        this.mistakeCount--;
      }
      if (this.statusArr[i] === this.statusResult.FAST) {
        this.fastCount++;
      }
      if (this.statusArr[i] !== this.statusResult.WRONG) {
        this.correctCount++;
      }
      if (this.statusArr[i] === this.statusResult.SLOW) {
        this.slowCount++;
      }
    }
  }
  calcAllScore() {
    if (this.correctCount !== 0) {
      this.correctTotal = this.correctCount * 100;
      this.score += this.correctTotal;
    }
    if (this.fastCount !== 0) {
      this.fastTotal = this.fastCount * 50;
      this.score += this.fastTotal;
    }
    if (this.mistakeCount !== 0) {
      this.mistakeTotal = this.mistakeCount * 50;
      this.score += this.mistakeTotal;
    }
    if (this.slowCount !== 0) {
      this.slowTotal = this.slowCount * 50 * -1;
      this.score += this.slowTotal;
    }

    return this.score;
  }

  showScore() {
    if (this.correctCount !== 0) {
      document.querySelector('.status-bar .result__total').innerText = this.correctTotal;
    }else {
      document.querySelector('.status-bar .result__total').innerText = this.correctCount;
    }

    if (this.fastCount !== 0) {
      document.querySelector('.fast-bar .result__count').innerText = this.fastCount;
      document.querySelector('.fast-bar .result__total').innerText = this.fastTotal;
    }else {
      document.querySelector('.fast-bar').setAttribute('style', 'display:none;');
    }

    if (this.mistakeCount !== 0) {
      document.querySelector('.health-bar .result__count').innerText = this.mistakeCount;
      document.querySelector('.health-bar .result__total').innerText = this.mistakeTotal;
    }else {
      document.querySelector('.health-bar').setAttribute('style', 'display:none;');
    }

    if (this.slowCount !== 0) {
      document.querySelector('.slow-bar .result__count').innerText = this.slowCount;
      document.querySelector('.slow-bar .result__total').innerText = this.slowTotal;
    }else {
      document.querySelector('.slow-bar').setAttribute('style', 'display:none;');
    }
    document.querySelector('.result__total--final').innerText = this.score;
  }

}
