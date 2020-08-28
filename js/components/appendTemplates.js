const appendTemplates = (html,id) => {
  const element = document.createElement('template');
  element.id = id;
  element.innerHTML = html;
  return element
}

export default appendTemplates;
