import toggleTemplates from './toggleTemplates';
import imageData from './imageData';
import Timer from './timer';
import Score from './score';

let isActive;
let speedAnswer = [];
let mistakeBar = [];
let statusBar = [];
let countAnswer = 0;
let countFastAnswer = 0;
let countSlowAnswer = 0;
let countMistakeAnswer = 0;
let countCorrectAnswer = 0;

const TIMER_VALUE = [15, 10, 5];
const COUNT_MISTAKE = 3;
const MAX_ANSWER = 10;

const StatusResult = {
  WRONG: -1,
  SLOW: 0,
  CORRECT: 1,
  FAST: 2
}

const Stage = {
  game1:[0,3,6,9],
  game2:[1,4,7],
  game3:[2,5,8]
};

const resetPoints = () => {
  speedAnswer = [];
  mistakeBar = [];
  statusBar = [];
  countAnswer = 0;
  countFastAnswer = 0;
  countSlowAnswer = 0;
  countMistakeAnswer = 0;
  countCorrectAnswer = 0;
}

const createStatusBar = () => {
  statusBar = speedAnswer;
  mistakeBar.forEach((item, i) => {
    statusBar[mistakeBar[i]] = -1
  });
}

const showStatusBar = () => {
  let elements = document.querySelectorAll('.stats__result');
  let hearts = document.querySelectorAll('.game__heart');

  for (let i = 0; i < statusBar.length; i++) {
    switch (statusBar[i]) {
      case StatusResult.WRONG:
        elements[i].className = 'stats__result stats__result--wrong';
        break;
      case StatusResult.SLOW:
        elements[i].className = 'stats__result stats__result--slow';
        break;
      case StatusResult.CORRECT:
        elements[i].className = 'stats__result stats__result--correct';
        break;
      case StatusResult.FAST:
        elements[i].className = 'stats__result stats__result--fast';
        break;
      default:
        elements[i].className = 'stats__result stats__result--unknown';
    }
  }

  if (hearts[0] !== undefined || hearts[1] !== undefined) {
    switch (countMistakeAnswer) {
      case 1:
        hearts[0].src = 'img/heart__empty.svg';
        break;
      case 2:
        hearts[0].src = 'img/heart__empty.svg';
        hearts[1].src = 'img/heart__empty.svg';
        break;
      default:
    }
  }
}




const handlerСreation = (isActive) => {

const timeIsOver = () => {
    mistakeBar.push(countAnswer);
    countAnswer++;
    countMistakeAnswer++
    if (countAnswer < MAX_ANSWER && countMistakeAnswer < COUNT_MISTAKE) {
      if (isActive == 'game-1') {
        toggleTemplates('game-2');
        handlerСreation('game-2');
      }
      if (isActive == 'game-2') {
        toggleTemplates('game-3');
        handlerСreation('game-3');
      }
      if (isActive == 'game-3') {
        toggleTemplates('game-1');
        handlerСreation('game-1');
      }
    }else {
      gameOver();
    }
}

let timer = new Timer('.game__timer', TIMER_VALUE, timeIsOver, {speedAnswer, countAnswer});

  const nextLevel = (level, obj = null) => {
    if (obj !== null) {
      toggleTemplates(level, obj);
    }else {
      toggleTemplates(level);
    }
    isActive = level;
    handlerСreation(level);
  }

  const gameOver = () => {
    timer.deactivate();
    nextLevel('stats');
  }

  const returnHome = () => {
    document.querySelector('.header__back').addEventListener('click', () => {
      timer.deactivate();
      nextLevel('intro', { className: 'intro' });
      resetPoints();
    });
  }

  if (isActive == 'intro') {
    document.querySelector('.intro__asterisk').addEventListener('click', () => {
      nextLevel('greeting');
    });
  }

  if (isActive == 'greeting') {
    document.querySelector('.greeting__continue').addEventListener('click', () => {
      nextLevel('rules');
    });
  }

  if (isActive == 'rules') {
    let input  = document.querySelector('.rules__input');
    let button = document.querySelector('.rules__button');

    button.addEventListener('click', () => {
      nextLevel('game-1');
    });

    input.addEventListener('input', () => {
      if (input.value.trim().length >= 1) {
        button.disabled = false;
      }else {
        button.disabled = true;
      }

    });
    returnHome();
  }
  if (isActive == 'game-1') {
    isActive = 'game-1';
    let inputs1 = document.querySelectorAll('input[name="question1"]');
    let inputs2 = document.querySelectorAll('input[name="question2"]');
    let ask1, ask2, checkedInput1, checkedInput2;
    let correctAsk1 = 'paint';
    let correctAsk2 = 'photo';

    createStatusBar();
    showStatusBar();
    timer.activate();

    switch (countAnswer) {
      case Stage.game1[0]:
          document.querySelector('.image-1').src = imageData.paint.game1[0].url;
          document.querySelector('.image-2').src = imageData.photo.game1[0].url;
        break;
      case Stage.game1[1]:
          document.querySelector('.image-1').src = imageData.paint.game1[1].url;
          document.querySelector('.image-2').src = imageData.photo.game1[1].url;
        break;
      case Stage.game1[2]:
          document.querySelector('.image-1').src = imageData.paint.game1[2].url;
          document.querySelector('.image-2').src = imageData.photo.game1[2].url;
        break;
      case Stage.game1[3]:
          document.querySelector('.image-1').src = imageData.photo.game1[3].url;
          document.querySelector('.image-2').src = imageData.paint.game1[3].url;
          correctAsk1 = 'photo';
          correctAsk2 = 'paint';
        break;
    }


    let game1Func = () => {
      countAnswer++;
        if (countAnswer < MAX_ANSWER) {
          toggleTemplates('game-2');
          isActive = 'game-2';
        }else {
          gameOver();
        }

        if (correctAsk1 === ask1 && correctAsk2 === ask2) {
          countCorrectAnswer++;
        }else {
          mistakeBar.push(countAnswer - 1);
          countMistakeAnswer++
        }
        if (countMistakeAnswer >= COUNT_MISTAKE) {
          gameOver();
        }

        handlerСreation(isActive);
    }

    inputs1.forEach((item, i) => {
      item.addEventListener('change', () => {
        checkedInput1 = true;
        ask1 = item.value;

        if (checkedInput1 === true && checkedInput2 === true) {
          timer.scoreLogic();
          timer.deactivate();
          game1Func();
        }
      });
    });

    inputs2.forEach((item, i) => {
      item.addEventListener('change', () => {
        checkedInput2 = true;
        ask2 = item.value;

        if (checkedInput1 == true && checkedInput2 == true) {
          timer.scoreLogic();
          timer.deactivate();
          game1Func();
        }
      });
    });
    returnHome();
  }

  if (isActive == 'game-2') {
    isActive = 'game-2';
    let input = document.querySelectorAll('input[name="question1"]');
    let ask;
    let correctAsk = 'paint';

    createStatusBar();
    showStatusBar();
    timer.activate();

    switch (countAnswer) {
      case Stage.game2[0]:
          document.querySelector('.image').src = imageData.paint.game2[0].url;
        break;
      case Stage.game2[1]:
          document.querySelector('.image').src = imageData.paint.game2[1].url;
        break;
      case Stage.game2[2]:
          document.querySelector('.image').src = imageData.paint.game2[2].url;
        break;
    }

    let game2Func = () => {
      countAnswer++;
        if (countAnswer < MAX_ANSWER) {
          toggleTemplates('game-3');
          isActive = 'game-3';
        }else {
          gameOver();
        }

      if (correctAsk == ask) {
        countCorrectAnswer++;
      }else {
        mistakeBar.push(countAnswer - 1);
        countMistakeAnswer++
      }
      if (countMistakeAnswer >= COUNT_MISTAKE) {
        gameOver();
      }

      return handlerСreation(isActive);
    }

    input.forEach((item, i) => {
      item.addEventListener('change', () => {
        ask = item.value;
        timer.scoreLogic();
        timer.deactivate();
        game2Func();
      });
    });

    returnHome();
  }

  if (isActive == 'game-3') {
    isActive = 'game-3';
    let options = document.querySelectorAll('.game__option');
    let ask, correctAsk;

    createStatusBar();
    showStatusBar();
    timer.activate();

      switch (countAnswer) {
        case Stage.game3[0]:
            document.querySelector('.image-1').src = imageData.photo.game3[0].url;
            document.querySelector('.image-2').src = imageData.paint.game3[0].url;
            document.querySelector('.image-3').src = imageData.photo.game3[1].url;
            correctAsk = 'image-2';
          break;
        case Stage.game3[1]:
            document.querySelector('.image-1').src = imageData.photo.game3[2].url;
            document.querySelector('.image-2').src = imageData.photo.game3[3].url;
            document.querySelector('.image-3').src = imageData.paint.game3[1].url;
            correctAsk = 'image-3';
          break;
        case Stage.game3[2]:
            document.querySelector('.image-1').src = imageData.photo.game3[4].url;
            document.querySelector('.image-2').src = imageData.photo.game3[5].url;
            document.querySelector('.image-3').src = imageData.paint.game3[2].url;
            correctAsk = 'image-3';
          break;
      }

    let game3Func = () => {
      countAnswer++;
      if (countAnswer < MAX_ANSWER) {
        toggleTemplates('game-1');
        isActive = 'game-1';
      }else {
        gameOver();
      }

      if (correctAsk == ask) {
        countCorrectAnswer++;
      }else {
        mistakeBar.push(countAnswer - 1);
        countMistakeAnswer++
      }
      if (countMistakeAnswer >= COUNT_MISTAKE) {
        gameOver();
      }

      return handlerСreation(isActive);
    }


    options.forEach((item, i) => {
      item.addEventListener('click', () => {
        ask = item.querySelector('img').className;
        timer.scoreLogic();
        timer.deactivate();
        game3Func();
      });
    });
    returnHome();
  }

  if (isActive == 'stats') {
    console.log(`Number: ${countAnswer}`);
    console.log(`countMistakeAnswer: ${countMistakeAnswer}`);
    console.log(`countCorrectAnswer: ${countCorrectAnswer}`);
    console.log('countSlowAnswer');
    console.info(countSlowAnswer);
    console.log('Mistake');
    console.info(mistakeBar);
    console.log('statusBar');
    console.info(statusBar);

    let score = new Score(statusBar, StatusResult, COUNT_MISTAKE);
    score.calcStatusScore();
    score.calcAllScore();
    score.showScore();
    createStatusBar();
    showStatusBar();
    timer.deactivate();
    returnHome();
  }
}

export default handlerСreation;
