const imageBase = "https://images.yampi.me/assets/stores/afroparceiros/uploads/images/";

type ColorVariantSource = {
  id: number;
  colors: string[];
  images: Record<string, string>;
};

const sources: ColorVariantSource[] = [
  {
    id: 43721859,
    colors: ["Preto", "Branco", "Rosa"],
    images: {
      Preto: "camisa-dna-guetos-p-preto-697faee1246f7-large.png",
      Branco: "camisa-dna-guetos-p-branco-696ffbc808bf0-large.png",
      Rosa: "camisa-dna-guetos-p-rosa-69717f4f6bd9e-large.png",
    },
  },
  {
    id: 43722351,
    colors: ["Amarelo", "Branco", "Preto", "Vermelho"],
    images: {
      Amarelo: "camisa-thug-life-p-amarelo-697fc8e38a1ad-large.png",
      Branco: "camisa-thug-life-p-branco-697fc8e3d855b-large.png",
      Preto: "camisa-thug-life-p-preto-697fc8e396d84-large.png",
      Vermelho: "camisa-thug-life-p-vermelho-697fc8e3dca0d-large.png",
    },
  },
  {
    id: 43733555,
    colors: ["Vermelho", "Branco"],
    images: {
      Vermelho: "camisa-foda-se-o-patriarcado-p-vermelho-6970060587745-large.png",
      Branco: "camisa-foda-se-o-patriarcado-p-branco-69700603d7bc9-large.png",
    },
  },
  {
    id: 43796096,
    colors: ["Branco", "Preto", "Vermelho"],
    images: {
      Preto: "camisa-f4-x2-preto-697609ddd7753-large.png",
      Vermelho: "camisa-f4-x1-vermelho-6976098f5e2ca-large.png",
    },
  },
  {
    id: 43798348,
    colors: ["Preto", "Vermelho", "Branco"],
    images: {
      Preto: "camisa-todo-camburao-xg-preto-697636af1f3ab-large.png",
      Vermelho: "camisa-todo-camburao-x1-vermelho-697636af2301e-large.png",
      Branco: "camisa-todo-camburao-exg-branco-697636aedc37b-large.png",
    },
  },
  {
    id: 43798374,
    colors: ["Vermelho", "Preto", "Verde", "Amarelo"],
    images: {
      Vermelho: "camisa-marcus-garvey-p-vermelho-69763f46a667d-large.png",
      Preto: "camisa-marcus-garvey-p-preto-69763f46d26dc-large.png",
      Verde: "camisa-marcus-garvey-p-verde-69763f4651427-large.png",
      Amarelo: "camisa-marcus-garvey-p-amarelo-69763f448108c-large.png",
    },
  },
  {
    id: 43814598,
    colors: ["Amarelo", "Azul", "Branco"],
    images: {
      Amarelo: "camisa-africa-ao-pelo-m-exg-amarelo-69781bb9ad843-large.png",
      Azul: "camisa-africa-ao-pelo-m-x3-azul-69781bb97b57e-large.png",
      Branco: "camisa-africa-ao-pelo-m-xg-branco-69781bb995f99-large.png",
    },
  },
  {
    id: 43814899,
    colors: ["Preto", "Vermelho", "Branco"],
    images: {
      Preto: "camisa-eu-continuo-negro-p-preto-697d37ec30ede-large.png",
      Vermelho: "camisa-eu-continuo-negro-p-vermelho-697d37ec2d9d2-large.png",
      Branco: "camisa-eu-continuo-negro-p-branco-697d37ec42126-large.png",
    },
  },
  {
    id: 43814991,
    colors: ["Vermelho", "Amarelo", "Branco"],
    images: {
      Vermelho: "camisa-revoltosos-e-insurgentes-x2-vermelho-697822d6e45f8-large.png",
      Amarelo: "camisa-revoltosos-e-insurgentes-x3-amarelo-697822d722a10-large.png",
      Branco: "camisa-revoltosos-e-insurgentes-x3-branco-697822d6a8aa0-large.png",
    },
  },
  {
    id: 43869782,
    colors: ["Vermelho", "Amarelo", "Verde"],
    images: {
      Vermelho: "camisa-nina-simoes-p-vermelho-697fc1c30997e-large.png",
      Amarelo: "camisa-nina-simoes-p-amarelo-697fc1c444b1a-large.png",
      Verde: "camisa-nina-simoes-p-verde-697fc1c632b0c-large.png",
    },
  },
  {
    id: 43869787,
    colors: ["Amarelo", "Vermelho", "Verde"],
    images: {
      Amarelo: "camisa-nina-simoes-p-amarelo-697fc26f6ef9e-large.png",
      Vermelho: "camisa-nina-simoes-p-vermelho-697fc26ed9d09-large.png",
      Verde: "camisa-nina-simoes-p-verde-697fc270077fc-large.png",
    },
  },
  {
    id: 43876597,
    colors: ["Preto", "Vermelho", "Branco"],
    images: {
      Preto: "camisa-eu-continuo-negra-p-preto-697d3978a26ee-large.png",
      Vermelho: "camisa-eu-continuo-negra-p-vermelho-697d397891391-large.png",
      Branco: "camisa-eu-continuo-negra-p-branco-697d3978a742b-large.png",
    },
  },
  {
    id: 43876702,
    colors: ["Branco", "Vermelho"],
    images: {
      Branco: "camisa-me-poupe-machistas-x2-branco-697d3c4e341af-large.png",
      Vermelho: "camisa-me-poupe-machistas-xg-vermelho-697d3c4e60c19-large.png",
    },
  },
  {
    id: 43876720,
    colors: ["Preto", "Branco", "Vermelho"],
    images: {
      Preto: "camisa-fodam-se-os-racistas-p-preto-697fb884aea37-large.png",
      Branco: "camisa-fodam-se-os-racistas-p-branco-697fb88519d62-large.png",
      Vermelho: "camisa-fodam-se-os-racistas-p-vermelho-697fb8860ec98-large.png",
    },
  },
  {
    id: 43877218,
    colors: ["Amarelo", "Vermelho"],
    images: {
      Amarelo: "camisa-samba-sim-racismo-nao-m-exg-amarelo-697d4930ef1f7-large.png",
      Vermelho: "camisa-samba-sim-racismo-nao-m-g-vermelho-697d492fe433d-large.png",
    },
  },
  {
    id: 43877219,
    colors: ["Amarelo", "Vermelho"],
    images: {
      Amarelo: "camisa-samba-sim-racismo-nao-f-p-amarelo-697d496d69bbf-large.png",
      Vermelho: "camisa-samba-sim-racismo-nao-f-p-vermelho-697d496d7350a-large.png",
    },
  },
  {
    id: 43877377,
    colors: ["Amarelo", "Azul", "Branco"],
    images: {
      Amarelo: "camisa-africa-ao-pelo-f-p-amarelo-697d4ecab7c69-large.png",
      Azul: "camisa-africa-ao-pelo-f-p-azul-697d4eca0f8a3-large.png",
      Branco: "camisa-africa-ao-pelo-f-p-branco-697d4ecb8d7fc-large.png",
    },
  },
  {
    id: 43877395,
    colors: ["Branco", "Rosa"],
    images: {
      Branco: "camisa-pink-celebro-x3-branco-697d50a5d67e1-large.png",
      Rosa: "camisa-pink-celebro-x3-rosa-697d50a5d8db4-large.png",
    },
  },
  {
    id: 43877451,
    colors: ["Amarelo", "Azul", "Branco"],
    images: {
      Amarelo: "camisa-africa-ao-pelo-i-pp-amarelo-697d56f6068b4-large.png",
      Azul: "camisa-africa-ao-pelo-i-pp-azul-697d56f70dcab-large.png",
      Branco: "camisa-africa-ao-pelo-i-pp-branco-697d56f806635-large.png",
    },
  },
  {
    id: 43877727,
    colors: ["Rosa", "Vermelho", "Branco"],
    images: {
      Vermelho: "camisa-todo-homofobico-e-viado-enrustido-m-x3-vermelho-697d5c1f46f37-large.png",
      Branco: "camisa-todo-homofobico-e-viado-enrustido-m-x3-branco-697d5c20b0087-large.png",
    },
  },
  {
    id: 43877751,
    colors: ["Rosa", "Vermelho", "Branco"],
    images: {
      Rosa: "camisa-todo-homofobico-e-viado-enrustido-f-p-rosa-697d5e30d2dde-large.png",
      Vermelho: "camisa-todo-homofobico-e-viado-enrustido-f-p-vermelho-697d5e31307d8-large.png",
      Branco: "camisa-todo-homofobico-e-viado-enrustido-f-p-branco-697d5e31bf0a5-large.png",
    },
  },
  {
    id: 44489867,
    colors: ["Preto", "Branco", "Rosa"],
    images: {
      Preto: "camisa-minimalista-dna-guetos-x3-preto-69be7b6341e45-large.png",
      Branco: "camisa-minimalista-dna-guetos-x3-branco-69be7b635d256-large.png",
      Rosa: "camisa-minimalista-dna-guetos-x2-rosa-69be7b61b5015-large.png",
    },
  },
  {
    id: 44489895,
    colors: ["Vermelho", "Rosa"],
    images: {
      Vermelho: "moletom-dna-guetos-xg-vermelho-69be8295e918f-large.png",
      Rosa: "moletom-dna-guetos-xg-rosa-69be829635129-large.png",
    },
  },
];

export const yampiColorVariants = sources.map(({ id, colors, images }) => ({
  id,
  colors,
  colorImages: Object.entries(images).map(([color, filename]) => ({
    color,
    image: `${imageBase}${filename}`,
  })),
}));

export const editorProductColorAliases = [
  { id: 45486517, sourceId: 43721859 },
  { id: 45486518, sourceId: 43722351 },
  { id: 45486519, sourceId: 43733555 },
];
