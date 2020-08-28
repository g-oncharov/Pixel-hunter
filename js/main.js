let templateLinks = [];
import createArrAttr from './components/createArrAttr';
import toggleTemplates from './components/toggleTemplates';
import innerBlock from './components/innerBlock';
import handlerСreation from './components/handlerСreation';
import imageLogic from './components/imageLogic';
innerBlock();
createArrAttr(templateLinks, 'template', 'id');
handlerСreation('intro');
