export function formatCpf(cpf: string | undefined) {
  if (cpf) {
    const cpfParsed = `${cpf.slice(0, 3)}.${cpf.slice(3, 6)}.${cpf.slice(
      6,
      9
    )}-${cpf.slice(9)}`;
    return cpfParsed;
  }

  return cpf;
}
