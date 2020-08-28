import intro from '../blocks/templates/intro';
import greeting from '../blocks/templates/greeting';
import rules from '../blocks/templates/rules';
import game1 from '../blocks/templates/game-1';
import game2 from '../blocks/templates/game-2';
import game3 from '../blocks/templates/game-3';
import stats from '../blocks/templates/stats';
import controls from '../blocks/others/controls';
import introTemplate from '../blocks/templates/introTemplate';

const innerBlock = () => {
  document.querySelector('#intro').append(intro);
  document.body.appendChild(introTemplate);
  document.body.appendChild(greeting);
  document.body.appendChild(rules);
  document.body.appendChild(game1);
  document.body.appendChild(game2);
  document.body.appendChild(game3);
  document.body.appendChild(stats);
  // document.querySelector('#rules').append(rules);
  // document.querySelector('#game-1').append(game1);
  // document.querySelector('#game-2').append(game2);
  // document.querySelector('#game-3').append(game3);
  // document.querySelector('#stats').append(stats);
}


export default innerBlock;
