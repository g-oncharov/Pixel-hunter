import toggleTemplates from './toggleTemplates';
import imageData from './imageData';
let isActive;
let speedAnswer = [];
let mistakeBar = [];
let statusBar = [];
let countAnswer = 0;
let countFastAnswer = 0;
let countSlowAnswer = 0;
let countMistakeAnswer = 0;
let countCorrectAnswer = 0;
const COUNT_MISTAKE = 3;
const TIMER_VALUE = 15;

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

  let elements = document.querySelectorAll('.stats__result');
  let hearts = document.querySelectorAll('.game__heart');
  for (let i = 0; i < statusBar.length; i++) {
    if (statusBar[i] == -1) {
      elements[i].className = 'stats__result stats__result--wrong'
    }
    if (statusBar[i] == 0) {
      elements[i].className = 'stats__result stats__result--slow'
    }
    if (statusBar[i] == 1) {
      elements[i].className = 'stats__result stats__result--correct'
    }
    if (statusBar[i] == 2) {
      elements[i].className = 'stats__result stats__result--fast'
    }
    if (statusBar[i] == null) {
      elements[i].className = 'stats__result stats__result--unknown'
    }
  }
  if (hearts[0] != undefined || hearts[1] != undefined) {
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
///////////////////////////
  let times, timeout, returnedHome;

  const timer = () => {
    let elem = document.querySelector('.game__timer');
    if(times > 0 && times != null && elem != null) {
      document.querySelector('.game__timer').innerHTML = times;
      times--;
    }else if (returnedHome == true) {
      deactivateTimer();
      clearInterval(timeout);
    }else {
      deactivateTimer();
      clearInterval(timeout);
    }
  }

  const deactivateTimer = () => {
    clearInterval(timeout);
    times = 0;
  }

  const timeIsOver = () => {
      if (times === 0) {
        deactivateTimer();
        mistakeBar.push(countAnswer);
        countAnswer++;
        countMistakeAnswer++
        if (countAnswer < 10 && countMistakeAnswer < COUNT_MISTAKE) {
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
  }

  const timerLogic = () => {
    if (times > 10) {
      speedAnswer[countAnswer] = 2;
      countFastAnswer++;
    }else if (times > 5 && times < 10) {
      speedAnswer[countAnswer] = 1;
    }else if (times < 5) {
      speedAnswer[countAnswer] = 0;
      countSlowAnswer--;
    }else {
      speedAnswer[countAnswer] = 1;
    }
  };

  const activeTimer = () => {
    times = TIMER_VALUE;
    timer()
    timeout = window.setInterval(() => {
      timeIsOver();
      timer();
    }, 1000);
  }

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
    returnedHome = false;
    deactivateTimer();
    nextLevel('stats');
  }

  const returnHome = () => {
    document.querySelector('.header__back').addEventListener('click', () => {
      returnedHome = true;
      nextLevel('intro', { className: 'intro' });
      resetPoints();
      deactivateTimer();
    });
  }

///////////////////////////
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
    let checkedInput1 = false;
    let checkedInput2 = false;
    let ask1, ask2, correctAsk1, correctAsk2;
    console.log(`countMistakeAnswer ` + countMistakeAnswer);
    createStatusBar();
    activeTimer();
    if (countAnswer === 0) {
        console.log(document.querySelector('.image-1').src = imageData.paint.game1[0].url);
        document.querySelector('.image-1').src = imageData.paint.game1[0].url;
        correctAsk1 = 'paint';
        document.querySelector('.image-2').src = imageData.photo.game1[0].url;
        correctAsk2 = 'photo';
    }
    if (countAnswer === 3) {
        document.querySelector('.image-1').src = imageData.paint.game1[1].url;
        correctAsk1 = 'paint';
        document.querySelector('.image-2').src = imageData.photo.game1[1].url;
        correctAsk2 = 'photo';
    }
    if (countAnswer === 6) {
        document.querySelector('.image-1').src = imageData.paint.game1[2].url;
        correctAsk1 = 'paint';
        document.querySelector('.image-2').src = imageData.photo.game1[2].url;
        correctAsk2 = 'photo';
    }
    if (countAnswer === 9) {
        document.querySelector('.image-1').src = imageData.photo.game1[3].url;
        correctAsk1 = 'photo';
        document.querySelector('.image-2').src = imageData.paint.game1[3].url;
        correctAsk2 = 'paint';
    }

    let game1Func = (item) => {
        countAnswer++;
          if (countAnswer < 10) {
            toggleTemplates('game-2');
            isActive = 'game-2';
          }else {
            gameOver();
          }
      console.log(`Number: ${countAnswer}`);

      console.log(correctAsk1);
      console.log(ask1);

      if (correctAsk1 == ask1 && correctAsk2 == ask2) {
        console.log('correct Ask 1 and 2');
        countCorrectAnswer++;
      }else {
        console.log('uncorrect Ask');
        mistakeBar.push(countAnswer - 1);
        countMistakeAnswer++
      }
      if (countMistakeAnswer >= COUNT_MISTAKE) {
        gameOver();
      }
      console.log(`countMistakeAnswer: ${countMistakeAnswer}`);
      handlerСreation(isActive);
    }

    inputs1.forEach((item, i) => {
      item.addEventListener('change', () => {
        //console.log(inputs1[i].checked);
        checkedInput1 = true;
        ask1 = item.value;
        console.log(`ask1: ${ask1}`);
        if (checkedInput1 == true && checkedInput2 == true) {
          timerLogic();
          deactivateTimer();
          game1Func(item);
        }
      });
    });

    inputs2.forEach((item, i) => {
      item.addEventListener('change', () => {
        //console.log(inputs2[i].checked);
        checkedInput2 = true;
        ask2 = item.value;
        console.log(`ask2: ${ask2}`);
        if (checkedInput1 == true && checkedInput2 == true) {
          timerLogic();
          deactivateTimer();
          game1Func(item);
        }
      });

    });
    returnHome();
  }

  if (isActive == 'game-2') {
    isActive = 'game-2';
    let inputs = document.querySelectorAll('input[name="question1"]');
    let checkedInput = false;
    let ask, correctAsk;
    console.log(`countMistakeAnswer ` + countMistakeAnswer);
    console.log(countAnswer);
    createStatusBar();
    activeTimer();

    if (countAnswer === 1) {
        document.querySelector('.image').src = imageData.paint.game2[0].url;
        correctAsk = 'paint';
    }
    if (countAnswer === 4) {
        document.querySelector('.image').src = imageData.paint.game2[1].url;
        correctAsk = 'paint';
    }
    if (countAnswer === 7) {
        document.querySelector('.image').src = imageData.paint.game2[2].url;
        correctAsk = 'paint';
    }

    let game2Func = (item) => {
      countAnswer++;
        if (countAnswer < 10) {
          toggleTemplates('game-3');
          isActive = 'game-3';
        }else {
          gameOver();
        }
      console.log(`Number: ${countAnswer}`);
      console.log(correctAsk);
      console.log(ask);
      if (correctAsk == ask) {
        console.log('correct Ask');
        countCorrectAnswer++;
      }else {
        console.log('uncorrect Ask');
        mistakeBar.push(countAnswer - 1);
        countMistakeAnswer++
      }
      if (countMistakeAnswer >= COUNT_MISTAKE) {
        gameOver();
      }
      console.log(`countMistakeAnswer: ${countMistakeAnswer}`);
      return handlerСreation(isActive);
    }

    inputs.forEach((item, i) => {
      item.addEventListener('change', () => {
        checkedInput = true;
        ask = item.value;
        console.log(`ask1: ${ask}`);
        if (checkedInput == true) {
            timerLogic();
            deactivateTimer();
            game2Func();
        }
      });
    });

    returnHome();
  }

  if (isActive == 'game-3') {
    isActive = 'game-3';
    let options = document.querySelectorAll('.game__option');
    let checkedOptions = false;
    let ask, correctAsk;
    console.log(`countMistakeAnswer ` + countMistakeAnswer);

    createStatusBar();
    activeTimer();

    if (countAnswer === 2) {
        document.querySelector('.image-1').src = imageData.photo.game3[0].url;
        document.querySelector('.image-2').src = imageData.paint.game3[0].url;
        document.querySelector('.image-3').src = imageData.photo.game3[1].url;
        correctAsk = 'image-2';
    }
    if (countAnswer === 5) {
        document.querySelector('.image-1').src = imageData.photo.game3[2].url;
        document.querySelector('.image-2').src = imageData.photo.game3[3].url;
        document.querySelector('.image-3').src = imageData.paint.game3[1].url;
        correctAsk = 'image-3';
    }
    if (countAnswer === 8) {
        document.querySelector('.image-1').src = imageData.photo.game3[4].url;
        document.querySelector('.image-2').src = imageData.photo.game3[5].url;
        document.querySelector('.image-3').src = imageData.paint.game3[2].url;
        correctAsk = 'image-3';
    }

    let game3Func = (item) => {
      countAnswer++;
      if (countAnswer < 10) {
        toggleTemplates('game-1');
        isActive = 'game-1';
      }else {
        gameOver();
      }

      console.log(`Number: ${countAnswer}`);
      console.log(correctAsk);
      console.log(ask);
      if (correctAsk == ask) {
        console.log('correct Ask');
        countCorrectAnswer++;
      }else {
        console.log('uncorrect Ask');
        mistakeBar.push(countAnswer - 1);
        countMistakeAnswer++
      }
      if (countMistakeAnswer >= COUNT_MISTAKE) {
        gameOver();
      }
      console.log(`countMistakeAnswer: ${countMistakeAnswer}`);
      return handlerСreation(isActive);
    }
    options.forEach((item, i) => {
      item.addEventListener('click', () => {
        ask = item.querySelector('img').className;
        console.log(`ask: ${ask}`);
        checkedOptions = true;
        if (checkedOptions == true) {
          timerLogic();
          deactivateTimer();
          game3Func();
        }
      });
    });
    returnHome();
  }

  if (isActive == 'stats') {
    console.log('///////////');
    console.log(`Number: ${countAnswer}`);
    console.log(`countMistakeAnswer: ${countMistakeAnswer}`);
    console.log(`countCorrectAnswer: ${countCorrectAnswer}`);
    console.log('speedAnswer');
    console.info(speedAnswer);
    console.log('Mistake');
    console.info(mistakeBar);
    console.log('statusBar');
    console.info(statusBar);

    countFastAnswer = 0;
    let score = 0;
    for (let i = 0; i < statusBar.length; i++) {
      if (statusBar[i] === 2) {
        countFastAnswer++;
      }
    }

    if (countCorrectAnswer !== 0) {
      document.querySelector('.status-bar .result__total').innerText = countCorrectAnswer * 100;
      score += countCorrectAnswer * 100;
    }else {
      document.querySelector('.status-bar .result__total').innerText = countCorrectAnswer;
    }

    if (countFastAnswer !== 0) {
      document.querySelector('.fast-bar .result__count').innerText = countFastAnswer;
      document.querySelector('.fast-bar .result__total').innerText = countFastAnswer * 50;
      score += countFastAnswer * 50;
    }else {
      document.querySelector('.fast-bar').setAttribute('style', 'display:none;');
    }

    if (countMistakeAnswer !== COUNT_MISTAKE) {
      document.querySelector('.health-bar .result__count').innerText = COUNT_MISTAKE - countMistakeAnswer;
      document.querySelector('.health-bar .result__total').innerText = (COUNT_MISTAKE - countMistakeAnswer) * 50;
      score += (COUNT_MISTAKE - countMistakeAnswer) * 50;
    }else {
      document.querySelector('.health-bar').setAttribute('style', 'display:none;');
    }

    if (countSlowAnswer !== 0) {
      document.querySelector('.slow-bar .result__count').innerText = countSlowAnswer;
      document.querySelector('.slow-bar .result__total').innerText = countSlowAnswer * 50;
      score += countSlowAnswer * 50;
    }else {
      document.querySelector('.slow-bar').setAttribute('style', 'display:none;');
    }
    document.querySelector('.result__total--final').innerText = score;

    createStatusBar();
    deactivateTimer();
    returnHome();
  }
}

export default handlerСreation;
