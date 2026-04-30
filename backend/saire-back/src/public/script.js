// ==========================================
// 1. CONFIGURAÇÕES E ELEMENTOS
// ==========================================
const dropdown = document.querySelector('.dropdown')
const btnSelect = document.querySelector('.btn-select')
const dropdownMenu = document.querySelector('.dropdown-menu')
const selectedText = document.querySelector('.selected-text')

const modal = document.getElementById('modal')
const newBtn = document.querySelector('.new-btn')
const createBtn = modal.querySelector('.create')
const formCompressor = document.querySelector('.form') // Form capturado

const modal2 = document.getElementById('modal2')
const checkBtn = document.querySelector('.checklist-btn')
const checklistContainer = modal2.querySelector('.checklist-list')

const modalEditCompressor = document.getElementById('modal-edit-compressor')
const formEdit = modalEditCompressor.querySelector('.form-edit')
let editingId = null;

// Base URL para facilitar a manutenção
const API_BASE = 'http://127.0.0.1:3000'


// ==========================================
// 2. UTILITÁRIOS (Helpers)
// ==========================================
function setupModal(openBtn, modalElement, onOpen) {
    if (!modalElement) {
        console.error('Elemento não encontrado', { openBtn, modalElement })
        return
    }

    const cancelBtn = modalElement.querySelector('.cancel')

    if (openBtn) {
        openBtn.addEventListener('click', () => {
            modalElement.classList.add('open');
            if (onOpen) onOpen();
        });
    }

    cancelBtn?.addEventListener('click', () => {
        modalElement.classList.remove('open')
    })

    modalElement.addEventListener('click', (e) => {
        if (e.target === modalElement) {
            modalElement.classList.remove('open')
        }
    })

}

// Fetcher genérico para evitar repetição de try/catch
async function fetchData(endpoint, options = {}) {
    try {
        const res = await fetch(`${API_BASE}${endpoint}`, options)
        if (!res.ok) throw new Error(`Erro na requisição: HTTP ${res.status}`)
        // return await res.json()

        // Se não tiver conteúdo só retorna true
        if (res.status === 204) {
            return true
        }

        // Tenta converter depois de ter o body
        const text = await res.text();
        return text ? JSON.parse(text) : true;

    } catch (err) {
        console.error(`Falha ao comunicar com a API (${endpoint}):`, err)
        return null
    }
}


// ==========================================
// 3. SERVIÇOS (API Calls)
// ==========================================
const api = {

    // APIs pra gerenciar os compressores
    getCompressores: () => fetchData('/compressores'),

    // Serviço adicionado para lidar com o post do form
    createCompressor: (data) => fetchData('/compressores', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    }),

    deleteCompressor: (id) => fetchData(`/compressores/${id}`, {
        method: 'DELETE'
    }),

    updateCompressor: (id, data) => fetchData(`/compressores/${id}`, {
        method: 'PUT', // Posso trocar pra PATCH
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    }),

    getChecklists: () => fetchData('/checklists')
}


// ==========================================
// 4. RENDERIZAÇÃO (Views)
// ==========================================
function renderCompressores(data) {
    dropdownMenu.innerHTML = ''

    data.forEach(comp => {
        const item = document.createElement('div')
        item.classList.add('item')

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
        `

        item.addEventListener('click', () => {
            selectedText.textContent = comp.modelo
            dropdown.classList.remove('open')
        })

        item.querySelector('.edit-btn').addEventListener('click', (e) => {
            e.stopPropagation()
            openEditModal(comp)
            console.log(data)
        })

        item.querySelector('.delete-btn').addEventListener('click', (e) => {
            e.stopPropagation()

            if (confirm(`Excluir ${comp.modelo}?`)) {
                // item.remove()
                deleteCompressor(comp.id)
            }
        })
        dropdownMenu.appendChild(item)
    })
}

function renderChecklists(data) {
    checklistContainer.innerHTML = ''

    data.forEach(check => {
        const item = document.createElement('div')
        item.classList.add('item')

        item.innerHTML = `
            <div class="item-content">
                <strong>${check.nome}</strong>
                <span class="item-sub">
                    ${check.descricao || 'Sem descrição'}
                </span>
            </div>
        `

        checklistContainer.appendChild(item)
    })
}


// ==========================================
// 5. CONTROLADORES (Controllers)
// ==========================================
async function loadCompressores() {
    dropdownMenu.innerHTML = '<div class="item">Carregando...</div>'

    const data = await api.getCompressores()

    if (!data || !data.length) {
        dropdownMenu.innerHTML = '<div class="item">Nenhum compressor</div>'
        return
    }

    renderCompressores(data)
}

async function loadChecklists() {
    checklistContainer.innerHTML = 'Carregando...'

    const data = await api.getChecklists()

    if (!data || !data.length) {
        checklistContainer.innerHTML = 'Nenhum checklist encontrado'
        return
    }

    renderChecklists(data)
}

// Handler de submissão do formulário adicionado
async function handleCreateCompressor(e) {
    e.preventDefault() // Evita o recarregamento da página

    // Captura os dados de forma automática via FormData
    const formData = new FormData(formCompressor)
    const rawData = Object.fromEntries(formData)
    const data = {
        ...rawData,
        frequencia: rawData.frequencia ? Number(rawData.frequencia) : null,
        corrente: rawData.corrente ? Number(rawData.corrente) : null,
        correnteBloqueadoY: rawData.correnteBloqueadoY ? Number(rawData.correnteBloqueadoY) : null,
        correnteBloqueadoYY: rawData.correnteBloqueadoYY ? Number(rawData.correnteBloqueadoYY) : null,
        volumeDeslocamento: rawData.volumeDeslocamento ? Number(rawData.volumeDeslocamento) : null,
        rotacao: rawData.rotacao ? Number(rawData.rotacao) : null
    }

    // Feedback visual no botão
    const btnSubmit = formCompressor.querySelector('.create')
    const originalText = btnSubmit.innerHTML
    btnSubmit.innerHTML = 'Salvando...'
    btnSubmit.disabled = true

    console.log(data)

    // Envia para a API
    const result = await api.createCompressor(data)

    // Restaura o botão
    btnSubmit.innerHTML = originalText
    btnSubmit.disabled = false

    if (result) {
        modal.classList.remove('open')
        formCompressor.reset() // Limpa o form para o próximo uso
        loadCompressores() // Recarrega a lista
        selectedText.textContent = data.modelo // Já deixa o novo selecionado
    } else {
        alert('Erro ao cadastrar. Verifique se a API está rodando corretamente.')
    }
}

// Handler that delete the selected compressor
async function deleteCompressor(id) {
    const result = await api.deleteCompressor(id)

    if (result) {
        console.log(`Compressor id:${id} deletado`)
        loadCompressores()
    } else {
        alert('Erro ao deletar compressor')
    }
}

// This handler edits the compressor by id
async function openEditModal(comp) {
    editingId = comp.id;

    formEdit.modelo.value = comp.modelo || '';
    formEdit.marca.value = comp.marca || '';
    formEdit.voltagem.value = comp.voltagem ?? '';
    formEdit.frequencia.value = comp.frequencia ?? '';
    formEdit.corrente.value = comp.corrente ?? '';
    formEdit.correnteBloqueadoY.value = comp.correnteBloqueadoY ?? '';
    formEdit.correnteBloqueadoYY.value = comp.correnteBloqueadoYY ?? '';
    formEdit.volumeDeslocamento.value = comp.volumeDeslocamento ?? '';
    formEdit.rotacao.value = comp.rotacao ?? '';

    modalEditCompressor.classList.add('open');
}

// ==========================================
// 6. EVENTOS E INICIALIZAÇÃO
// ==========================================
btnSelect.addEventListener('click', () => {
    dropdown.classList.toggle('open')

    // Carrega se estiver vazio ou se mostrar a mensagem de 'Nenhum compressor'
    if (dropdownMenu.children.length === 0 || dropdownMenu.textContent.includes('Nenhum')) {
        loadCompressores()
    }
})

// Evento de submit amarrado ao form
formCompressor.addEventListener('submit', handleCreateCompressor)

// Evento pra editar o compressor
formEdit.addEventListener('submit', async (e) => {
    e.preventDefault()

    const formData = new FormData(formEdit)
    const rawData = Object.fromEntries(formData)

    const data = {
        ...rawData,
        frequencia: rawData.frequencia ? Number(rawData.frequencia) : null,
        corrente: rawData.corrente ? Number(rawData.corrente) : null,
        correnteBloqueadoY: rawData.correnteBloqueadoY ? Number(rawData.correnteBloqueadoY) : null,
        correnteBloqueadoYY: rawData.correnteBloqueadoYY ? Number(rawData.correnteBloqueadoYY) : null,
        volumeDeslocamento: rawData.volumeDeslocamento ? Number(rawData.volumeDeslocamento) : null,
        rotacao: rawData.rotacao ? Number(rawData.rotacao) : null
    }
    const result = await api.updateCompressor(editingId, data)

    if (result) {
        modalEditCompressor.classList.remove('open')
        loadCompressores()
    } else {
        alert('Erro ao atualizar compressor')
    }
})

// Inicializa os modais
setupModal(newBtn, modal)
setupModal(checkBtn, modal2, loadChecklists)
setupModal(null, modalEditCompressor)