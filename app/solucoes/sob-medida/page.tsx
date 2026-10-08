import type { Metadata } from "next";
import { SolutionDetail } from "@/components/hub/solution-detail";

export const metadata: Metadata = { title: "Soluções sob medida", description: "Soluções especiais construídas pela AFROPARCEIROS." };

export default function CustomSolutionsPage() {
  return <SolutionDetail eyebrow="Soluções sob medida" title="Um desafio pode pedir um caminho novo." copy="Construções personalizadas que combinam competências e frentes do ecossistema AFROPARCEIROS." problem="Responder a necessidades que não cabem em um formato pronto e exigem combinação de conteúdo, cultura, curadoria, experiência ou projeto." audience="Organizações e instituições que precisam de uma resposta desenhada para seu contexto." topic="solucao-sob-medida" cta="Conte-nos o desafio da sua organização" details={[
    { label: "Ponto de partida", value: "Briefing sobre objetivo, público, contexto, prazo e resultado esperado." },
    { label: "Construção", value: "Combinação de formatos e competências conforme a necessidade apresentada." },
    { label: "Escopo", value: "Entregas, responsabilidades, cronograma e investimento definidos na proposta." },
    { label: "Acompanhamento", value: "Alinhamentos comerciais e operacionais durante a construção." },
  ]} />;
}

