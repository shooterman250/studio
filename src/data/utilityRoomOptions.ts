// src/data/utilityRoomOptions.ts

import { BaseSelectionItem } from "@/types";

export const utilityLightingOptions: BaseSelectionItem[] = [
  {
    id: 'light-chandelier',
    name: 'Chandelier(s) or\nStatement Fixtures',
    imageUrl: 'https://media.discordapp.net/attachments/1370568040256901200/1383582128763310201/Chandelier_Statement_Light.png?ex=684f50c5&is=684dff45&hm=607307e72ee3f645fcd404eca1bc56fdd3a569a09ff832440990951863a023f0&=&format=webp&quality=lossless&width=1174&height=1174',
    dataAiHint: 'chandelier lighting room',
  },
  {
    id: 'light-pendant',
    name: 'Pendant Light(s)',
    imageUrl: 'https://media.discordapp.net/attachments/1370568040256901200/1383583432038158490/Pendant_Lighting_.png?ex=684f51fb&is=684e007b&hm=d73c22534451ebecbb36d9e0f2d5ed6fa47e3eb8af88e0009e3c93d8953fc35c&=&format=webp&quality=lossless&width=1174&height=1174',
    dataAiHint: 'pendant light room',
  },
  {
    id: 'light-cylinder',
    name: 'Cylinder Lighting',
    imageUrl: 'https://media.discordapp.net/attachments/1370568040256901200/1383581231232319538/Cylinder_Lighting_.png?ex=684f4fef&is=684dfe6f&hm=341393e32506180d9a92661e504cf75f6c9ec2bf8379ce2aa7c623e7173e2ba3&=&format=webp&quality=lossless&width=966&height=966',
    dataAiHint: 'cylinder lighting room',
  },
  {
    id: 'light-recessed',
    name: 'Recessed Lighting',
    imageUrl: 'https://media.discordapp.net/attachments/1370568040256901200/1383581232801124452/Recessed_Lighting.png?ex=684f4fef&is=684dfe6f&hm=e4a507ad2745d790d0212c95a506e1a9270704b854a686b38508d642764f39c6&=&format=webp&quality=lossless&width=966&height=966',
    dataAiHint: 'recessed lighting room',
  },
  {
    id: 'light-wallsconce',
    name: 'Wall Sconce(s)',
    imageUrl: 'https://media.discordapp.net/attachments/1370568040256901200/1383581233262362814/Wall_Sconce_Lighting.png?ex=684f4fef&is=684dfe6f&hm=73ce983263514ea42edb988314d31c4186ed1b266ea19d36f222651f4b01b0e6&=&format=webp&quality=lossless&width=966&height=966',
    dataAiHint: 'wall sconce room',
  },
  {
    id: 'light-under-cabinet',
    name: 'Under Cabinet Or Shelf Lighting',
    imageUrl: 'https://media.discordapp.net/attachments/1370568040256901200/1384651610780864582/Under_Cabinet_Kitchen_Lighting_.png?ex=685334cd&is=6851e34d&hm=3eb9fbbb15de59be4db80c04813eccf1a76c4c7e5c3ffd1b0dfde2aa3078581b&=&format=webp&quality=lossless&width=1518&height=1518',
    dataAiHint: 'under cabinet lighting shelf kitchen',
  },
  {
    id: 'light-toe-kick',
    name: 'Toe-Kick Lighting',
    imageUrl: 'https://media.discordapp.net/attachments/1370568040256901200/1384606995511771329/Toe-Kick_Lighting_.png?ex=68530b40&is=6851b9c0&hm=129cbd581fdd14c149a167471beb207118b7af14676413d33486e1072deac4d0&=&format=webp&quality=lossless&width=1310&height=1310',
    dataAiHint: 'toe-kick lighting floor base',
  },
  {
    id: 'light-flush-mount',
    name: 'Flush Mount Lighting',
    imageUrl: 'https://media.discordapp.net/attachments/1370568040256901200/1384235950720155679/Flush_Mount_Lighting.png?ex=6855a630&is=685454b0&hm=67641c58d761d8e36c271be21ba5cc20131da308a6f77fe384b18186e6919f24&=&format=webp&quality=lossless&width=741&height=741',
    dataAiHint: 'flush mount lighting utility ceiling',
  }
].sort((a, b) => a.name.localeCompare(b.name));
