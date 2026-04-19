// ==========================================
// 1. CONFIGURAÇÕES E ELEMENTOS
// ==========================================
const dropdown = document.querySelector('.dropdown');
const btnSelect = document.querySelector('.btn-select');
const dropdownMenu = document.querySelector('.dropdown-menu');
const selectedText = document.querySelector('.selected-text');

const modal = document.getElementById('modal');
const newBtn = document.querySelector('.new-btn');
const formCompressor = document.querySelector('.form'); // Form capturado

const modal2 = document.getElementById('modal2');
const checkBtn = document.querySelector('.checklist-btn');
const checklistContainer = modal2.querySelector('.checklist-list');

// Base URL para facilitar a manutenção
const API_BASE = 'http://127.0.0.1:3000';


// ==========================================
// 2. UTILITÁRIOS (Helpers)
// ==========================================
function setupModal(openBtn, modalElement, onOpen) {
    if (!openBtn || !modalElement) {
        console.error('Elemento não encontrado', { openBtn, modalElement });
        return;
    }

    const cancelBtn = modalElement.querySelector('.cancel');

    openBtn.addEventListener('click', () => {
        modalElement.classList.add('open');
        if (onOpen) onOpen();
    });

    cancelBtn.addEventListener('click', () => {
        modalElement.classList.remove('open');
    });

    modalElement.addEventListener('click', (e) => {
        if (e.target === modalElement) {
            modalElement.classList.remove('open');
        }
    });
}

// Fetcher genérico para evitar repetição de try/catch
async function fetchData(endpoint, options = {}) {
    try {
        const res = await fetch(`${API_BASE}${endpoint}`, options);
        if (!res.ok) throw new Error(`Erro na requisição: HTTP ${res.status}`);
        return await res.json();
    } catch (err) {
        console.error(`Falha ao comunicar com a API (${endpoint}):`, err);
        return null;
    }
}


// ==========================================
// 3. SERVIÇOS (API Calls)
// ==========================================
const api = {
    getCompressores: () => fetchData('/compressores'),
    
    // Serviço adicionado para lidar com o post do form
    createCompressor: (data) => fetchData('/compressores', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    }),
    
    getChecklists: () => fetchData('/checklists')
};


// ==========================================
// 4. RENDERIZAÇÃO (Views)
// ==========================================
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
                // Aqui você pode adicionar a chamada api.deleteCompressor futuramente
            }
        });

        dropdownMenu.appendChild(item);
    });
}

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


// ==========================================
// 5. CONTROLADORES (Controllers)
// ==========================================
async function loadCompressores() {
    dropdownMenu.innerHTML = '<div class="item">Carregando...</div>';

    const data = await api.getCompressores();

    if (!data || !data.length) {
        dropdownMenu.innerHTML = '<div class="item">Nenhum compressor</div>';
        return;
    }

    renderCompressores(data);
}

async function loadChecklists() {
    checklistContainer.innerHTML = 'Carregando...';

    const data = await api.getChecklists();

    if (!data || !data.length) {
        checklistContainer.innerHTML = 'Nenhum checklist encontrado';
        return;
    }

    renderChecklists(data);
}

// Handler de submissão do formulário adicionado
async function handleCreateCompressor(e) {
    e.preventDefault(); // Evita o recarregamento da página
    
    // Captura os dados de forma automática via FormData
    const formData = new FormData(formCompressor);
    const data = Object.fromEntries(formData);
    
    // Feedback visual no botão
    const btnSubmit = formCompressor.querySelector('.create');
    const originalText = btnSubmit.innerHTML;
    btnSubmit.innerHTML = 'Salvando...';
    btnSubmit.disabled = true;

    // Envia para a API
    const result = await api.createCompressor(data);

    // Restaura o botão
    btnSubmit.innerHTML = originalText;
    btnSubmit.disabled = false;

    if (result) {
        modal.classList.remove('open');
        formCompressor.reset(); // Limpa o form para o próximo uso
        loadCompressores(); // Recarrega a lista
        selectedText.textContent = data.modelo; // Já deixa o novo selecionado
    } else {
        alert('Erro ao cadastrar. Verifique se a API está rodando corretamente.');
    }
}


// ==========================================
// 6. EVENTOS E INICIALIZAÇÃO
// ==========================================
btnSelect.addEventListener('click', () => {
    dropdown.classList.toggle('open');

    // Carrega se estiver vazio ou se mostrar a mensagem de 'Nenhum compressor'
    if (dropdownMenu.children.length === 0 || dropdownMenu.textContent.includes('Nenhum')) {
        loadCompressores();
    }
});

// Evento de submit amarrado ao form
formCompressor.addEventListener('submit', handleCreateCompressor);

// Inicializa os modais
setupModal(newBtn, modal);
setupModal(checkBtn, modal2, loadChecklists);