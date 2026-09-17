export const solutionAreas = [
  {
    title: "Palestras",
    copy: "Conteúdos para ampliar repertórios, provocar conversas e apoiar mudanças nas organizações.",
    href: "/palestras",
  },
  {
    title: "Treinamentos",
    copy: "Jornadas de formação conectadas aos desafios e ao contexto de cada equipe.",
    href: "/contato?assunto=treinamento",
  },
  {
    title: "Eventos corporativos",
    copy: "Programações que aproximam cultura, conhecimento e objetivos institucionais.",
    href: "/contato?assunto=evento-corporativo",
  },
  {
    title: "Soluções sob medida",
    copy: "Construções personalizadas a partir da necessidade apresentada pela organização.",
    href: "/contato?assunto=solucao-sob-medida",
  },
] as const;

export const experienceAreas = [
  "Experiências musicais",
  "Talk shows e conversas",
  "Arte + conhecimento",
  "Intervenções culturais",
  "Experiências afrocentradas",
  "Vivências para equipes",
  "Programações para datas e agendas corporativas",
] as const;

export const projectFilters = [
  "Cultura",
  "Educação",
  "Música",
  "Literatura",
  "Juventude",
  "Território",
  "Formação",
  "Diversidade",
] as const;

export const projectNames = [
  "Feijhôada",
  "Liga Nacional da Igualdade",
  "Okan Poético Olodum",
  "Lavagem do Guará",
  "Tesouras do Futuro",
  "Circuito DNA Batalhas",
  "DNA Guetos Podcast",
  "Quilombo Guetos",
  "Carnaval Internacional",
  "Peça Guetos",
] as const;

export const commercialTopics = [
  ["palestra", "Contratar palestra"],
  ["treinamento", "Contratar treinamento"],
  ["evento-corporativo", "Realizar evento corporativo"],
  ["solucao-sob-medida", "Soluções sob medida"],
  ["experiencia", "Contratar experiência"],
  ["artista", "Contratar artista"],
  ["patrocinio", "Patrocinar projeto"],
  ["levar-projeto", "Levar projeto para minha cidade/empresa"],
  ["loja", "DNA Guetos/Loja"],
  ["livro", "Comprar livro"],
  ["imprensa", "Imprensa"],
  ["parceria", "Propor parceria"],
  ["outro", "Outro assunto"],
] as const;

export function projectSlug(name: string) {
  return name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}
