const dropdown = document.querySelector('.dropdown');
const btnSelect = document.querySelector('.btn-select');
const dropdownMenu = document.querySelector('.dropdown-menu');
const selectedText = document.querySelector('.selected-text');

const modal = document.getElementById('modal');
const newBtn = document.querySelector('.new-btn');
const cancelBtn = document.querySelector('.cancel');

const apiURL = 'http://127.0.0.1:3000/compressores';

// DROPDOWN
btnSelect.addEventListener('click', async () => {
    dropdown.classList.toggle('open');

    if (dropdownMenu.children.length === 0) {
        dropdownMenu.innerHTML = '<div class="item">Carregando...</div>';

        try {
            const res = await fetch(apiURL);
            const data = await res.json();

            dropdownMenu.innerHTML = '';

            data.forEach(comp => {
                const item = document.createElement('div');
                item.classList.add('item');
                item.textContent = comp.nome;

                item.onclick = () => {
                    selectedText.textContent = comp.nome;
                    dropdown.classList.remove('open');
                };

                dropdownMenu.appendChild(item);
            });

        } catch {
            dropdownMenu.innerHTML = '<div class="item">Erro ao carregar</div>';
        }
    }
});

// MODAL
newBtn.onclick = () => modal.classList.add('open');
cancelBtn.onclick = () => modal.classList.remove('open');

modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.remove('open');
});