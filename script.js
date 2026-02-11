const WHATSAPP_NUMBER = "5511999999999";

const steps = [...document.querySelectorAll('.step')];
const progressBar = document.getElementById('progressBar');
const stepsContainer = document.getElementById('stepsContainer');
const summaryBox = document.getElementById('summaryBox');
const whatsappBtn = document.getElementById('whatsappBtn');
const restartBtn = document.getElementById('restartBtn');

let currentStep = 0;
const answers = {
  device: '',
  habit: '',
  pain: '',
  services: '',
  wish: '',
};

const deviceMessages = {
  'Celular': 'Gostaria de testar 3 horas no celular.',
  'TV Box': 'Gostaria de testar 3 horas na TV Box.',
  'Smart TV': 'Gostaria de um teste gratuito por 3 horas na minha Smart TV.',
  'Computador': 'Gostaria de testar 3 horas no computador.',
  'Mais de um dispositivo': 'Gostaria de testar 3 horas em mais de um dispositivo.',
};

function renderStep() {
  steps.forEach((step, index) => {
    step.classList.toggle('step--active', index === currentStep);
  });

  const progress = ((currentStep + 1) / steps.length) * 100;
  progressBar.style.width = `${progress}%`;

  if (currentStep === 6) {
    renderSummary();
  }
}

function nextStep() {
  if (currentStep < steps.length - 1) {
    currentStep += 1;
    renderStep();
  }
}

function createWhatsappMessage() {
  const base = deviceMessages[answers.device] || 'Gostaria de testar 3 horas na EstelarPlay.';

  const detail = [
    `Meu perfil: ${answers.habit}.`,
    `Maior incômodo: ${answers.pain}.`,
    `Serviços pagos hoje: ${answers.services}.`,
    `O que mais quero: ${answers.wish}.`,
  ].join(' ');

  return `Olá, equipe EstelarPlay! ${base} ${detail}`;
}

function renderSummary() {
  summaryBox.innerHTML = `
    <p><strong>Dispositivo principal:</strong> ${answers.device}</p>
    <p><strong>Como assiste hoje:</strong> ${answers.habit}</p>
    <p><strong>Principal dor:</strong> ${answers.pain}</p>
    <p><strong>Serviços atuais:</strong> ${answers.services}</p>
    <p><strong>Prioridade:</strong> ${answers.wish}</p>
  `;

  const whatsappMessage = createWhatsappMessage();
  whatsappBtn.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMessage)}`;
}

stepsContainer.addEventListener('click', (event) => {
  const target = event.target;

  if (target.matches('[data-next]')) {
    nextStep();
    return;
  }

  if (target.matches('.option')) {
    const key = target.dataset.key;
    const value = target.dataset.value;

    answers[key] = value;
    nextStep();
  }
});

restartBtn.addEventListener('click', () => {
  currentStep = 0;
  Object.keys(answers).forEach((key) => {
    answers[key] = '';
  });
  renderStep();
});

renderStep();
