export function idGenerator(): number {
  const tamanhoMinimo = 4;
  const tamanhoMaximo = 8;
  const tamanho =
    Math.floor(Math.random() * (tamanhoMaximo - tamanhoMinimo + 1)) +
    tamanhoMinimo;

  let id = '';
  const digitosNumericos = '0123456789';

  for (let i = 0; i < tamanho; i++) {
    const indiceAleatorio = Math.floor(Math.random() * digitosNumericos.length);
    id += digitosNumericos.charAt(indiceAleatorio);
  }

  return Number(id);
}
