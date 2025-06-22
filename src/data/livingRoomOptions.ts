import { BaseSelectionItem } from "@/types";

export interface LivingRoomLightingOption extends BaseSelectionItem {}

export const livingRoomLightingOptions: LivingRoomLightingOption[] = [
  {
    id: 'lr-light-chandelier',
    name: 'Chandelier(s)',
    imageUrl: 'https://media.discordapp.net/attachments/1370568040256901200/1383582128763310201/Chandelier_Statement_Light.png?ex=684f50c5&is=684dff45&hm=607307e72ee3f645fcd404eca1bc56fdd3a569a09ff832440990951863a023f0&=&format=webp&quality=lossless&width=1174&height=1174',
    dataAiHint: 'chandelier lighting room',
  },
  {
    id: 'lr-light-pendant',
    name: 'Pendant Light(s)',
    imageUrl: 'https://media.discordapp.net/attachments/1370568040256901200/1383583432038158490/Pendant_Lighting_.png?ex=684f51fb&is=684e007b&hm=d73c22534451ebecbb36d9e0f2d5ed6fa47e3eb8af88e0009e3c93d8953fc35c&=&format=webp&quality=lossless&width=1174&height=1174',
    dataAiHint: 'pendant light room',
  },
  {
    id: 'lr-light-cylinder',
    name: 'Cylinder Lighting',
    imageUrl: 'https://media.discordapp.net/attachments/1370568040256901200/1383581231232319538/Cylinder_Lighting_.png?ex=684f4fef&is=684dfe6f&hm=341393e32506180d9a92661e504cf75f6c9ec2bf8379ce2aa7c623e7173e2ba3&=&format=webp&quality=lossless&width=966&height=966',
    dataAiHint: 'cylinder lighting room',
  },
  {
    id: 'lr-light-recessed',
    name: 'Recessed Lighting',
    imageUrl: 'https://media.discordapp.net/attachments/1370568040256901200/1383581232801124452/Recessed_Lighting.png?ex=684f4fef&is=684dfe6f&hm=e4a507ad2745d790d0212c95a506e1a9270704b854a686b38508d642764f39c6&=&format=webp&quality=lossless&width=966&height=966',
    dataAiHint: 'recessed lighting room',
  },
  {
    id: 'lr-light-wallsconce',
    name: 'Wall Sconce(s)',
    imageUrl: 'https://media.discordapp.net/attachments/1370568040256901200/1383581233262362814/Wall_Sconce_Lighting.png?ex=684f4fef&is=684dfe6f&hm=73ce983263514ea42edb988314d31c4186ed1b266ea19d36f222651f4b01b0e6&=&format=webp&quality=lossless&width=966&height=966',
    dataAiHint: 'wall sconce room',
  },
  {
    id: 'lr-light-niche-or-bookshelve',
    name: 'Niche Or Bookshelf Lighting',
    imageUrl: 'https://media.discordapp.net/attachments/1370568040256901200/1385398158133301408/Niche_or_Bookshelf_Lighting.png?ex=6855ec14&is=68549a94&hm=0d3867a866154207372e7130f48073055cf53b89caf6fc07d7b6c625538aeb1e&=&format=webp&quality=lossless&width=845&height=845',
    dataAiHint: 'niche lighting under cabinet',
  },
  {
    id: 'lr-light-cove-lighting',
    name: 'Cove/Concealed Lighting',
    imageUrl: 'https://media.discordapp.net/attachments/1370568040256901200/1384606996048646234/Cove_Concealed_Lighting_.png?ex=6855ae40&is=68545cc0&hm=8dd3017f7519572c6ccb789fad352f83a158c0b54dc6065ea1f83c6e01b0f846&=&format=webp&quality=lossless&width=741&height=741',
    dataAiHint: 'cove lighting',
  },
  {
    id: 'lr-light-picture/artlighting',
    name: 'Picture/Art Lighting',
    imageUrl: 'https://media.discordapp.net/attachments/1370568040256901200/1384235952045821963/Picture_Art_Lighting_.png?ex=6855a630&is=685454b0&hm=2459109d03204825b4f04693067613906980b9ee9d44e64647cb06ab8c317ec9&=&format=webp&quality=lossless&width=741&height=741',
    dataAiHint: 'picture /art lighting',
  },
  {
    id: 'lr-light-flush-mount-lighting',
    name: 'Flush Mount Lighting',
    imageUrl: 'https://media.discordapp.net/attachments/1370568040256901200/1384235950720155679/Flush_Mount_Lighting.png?ex=6855a630&is=685454b0&hm=67641c58d761d8e36c271be21ba5cc20131da308a6f77fe384b18186e6919f24&=&format=webp&quality=lossless&width=741&height=741',
    dataAiHint: 'flush mount lighting',
  },
  {
    id: 'lr-light-ceiling-fan',
    name: 'Ceiling Fan With Light',
    imageUrl: 'https://media.discordapp.net/attachments/1370568040256901200/1384235948887507104/Ceiling_Fan_With_Light_.png?ex=6855a630&is=685454b0&hm=76183e211473c4afc93142e7a4ddfeb738facfde67e776a4d3bfd97ab918181f&=&format=webp&quality=lossless&width=741&height=741',
    dataAiHint: 'ceiling fan with light',
  }
].sort((a, b) => a.name.localeCompare(b.name));