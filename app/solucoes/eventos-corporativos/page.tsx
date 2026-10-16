import type { Metadata } from "next";
import { SolutionDetail } from "@/components/hub/solution-detail";

export const metadata: Metadata = { title: "Eventos corporativos", description: "Concepção e realização de eventos corporativos AFROPARCEIROS." };

export default function EventsPage() {
  return <SolutionDetail eyebrow="Eventos corporativos" title="Encontros que conectam pessoas e objetivos." copy="Concepção, curadoria e realização de eventos convencionais ou temáticos, alinhados à estratégia da organização." problem="Transformar uma agenda institucional em uma experiência coerente, relevante e bem articulada para o público." audience="Empresas, instituições, redes, equipes, comunidades e convidados." topic="evento-corporativo" cta="Quero planejar meu evento com a Afroparceiros" details={[
    { label: "Escopo", value: "Curadoria, conteúdo, programação e articulação de formatos adequados ao evento." },
    { label: "Modalidade", value: "Presencial, on-line ou híbrida, conforme o projeto." },
    { label: "Temática", value: "Eventos convencionais ou temáticos, sem limitar a atuação a uma única pauta." },
    { label: "Ocasiões", value: "Confraternizações, Natal, festas juninas, Dia das Mães ou dos Pais, SIPAT/CIPAT, convenções, ativações, semanas temáticas e encontros de liderança." },
    { label: "Escala e duração", value: "Pequenos e grandes encontros, com duração definida conforme o objetivo, o público e a programação." },
    { label: "Customização", value: "Conceito, linguagem, curadoria e programação construídos para o contexto de cada organização." },
    { label: "Produção", value: "Responsabilidades e estrutura técnica são definidas no escopo comercial." },
  ]} />;
}

