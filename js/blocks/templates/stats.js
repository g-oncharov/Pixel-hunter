import appendTemplates from '../../components/appendTemplates';
const element = appendTemplates(`
  <header class="header">
    <div class="header__back">
      <span class="back">
        <img src="img/arrow_left.svg" width="45" height="45" alt="Back">
        <img src="img/logo_small.png" width="101" height="44">
      </span>
    </div>
  </header>
  <div class="result">
    <table class="result__table">
      <tr class="status-bar">
        <td colspan="2">
          <ul class="stats">
            <li class="stats__result stats__result--unknown"></li>
            <li class="stats__result stats__result--unknown"></li>
            <li class="stats__result stats__result--unknown"></li>
            <li class="stats__result stats__result--unknown"></li>
            <li class="stats__result stats__result--unknown"></li>
            <li class="stats__result stats__result--unknown"></li>
            <li class="stats__result stats__result--unknown"></li>
            <li class="stats__result stats__result--unknown"></li>
            <li class="stats__result stats__result--unknown"></li>
            <li class="stats__result stats__result--unknown"></li>
          </ul>
        </td>
        <td class="result__points">×&nbsp;100</td>
        <td class="result__total">900</td>
      </tr>
    </table>
  <div class="win-table">
    <h1>Ваш счет</h1>
    <table class="result__table">
      <tr class="fast-bar">
        <td></td>
        <td class="result__extra">Бонус за скорость:</td>
        <td class="result__extra"><span class="result__count">1</span>&nbsp;<span class="stats__result stats__result--fast"></span></td>
        <td class="result__points">×&nbsp;50</td>
        <td class="result__total">50</td>
      </tr>
      <tr class="health-bar">
        <td></td>
        <td class="result__extra">Бонус за жизни:</td>
        <td class="result__extra"><span class="result__count">1</span>&nbsp;<span class="stats__result stats__result--heart"></span></td>
        <td class="result__points">×&nbsp;50</td>
        <td class="result__total">100</td>
      </tr>
      <tr class="slow-bar">
        <td></td>
        <td class="result__extra">Штраф за медлительность:</td>
        <td class="result__extra"><span class="result__count">1</span>&nbsp;<span class="stats__result stats__result--slow"></span></td>
        <td class="result__points">×&nbsp;50</td>
        <td class="result__total">-100</td>
      </tr>
      <tr>
        <td colspan="5" class="result__total  result__total--final">950</td>
      </tr>
    </table>
    </div>
  </div>`, `stats`);
export default element;
