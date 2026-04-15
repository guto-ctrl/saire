const dropdown = document.querySelector('.dropdown');
const btn_select = dropdown.querySelector('.btn-select');
const dropdown_menu = dropdown.querySelector('.dropdown-menu');
const apiURL = 'http://localhost:3000/compressores'

const new_menu = document.querySelector('.new-menu')
const new_menu_content = document.querySelector('.new-menu-content')
const new_btn = document.querySelector('.new-btn')
const new_close_btn = document.querySelector('.new-close-btn')

btn_select.addEventListener('click', async () => {
  dropdown.classList.toggle('open');
  console.log('Botão Selecionar')
  // evita ficar chamando toda hora igual descontrolado
  if (dropdown_menu.children.length === 0) {
    dropdown_menu.innerHTML = '<div class="item">Carregando...</div>';

    try {
      const res = await fetch(apiURL);
      const data = await res.json();

      renderItems(data);
    } catch (err) {
      dropdown_menu.innerHTML = '<div class="item">Erro ao carregar</div>';
      console.error(err);
    }
  }
});

new_btn.addEventListener('click', async () => {
    console.log('Botão Novo')
    new_menu.classList.toggle('open');
})
new_close_btn.addEventListener('click', async () => {
    new_menu.classList.remove('open')
})
new_menu.addEventListener('click', (e) => {
    if (e.target === new_menu) {
        new_menu.classList.remove('open');
    }
});

function renderItems(compressores) {
  dropdown_menu.innerHTML = '';

  compressores.forEach(comp => {
    const item = document.createElement('div');
    item.classList.add('item');
    item.textContent = comp.nome; // ajusta conforme sua API

    item.addEventListener('click', () => {
      btn_select.textContent = comp.nome;
      dropdown.classList.remove('open');
    });

    menu.appendChild(item);
  });
}