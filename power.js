document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. CONFIGURAÇÕES ---
    const TELEFONE_BARBEARIA = "5511961460040"; // Formato internacional sem espaços ou traços
    const modal = document.getElementById('meuModal');
    const barbeiroImg = document.querySelector('.barbeiro-deslizante');

    // --- 2. ANIMAÇÃO DO BARBEIRO ---
    setTimeout(() => {
        if(barbeiroImg) barbeiroImg.classList.add('visivel');
    }, 100);

    // --- 3. REGRA DO BOTÃO RÁPIDO (HERO) ---
    // Este botão APENAS manda a saudação inicial, sem ler formulário.
    const btnWhatsHero = document.querySelector('#whatsapp input');
    if(btnWhatsHero) {
        btnWhatsHero.onclick = (e) => {
            e.preventDefault();
            const urlSimple = `https://wa.me/${TELEFONE_BARBEARIA}?text=Olá! Gostaria de agendar um horário na Barbearia Misael.`;
            window.open(urlSimple, '_blank');
        };
    }

    // --- 4. CONTROLE DO MODAL ---
    document.querySelectorAll('#abrirModal').forEach(btn => {
        btn.onclick = () => modal.showModal();
    });

    document.getElementById('fecharModal').onclick = () => modal.close();

    // --- 5. REGRA DO BOTÃO DO FORMULÁRIO (CONFIRMAR) ---
    // Este botão LÊ os inputs e monta a mensagem detalhada.
    const btnConfirmar = document.getElementById('confirmarAgendamento');
    if (btnConfirmar) {
        btnConfirmar.addEventListener('click', function() {
            // Captura os dados do formulário
            const nome = document.getElementById('nome').value;
            const dataRaw = document.getElementById('data').value;
            const hora = document.getElementById('hora').value;
            const msg = document.getElementById('msg').value;

            // Validação simples (já que type="button" não valida sozinho)
            if (!nome || !dataRaw || !hora) {
                alert("Por favor, preencha o nome, data e hora.");
                return;
            }

            // Formata a data para o padrão BR
            const dataFormatada = dataRaw.split('-').reverse().join('/');

            // Monta a mensagem detalhada
            let texto = `Novo Agendamento: \n`;
            texto += `${nome} \n`;
            texto += `${dataFormatada} \n`;
            texto += `${hora}h. \n`;
            texto += `${msg}.`;
            
            innerText = texto;

            // Abre o WhatsApp com os dados do FORMULÁRIO
            const urlDetalhada = `https://wa.me/${TELEFONE_BARBEARIA}?text=${encodeURIComponent(texto)}`;
            
            window.open(urlDetalhada, '_blank');
            modal.close();
        });
    }
});