const c = document.getElementById('myCanvas');
const ctx = c.getContext('2d');

const add_button = document.querySelector('#add_button');

c.height = window.innerHeight;
c.width = window.innerWidth;

// Перемещаем координаты в центр экрана
const moveToCenter = () => ctx.moveTo(c.clientWidth / 2, c.clientHeight / 2);

moveToCenter();

let counter = 1;

let nodeStyle = `
  background: lightgreen;
  position: absolute;
  left: 10px;
  top: 30px;
`;

let tree = {
  data: {
    id: 'div0'
  },
  level: 1,
  children: []
};

let dragged;

const showTree = () => console.log('Tree data', tree);

const insertNode = (tree, level, id, data) => {
  if (tree.level === level && tree.data.id === id) {
    tree.children.push({ data, level: level + 1, children: [] });
  } else if (tree.children.length) {
    tree.children.forEach(child => insertNode(child, level, id, data));
  }
};

const updateNode = (tree, id, data) => {
  if (tree.data.id === id) {
    tree.data = {
      ...tree.data,
      x: data.x,
      y: data.y
    };
    if (tree.children.length) {
      tree.children.map(child => {
        child.data.startX = data.x;
        child.data.startY = data.y;
      });
    }
  } else if (tree.children.length) {
    tree.children.forEach(child => updateNode(child, id, data));
  }
};

const drawTree = tree => {
  ctx.moveTo(tree.data.startX, tree.data.startY);
  ctx.lineTo(tree.data.x, tree.data.y);
  ctx.stroke();

  console.log('Data: ', tree.data, 'level: ', tree.level);

  if (tree.children.length) {
    tree.children.forEach(child => drawTree(child));
  } else {
    return;
  }
};

const createBlock = event => {
  let block = document.createElement('div');
  block.setAttribute('id', `div${counter}`);
  block.innerHTML = `<p>ID ${counter}</p>`;
  block.style = nodeStyle;
  block.setAttribute('draggable', 'true');
  // block.setAttribute('contenteditable', 'true');
  counter++;
  document.body.insertBefore(block, add_button);

  return block;
};

const addNodes = () =>
  add_button.addEventListener('click', event => {
    let block = createBlock(event);

    insertNode(tree, 1, 'div0', {
      x: event.x,
      y: event.y,
      id: block.id,
      startX: c.clientWidth / 2,
      startY: c.clientHeight / 2
    });

    block.addEventListener('click', event => {
      event.preventDefault();

      let childBlock0 = createBlock();

      insertNode(tree, 2, block.id, {
        x: event.x,
        y: event.y,
        id: childBlock0.id,
        startX: parseInt(block.style.left.toString()),
        startY: parseInt(block.style.top.toString())
      });

      childBlock0.addEventListener('click', event => {
        event.preventDefault();

        let childBlock1 = createBlock();

        insertNode(tree, 3, childBlock0.id, {
          x: event.x,
          y: event.y,
          id: childBlock1.id,
          startX: parseInt(childBlock0.style.left.toString()),
          startY: parseInt(childBlock0.style.top.toString())
        });
      });
    });
  });

// Добавление event listener'ов для десктопных устройств
document.addEventListener(
  'dragstart',
  event => {
    dragged = event.target;
    event.target.style.opacity = 0.5;
  },
  false
);

document.addEventListener(
  'dragend',
  event => {
    event.target.style.opacity = '';
  },
  false
);

document.addEventListener(
  'dragover',
  event => {
    event.preventDefault();

    let { x, y } = event;
    dragged.style.left = `${x}px`;
    dragged.style.top = `${y}px`;
  },
  false
);

document.addEventListener(
  'drop',
  event => {
    event.preventDefault();

    updateNode(tree, dragged.id, { x: event.x, y: event.y, id: dragged.id });
    ctx.clearRect(0, 0, c.clientWidth, c.clientWidth);
    ctx.beginPath();
    showTree();
    drawTree(tree);
  },
  false
);
// Добавление event listener'ов для мобильных устройств
const addDnd = object => {
  object.addEventListener(
    'touchstart',
    event => {
      // event.preventDefault();
      event.stopPropagation();

      dragged = event.target;
      console.log('touchstart', event);
      event.target.style.opacity = 0.5;
    },
    false
  );

  object.addEventListener(
    'touchmove',
    event => {
      // event.preventDefault();
      event.stopPropagation();

      let { clientX, clientY } = event.targetTouches[0];
      dragged.style.left = `${clientX}px`;
      dragged.style.top = `${clientY}px`;
    },
    false
  );

  object.addEventListener(
    'touchend',
    event => {
      // event.preventDefault();
      event.stopPropagation();
      event.target.style.opacity = '';

      console.log('touchend', event);
      let { clientX, clientY } = event.changedTouches[0];

      updateNode(tree, dragged.id, { x: clientX, y: clientY, id: dragged.id });
      ctx.clearRect(0, 0, c.clientWidth, c.clientWidth);
      ctx.beginPath();
      showTree();
      drawTree(tree);
    },
    false
  );
};

addNodes();

addDnd(window);
