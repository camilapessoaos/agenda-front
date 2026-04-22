const API_URL = 'https://agenda-back-sb2t.onrender.com/api/entries';

const form = document.getElementById('entry-form');
const entryId = document.getElementById('entry-id');
const nome = document.getElementById('nome');
const contato = document.getElementById('contato');
const entriesList = document.getElementById('entries-list');
const message = document.getElementById('message');
const cancelEdit = document.getElementById('cancel-edit');
const formTitle = document.getElementById('form-title');
const reloadBtn = document.getElementById('reload-btn');

function showMessage(text, isError = false) {
  message.textContent = text;
  message.style.color = isError ? '#dc3545' : '#198754';
  setTimeout(() => {
    if (message.textContent === text) {
      message.textContent = '';
    }
  }, 3000);
}

function clearForm() {
  form.reset();
  entryId.value = '';
  formTitle.textContent = 'Novo contato';
  cancelEdit.classList.add('hidden');
}

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('pt-BR') + ' às ' + date.toLocaleTimeString('pt-BR');
}

function formatPhone(phone) {
  if (!phone) return '';
  const str = phone.toString();
  if (str.length === 11) {
    return `(${str.slice(0,2)}) ${str.slice(2,7)}-${str.slice(7)}`;
  } else if (str.length === 10) {
    return `(${str.slice(0,2)}) ${str.slice(2,6)}-${str.slice(6)}`;
  }
  return str;
}

async function loadEntries() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error('Erro ao carregar contatos');
    const entries = await response.json();

    if (!entries.length) {
      entriesList.innerHTML = '<p class="text-muted">Nenhum contato encontrado. Adicione o primeiro!</p>';
      return;
    }

    entriesList.innerHTML = entries.map(entry => `
      <div class="entry-item">
        <div class="entry-header">
          <h3 class="entry-title">📗 ${escapeHtml(entry.nome)}</h3>
          <span class="entry-date">Criado em: ${formatDate(entry.createdAt)}</span>
        </div>
        <div class="entry-contact">
          <strong>📞 Contato:</strong> 
          <a href="tel:${entry.contato}" class="contact-link">${formatPhone(entry.contato)}</a>
          <button onclick="copyPhone('${entry.contato}')" class="btn-copy">📋 Copiar</button>
        </div>
        ${entry.updatedAt !== entry.createdAt ? `<small class="text-muted">Atualizado em: ${formatDate(entry.updatedAt)}</small>` : ''}
        <div class="entry-buttons">
          <button onclick="editEntry('${entry._id}')" class="btn-edit">✏️ Editar</button>
          <button onclick="deleteEntry('${entry._id}')" class="btn-delete">🗑️ Excluir</button>
        </div>
      </div>
    `).join('');
  } catch (error) {
    console.error('Erro:', error);
    showMessage('Erro ao carregar contatos. Verifique se o servidor está rodando.', true);
    entriesList.innerHTML = '<p class="text-danger">❌ Erro ao carregar contatos. Certifique-se que o back-end está rodando em https://localhost:3000</p>';
  }
}

function escapeHtml(str) {
  if (!str) return '';
  return str.replace(/[&<>]/g, function(m) {
    if (m === '&') return '&amp;';
    if (m === '<') return '&lt;';
    if (m === '>') return '&gt;';
    return m;
  });
}

window.copyPhone = function(phone) {
  navigator.clipboard.writeText(phone.toString());
  showMessage('Número copiado para a área de transferência!');
};

async function saveEntry(data) {
  const id = entryId.value;
  const url = id ? `${API_URL}/${id}` : API_URL;
  const method = id ? 'PUT' : 'POST';

  const response = await fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Erro ao salvar');
  }

  return response.json();
}

window.editEntry = async function (id) {
  try {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) throw new Error('Erro ao carregar contato');
    const entry = await response.json();

    entryId.value = entry._id;
    nome.value = entry.nome;
    contato.value = entry.contato;

    formTitle.textContent = 'Editar contato';
    cancelEdit.classList.remove('hidden');
    showMessage('Editando contato. Faça as alterações e clique em Salvar.');
  } catch (error) {
    showMessage('Erro ao carregar contato para edição', true);
  }
};

window.deleteEntry = async function (id) {
  if (!confirm('Tem certeza que deseja excluir este contato? Esta ação não pode ser desfeita.')) return;

  try {
    const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    if (!response.ok) throw new Error('Erro ao excluir');
    
    showMessage('✅ Contato excluído com sucesso!');
    loadEntries();
    
    if (entryId.value === id) {
      clearForm();
    }
  } catch (error) {
    showMessage('Erro ao excluir contato', true);
  }
};

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const phoneNumber = parseInt(contato.value);
  if (isNaN(phoneNumber)) {
    showMessage('❌ Por favor, insira um número de telefone válido (apenas números)', true);
    return;
  }

  const data = {
    nome: nome.value.trim(),
    contato: phoneNumber
  };

  try {
    await saveEntry(data);
    showMessage(entryId.value ? '✅ Contato atualizado com sucesso!' : '✅ Contato criado com sucesso!');
    clearForm();
    loadEntries();
  } catch (error) {
    showMessage(`❌ Erro ao salvar: ${error.message}`, true);
  }
});

cancelEdit.addEventListener('click', () => {
  clearForm();
  showMessage('Edição cancelada.');
});

reloadBtn.addEventListener('click', () => {
  loadEntries();
  showMessage('Lista atualizada!');
});

if ('serviceWorker' in navigator) {
  window.addEventListener('load', async () => {
    try {
      await navigator.serviceWorker.register('./service-worker.js');
      console.log('Service Worker registrado com sucesso.');
    } catch (error) {
      console.log('Erro ao registrar Service Worker:', error);
    }
  });
}

clearForm();
loadEntries();