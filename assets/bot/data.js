export const dialogueFlow = {
  start: {
    message: `✨ Oiê, que gostosura te ver por aqui... 😘\n\nTá procurando prazer, curiosidade ou quer ir direto ao ponto?`,
    options: [
      { label: "🔥 Quero Pacotes Quentes", next: "pacotes" },
      { label: "👀 Ver Amostra Grátis", next: "amostras" },
      { label: "💬 Conversar com Tata", next: "conversa_venda" }
    ]
  },

  conversa_venda: {
    message: `Hmmm... adoro quem puxa papo! 💋\n\nTirei boas fotos novas que vão te deixar em chamas...\nQuer ver ou vai resistir? 😈`,
    options: [
      { label: "😳 Mostra só um...", next: "amostras" },
      { label: "💰 Mostra os pacotes logo", next: "pacotes" },
      { label: "🤭 Vamos só conversar", next: "conversa_casual" }
    ]
  },

  amostras: {
    message: (session) => {
      return session.sampleCount > 0
        ? `🥵 Já foi a única amostra grátis, amor...\n\nSe quiser ver mais, só escolhendo um dos meus pacotes deliciosos.`
        : `👀 Olha só essa amostrinha, só pra te deixar com vontade...`;
    },
    options: (session) => {
      if (session.sampleCount === 0) {
        return [{
          label: "😈 Quero ver!",
          next: "amostras",
          action: (s) => { s.sampleCount = 1; }
        }];
      }
      return [
        { label: "💎 Quero o pacote completo", next: "pacotes_recomendados" },
        { label: "💬 Falar com Tata", next: "conversa_venda" },
        { label: "📦 Ver todos pacotes", next: "pacotes" }
      ];
    }
  },

  pacotes_recomendados: {
    message: `❤️ Já que curtiu o gostinho... imagina o banquete inteiro?\n\nRecomendo o pacote mais picante pra você se acabar de prazer!`,
    options: [
      { label: "🔥 Me mostra agora!", next: "diamante" },
      { label: "📦 Ver todos os pacotes", next: "pacotes" },
      { label: "💬 Falar com Tata", next: "conversa_venda" }
    ]
  },

  pacotes: {
    message: `💖 Meus pacotes são um convite ao vício...\n\nEscolhe o que mais combina com seu desejo:`,
    options: [
      { label: "🥉 Pacote Bronze", next: "bronze" },
      { label: "🥈 Pacote Prata", next: "prata" },
      { label: "🏅 Pacote Platina", next: "platina" },
      { label: "💎 Pacote Diamante", next: "diamante" },
      { label: "📞 Chamadas Ao Vivo", next: "chamadas" }
    ]
  },

  bronze: {
    message: `🥉 BRONZE - Pra começar com fogo! 🔥\n\n✅ 30 fotos exclusivas\n✅ 35 vídeos quentes\n\n💋 Masturbações, brinquedos e muito mais\n\n💰 Só R$20\n\nPronto pra se perder nisso tudo?`,
    options: [
      {
        label: "💬 Quero esse agora!",
        link: "https://wa.me/5511956766882?text=Quero%20o%20PACOTE%20BRONZE%2C%20me%20manda%20tudooo!%20🔥",
        external: true
      },
      { label: "🥈 Ver pacote prata", next: "prata", action: (s) => s.showUpgrade = true },
      { label: "🏠 Voltar ao início", next: "start" }
    ]
  },

  prata: {
    message: (s) => {
      const upgrade = s?.showUpgrade
        ? `\n\n🎁 UPGRADE DISPONÍVEL: Vai pro PLATINA por só R$10 a mais!`
        : "";
      return `🥈 PRATA - Experiência completa 😍\n\n✅ 40 fotos exclusivas\n✅ 45 vídeos HD\n\n💦 Plug anal, oral, lingerie...\n💰 R$35${upgrade}`;
    },
    options: (s) => {
      const opts = [
        {
          label: "💬 Comprar agora!",
          link: "https://wa.me/5511956766882?text=Quero%20o%20pack%20PRATA%20agora%2C%20me%20deixa%20loucooo!%20😈",
          external: true
        }
      ];

      if (s?.showUpgrade) {
        opts.push({ label: "🏅 Quero o PLATINA", next: "platina" });
      }

      opts.push({ label: "📦 Outros pacotes", next: "pacotes" });

      return opts;
    }
  },

  platina: {
    message: `🏅 PLATINA - É conteúdo VIP 🔐\n\n✅ 60 vídeos insanos\n✅ 50 fotos selvagens\n\n👀 Fisting, dupla penetração, POV, etc\n\n💰 R$45\n\nÉ pra quem tem coragem.`,
    options: [
      {
        label: "💬 Quero tudo!",
        link: "https://wa.me/5511956766882?text=Quero%20o%20PACOTE%20PLATINA%20com%20urgência!%20🔥",
        external: true
      },
      { label: "💎 Quero o DIAMANTE", next: "diamante" },
      { label: "🏠 Voltar ao início", next: "start" }
    ]
  },

  diamante: {
    message: `💎 DIAMANTE - O MAIS COMPLETO 💎\n\n✅ 100 vídeos + 80 fotos EXTRAS\n✅ Bastidores, fetiches pesados, sem censura\n✅ Chamada de voz ou vídeo grátis (surpresa 😘)\n\n💰 Apenas R$60\n\nSe é pra ter tudo... pega logo o DIAMANTE.`,
    options: [
      {
        label: "💬 Comprar agora mesmo",
        link: "https://wa.me/5511956766882?text=Chega%20de%20esperar%2C%20quero%20o%20PACOTE%20DIAMANTE!%20💎🔥",
        external: true
      },
      { label: "📦 Outros pacotes", next: "pacotes" },
      { label: "🏠 Início", next: "start" }
    ]
  },

  chamadas: {
    message: `📞 CHAMADAS AO VIVO 📞\n\nQuer me ver, ouvir minha voz, ou talvez algo mais ousado ao vivo?\n\n💋 Faço chamadas privadas via vídeo ou áudio — totalmente safadinhas 😈`,
    options: [
      {
        label: "💬 Marcar chamada agora",
        link: "https://wa.me/5511956766882?text=Quero%20uma%20chamada%20ao%20vivo%2C%20me%20manda%20infos!%20💦",
        external: true
      },
      { label: "📦 Ver pacotes", next: "pacotes" },
      { label: "🏠 Início", next: "start" }
    ]
  },

  conversa_casual: {
    message: (s) => {
      return s?.sampleCount
        ? `Adoro esse clima leve... mas não esquece:\n\nTem muito mais me esperando nos pacotes 🔥`
        : `Hmm... curtir um papo é bom, mas meus conteúdos são melhores ainda. Vamos ver só um? 😘`;
    },
    options: (s) => {
      const opts = [];

      if (s?.sampleCount) {
        opts.push({ label: "💰 Ver pacotes", next: "pacotes" });
      } else {
        opts.push({ label: "👀 Ver uma amostra", next: "amostras" });
      }

      opts.push({ label: "💬 Continuar conversando", next: "conversa_casual" });

      return opts;
    }
  },

  final_natural: {
    message: `Foi uma delícia esse momento com você... ❤️\n\nMas amor, se quiser MESMO me ter de verdade, os pacotes estão te esperando...\n\nTô te esperando no WhatsApp 😘`,
    options: [
      {
        label: "💬 Falar com Tata agora",
        link: "https://wa.me/5511956766882",
        external: true
      },
      { label: "🔄 Recomeçar conversa", next: "start" }
    ]
  }
};