class RecintosZoo {
  constructor() {
    // Recintos existentes
    this.recintos = [
      { numero: 1, bioma: 'savana', tamanhoTotal: 10, animais: { MACACO: 3, LEAO: 1 } },
      { numero: 2, bioma: 'floresta', tamanhoTotal: 5, animais: {} },
      { numero: 3, bioma: 'savana e rio', tamanhoTotal: 7, animais: { GAZELA: 1 } },
      { numero: 4, bioma: 'rio', tamanhoTotal: 8, animais: {} },
      { numero: 5, bioma: 'savana', tamanhoTotal: 9, animais: { LEAO: 1 } }
    ];

    // Animais e suas características
    this.animais = {
      LEAO: { tamanho: 3, bioma: 'savana' },
      LEOPARDO: { tamanho: 2, bioma: 'savana' },
      CROCODILO: { tamanho: 3, bioma: 'rio' },
      MACACO: { tamanho: 1, bioma: 'savana ou floresta' },
      GAZELA: { tamanho: 2, bioma: 'savana' },
      HIPOPOTAMO: { tamanho: 4, bioma: 'savana ou rio' }
    };
  }

  analisaRecintos(tipoAnimal, quantidade) {

    if (!this.animais[tipoAnimal]) {
      return { erro: 'Animal inválido' };
    }

    if (typeof quantidade !== 'number' || quantidade <= 0 || !Number.isInteger(quantidade)) {
      return { erro: 'Quantidade inválida' };
    }

    const animalInfo = this.animais[tipoAnimal];
    const tamanhoNecessario = animalInfo.tamanho * quantidade;

    // Encontrar recintos viáveis
    const recintosViaveis = this.recintos
      .filter(recinto => {
  
        const biomasAdequados = animalInfo.bioma.split(' ou ').includes(recinto.bioma);
        if (!biomasAdequados) return false;

        const espacoOcupado = Object.entries(recinto.animais).reduce((sum, [esp, qtd]) => sum + (this.animais[esp]?.tamanho || 0) * qtd, 0);
        const espacoLivre = recinto.tamanhoTotal - espacoOcupado;

        return espacoLivre >= tamanhoNecessario;
      })
      .map(recinto => ({
        numero: recinto.numero,
        espacoLivre: recinto.tamanhoTotal - Object.entries(recinto.animais).reduce((sum, [esp, qtd]) => sum + (this.animais[esp]?.tamanho || 0) * qtd, 0),
        espacoTotal: recinto.tamanhoTotal
      }))
      .map(r => `Recinto ${r.numero} (espaço livre: ${r.espacoLivre} total: ${r.espacoTotal})`);

    
    if (recintosViaveis.length === 0) {
      return { erro: 'Não há recinto viável' };
    }

    return { recintosViaveis };
  }
}

export { RecintosZoo };
