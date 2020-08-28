import appendDiv from '../../components/appendDiv';
const element = appendDiv(`
  <div class="arrows__wrap">
    <style>
      .arrows__wrap {
        position: absolute;
        top: 95px;
        left: 50%;
        margin-left: -56px;
      }
      .arrows__btn {
        background: none;
        border: 2px solid black;
        padding: 5px 20px;
      }
    </style>
    <button class="arrows__btn arrows__btn--prev"><&#8722;</button>
    <button class="arrows__btn arrows__btn--next">&#8722;></button>
  </div>
`);
export default element;
