// ========================
// ELEMENTOS
// ========================
const dropdown = document.querySelector('.dropdown');
const btnSelect = document.querySelector('.btn-select');
const dropdownMenu = document.querySelector('.dropdown-menu');
const selectedText = document.querySelector('.selected-text');

const modal = document.getElementById('modal');
const newBtn = document.querySelector('.new-btn');

const modal2 = document.getElementById('modal2');
const checkBtn = document.querySelector('.checklist-btn');

const checklistContainer = modal2.querySelector('.checklist-list');

const apiURL = 'http://127.0.0.1:3000/compressores';
const checklistURL = 'http://127.0.0.1:3000/checklists';


// ========================
// MODAL GENÉRICO
// ========================
function setupModal(openBtn, modal, onOpen) {
    if (!openBtn || !modal) {
        console.error('Elemento não encontrado', { openBtn, modal });
        return;
    }

    const cancelBtn = modal.querySelector('.cancel');

    openBtn.addEventListener('click', () => {
        modal.classList.add('open');
        if (onOpen) onOpen();
    });

    cancelBtn.addEventListener('click', () => {
        modal.classList.remove('open');
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('open');
        }
    });
}


// ========================
// API - COMPRESSORES
// ========================
async function getCompressores() {
    try {
        const res = await fetch(apiURL);
        return await res.json();
    } catch (err) {
        console.error(err);
        return [];
    }
}


// ========================
// RENDER - COMPRESSORES
// ========================
function renderCompressores(data) {
    dropdownMenu.innerHTML = '';

    data.forEach(comp => {
        const item = document.createElement('div');
        item.classList.add('item');

        item.innerHTML = `
            <div class="item-content">
                <strong>${comp.modelo}</strong>
                <span class="item-sub">
                    ${comp.marca || 'Sem marca'} • ${comp.voltagem || '-'}V
                </span>
            </div>

            <div class="item-actions">
                <button class="edit-btn">✏️</button>
                <button class="delete-btn">🗑️</button>
            </div>
        `;

        item.addEventListener('click', () => {
            selectedText.textContent = comp.modelo;
            dropdown.classList.remove('open');
        });

        item.querySelector('.edit-btn').addEventListener('click', (e) => {
            e.stopPropagation();
            console.log('Editar', comp);
        });

        item.querySelector('.delete-btn').addEventListener('click', (e) => {
            e.stopPropagation();

            if (confirm(`Excluir ${comp.modelo}?`)) {
                item.remove();
            }
        });

        dropdownMenu.appendChild(item);
    });
}


// ========================
// CONTROLLER - COMPRESSORES
// ========================
async function loadCompressores() {
    dropdownMenu.innerHTML = '<div class="item">Carregando...</div>';

    const data = await getCompressores();

    if (!data.length) {
        dropdownMenu.innerHTML = '<div class="item">Nenhum compressor</div>';
        return;
    }

    renderCompressores(data);
}


// ========================
// API - CHECKLISTS
// ========================
async function getChecklists() {
    try {
        const res = await fetch(checklistURL);
        return await res.json();
    } catch (err) {
        console.error(err);
        return [];
    }
}


// ========================
// RENDER - CHECKLISTS
// ========================
function renderChecklists(data) {
    checklistContainer.innerHTML = '';

    data.forEach(check => {
        const item = document.createElement('div');
        item.classList.add('item');

        item.innerHTML = `
            <div class="item-content">
                <strong>${check.nome}</strong>
                <span class="item-sub">
                    ${check.descricao || 'Sem descrição'}
                </span>
            </div>
        `;

        checklistContainer.appendChild(item);
    });
}


// ========================
// CONTROLLER - CHECKLISTS
// ========================
async function loadChecklists() {
    checklistContainer.innerHTML = 'Carregando...';

    const data = await getChecklists();

    if (!data.length) {
        checklistContainer.innerHTML = 'Nenhum checklist encontrado';
        return;
    }

    renderChecklists(data);
}


// ========================
// EVENTOS
// ========================
btnSelect.addEventListener('click', () => {
    dropdown.classList.toggle('open');

    if (dropdownMenu.children.length === 0) {
        loadCompressores();
    }
});


// ========================
// INICIALIZAÇÃO DOS MODAIS
// ========================
setupModal(newBtn, modal);
setupModal(checkBtn, modal2, loadChecklists);