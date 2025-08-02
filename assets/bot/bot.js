import { dialogueFlow } from './data.js';

// Elementos DOM
const chatMessages = document.getElementById('chatMessages');
const chatOptions = document.getElementById('chatOptions');
const chatContainer = document.getElementById('chatContainer');

// Estado global
const state = {
  current: 'start',
  session: {
    sampleCount: 0,
    showUpgrade: false
  },
  isTyping: false
};

// Funções utilitárias
const updateWallpaper = () => {
  const width = window.innerWidth;
  chatContainer.className = 'chat-container ';
  if (width <= 600) chatContainer.classList.add('mobile-wallpaper');
  else if (width <= 1200) chatContainer.classList.add('tablet-wallpaper');
  else chatContainer.classList.add('desktop-wallpaper');
};

const scrollToBottom = () => {
  chatMessages.scrollTop = chatMessages.scrollHeight;
};

// Gerenciamento de mensagens
const showTyping = () => {
  if (state.isTyping) return null;
  state.isTyping = true;

  const typing = document.createElement('div');
  typing.className = 'message-typing';
  typing.innerHTML = `<div class="typing-dots"><span></span><span></span><span></span></div>`;
  chatMessages.appendChild(typing);
  scrollToBottom();
  return typing;
};

const hideTyping = (element) => {
  if (element && element.parentNode) {
    element.remove();
  }
  state.isTyping = false;
};

const addMessage = (text, isUser = false) => {
  const msg = document.createElement('div');
  msg.className = isUser ? 'message user' : 'message bot';
  msg.textContent = text;
  chatMessages.appendChild(msg);
  scrollToBottom();
};

const addBotMessage = async (text) => {
  const typing = showTyping();
  
  return new Promise(resolve => {
    setTimeout(() => {
      hideTyping(typing);
      addMessage(text);
      resolve();
    }, 1000);
  });
};

// Gerenciamento de opções
const clearOptions = () => {
  chatOptions.innerHTML = '';
};

const createOptionButton = (option) => {
  const button = document.createElement('button');
  button.className = 'option-button';
  button.textContent = option.label;
  
  button.addEventListener('click', () => {
    if (option.action) {
      option.action(state.session);
    }
    
    if (option.link) {
      window.open(option.link, '_blank');
    } else if (option.next) {
      navigateTo(option.next);
    }
  });
  
  return button;
};

const showOptions = () => {
  clearOptions();
  const flowState = dialogueFlow[state.current];
  if (!flowState) return;

  let options = [];
  if (typeof flowState.options === 'function') {
    options = flowState.options(state.session);
  } else {
    options = flowState.options || [];
  }

  options.forEach(option => {
    chatOptions.appendChild(createOptionButton(option));
  });

  addNavigationButtons();
};

const addNavigationButtons = () => {
  const nav = document.createElement('div');
  nav.className = 'global-navigation';

  const createNavButton = (text, action) => {
    const button = document.createElement('button');
    button.className = 'nav-button';
    button.textContent = text;
    button.addEventListener('click', action);
    return button;
  };

  nav.appendChild(createNavButton('📱 Ir para WhatsApp', () => {
    window.open('https://wa.me/5511956766882', '_blank');
  }));

  nav.appendChild(createNavButton('↩️ Voltar ao início', () => {
    navigateTo('start');
  }));

  nav.appendChild(createNavButton('📦 Ver pacotes', () => {
    navigateTo('pacotes');
  }));

  chatOptions.appendChild(nav);
};

// Navegação principal
const navigateTo = async (nextState) => {
  state.current = nextState;
  const flowState = dialogueFlow[nextState];
  
  if (!flowState) {
    await addBotMessage("Ops! Algo deu errado. Vamos recomeçar?");
    return navigateTo('start');
  }

  const message = typeof flowState.message === 'function'
    ? flowState.message(state.session)
    : flowState.message;

  await addBotMessage(message);

  if (nextState === 'amostras') {
    await handleSampleFlow();
  } else {
    showOptions();
  }
};

// Fluxo especial de amostras
const handleSampleFlow = async () => {
  if (state.session.sampleCount === 0) {
    // Mostrar imagem da amostra
    const img = document.createElement('img');
    img.src = 'amostras/sample1.jpg';
    img.alt = 'Amostra exclusiva';
    img.className = 'sample-image';
    chatMessages.appendChild(img);
    scrollToBottom();

    await new Promise(resolve => setTimeout(resolve, 1500));
    await addBotMessage("E aí, gostou? 😏 Isso é só o comecinho...");
    // Atualiza o estado para mostrar que já viu a amostra
    state.session.sampleCount = 1;
  }
  
  showOptions();
};

// Inicialização
const initChat = async () => {
  updateWallpaper();
  window.addEventListener('resize', updateWallpaper);

  // Inicia com a mensagem de boas-vindas
  await addBotMessage(dialogueFlow.start.message);
  showOptions();
};

// Iniciar quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', initChat);