import type { Metadata } from "next";
import { SolutionDetail } from "@/components/hub/solution-detail";

export const metadata: Metadata = { title: "Treinamentos e workshops", description: "Formações AFROPARCEIROS para equipes e organizações." };

export default function WorkshopsPage() {
  return <SolutionDetail eyebrow="Treinamentos e workshops" title="Aprendizado que se transforma em prática." copy="Jornadas formativas conectadas aos desafios, ao repertório e à realidade de cada equipe." problem="Criar linguagem comum, ampliar repertório e apoiar mudanças que precisam continuar depois do encontro." audience="Empresas, instituições, lideranças, equipes, educadores e grupos profissionais." topic="treinamento" details={[
    { label: "Formato", value: "Workshop, treinamento ou jornada formativa, definidos conforme o objetivo." },
    { label: "Modalidade", value: "Presencial, on-line ou híbrida, conforme viabilidade e contexto." },
    { label: "Duração", value: "Definida na proposta de acordo com o conteúdo e a profundidade necessária." },
    { label: "Customização", value: "Briefing, linguagem e recortes alinhados com a organização." },
  ]} />;
}

