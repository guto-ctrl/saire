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

                // 👇 HTML bonitinho com mais infos
                item.innerHTML = `
                    <div class="item-content">
                        <strong>${comp.modelo}</strong>
                        <span class="item-sub">
                            ${comp.marca || 'Sem marca'} • ${comp.voltagem || '-'}V
                        </span>
                    </div>

                    <div class="item-actions">
                        <button class="edit-btn">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-square-pen-icon lucide-square-pen"><path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z"/></svg>
                        </button>
                        <button class="delete-btn">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash-icon lucide-trash"><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                        </button>
                    </div>
                `;

                // 👇 guarda tudo no elemento (pra usar depois)
                item.dataset.id = comp.id;
                item.dataset.modelo = comp.modelo;
                item.dataset.marca = comp.marca;
                item.dataset.voltagem = comp.voltagem;

                // Selecionar item (clicar fora dos botões)
                item.addEventListener('click', () => {
                    selectedText.textContent = comp.modelo;
                    dropdown.classList.remove('open');
                });

                // EDITAR
                item.querySelector('.edit-btn').addEventListener('click', (e) => {
                    e.stopPropagation(); // 👈 evita selecionar o item
                    console.log('Editar', comp);
                    // aqui você abre modal com dados
                });

                // EXCLUIR
                item.querySelector('.delete-btn').addEventListener('click', (e) => {
                    e.stopPropagation();
                    console.log('Excluir', comp);

                    // exemplo simples
                    if (confirm(`Excluir ${comp.modelo}?`)) {
                        item.remove();
                    }
                });

                dropdown.classList.remove('open');

            dropdownMenu.appendChild(item);
        });

        } catch (err) {
    dropdownMenu.innerHTML = '<div class="item">Erro ao carregar</div>';
    console.error(err);
}
    }
});

// MODAL
newBtn.onclick = () => modal.classList.add('open');
cancelBtn.onclick = () => modal.classList.remove('open');

modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.remove('open');
});