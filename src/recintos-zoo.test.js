// src/recintos-zoo.test.js
import { RecintosZoo } from './recintos-zoo';

describe('RecintosZoo', () => {
  let zoo;

  beforeEach(() => {
    zoo = new RecintosZoo();
  });

  test('Deve rejeitar animal inválido', () => {
    const resultado = zoo.analisaRecintos('UNICORNIO', 1);
    expect(resultado.erro).toBe('Animal inválido');
  });

  test('Deve rejeitar quantidade inválida', () => {
    const resultado1 = zoo.analisaRecintos('MACACO', -1);
    const resultado2 = zoo.analisaRecintos('MACACO', 0);
    expect(resultado1.erro).toBe('Quantidade inválida');
    expect(resultado2.erro).toBe('Quantidade inválida');
  });

  test('Não deve encontrar recintos para 10 macacos', () => {
    const resultado = zoo.analisaRecintos('MACACO', 10);
    expect(resultado.erro).toBe('Não há recinto viável');
  });

  test('Deve encontrar recinto para 1 crocodilo', () => {
    const resultado = zoo.analisaRecintos('CROCODILO', 1);
    expect(resultado.erro).toBeFalsy();
    expect(resultado.recintosViaveis[0]).toBe('Recinto 4 (espaço livre: 8 total: 8)');
    expect(resultado.recintosViaveis.length).toBe(1);
  });

  test('Deve encontrar recintos para 2 macacos', () => {
    const resultado = zoo.analisaRecintos('MACACO', 2);
    expect(resultado.erro).toBeFalsy();
    expect(resultado.recintosViaveis[0]).toBe('Recinto 1 (espaço livre: 5 total: 10)');
    expect(resultado.recintosViaveis[1]).toBe('Recinto 2 (espaço livre: 3 total: 5)');
    expect(resultado.recintosViaveis[2]).toBe('Recinto 3 (espaço livre: 2 total: 7)');
    expect(resultado.recintosViaveis.length).toBe(3);
  });

  test('Deve encontrar recintos para 2 hipopótamos', () => {
    const resultado = zoo.analisaRecintos('HIPOPOTAMO', 2);
    expect(resultado.erro).toBeFalsy();
    expect(resultado.recintosViaveis[0]).toBe('Recinto 3 (espaço livre: 1 total: 7)');
    expect(resultado.recintosViaveis.length).toBe(1);
  });

  test('Deve rejeitar 1 macaco em um recinto vazio', () => {
    const resultado = zoo.analisaRecintos('MACACO', 1);
    expect(resultado.erro).toBe('Não há recinto viável');
  });

  test('Deve encontrar recintos para 1 leão', () => {
    const resultado = zoo.analisaRecintos('LEAO', 1);
    expect(resultado.erro).toBeFalsy();
    expect(resultado.recintosViaveis[0]).toBe('Recinto 1 (espaço livre: 7 total: 10)');
    expect(resultado.recintosViaveis[1]).toBe('Recinto 5 (espaço livre: 6 total: 9)');
    expect(resultado.recintosViaveis.length).toBe(2);
  });
});
