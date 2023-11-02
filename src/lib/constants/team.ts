import Oksana from './../../assets/images/oksana.jpg';
import Dzmitry from './../../assets/images/Dzmitry.jpg';
import Kirill from './../../assets/images/Kirill.jpg';
import Alex from './../../assets/images/Alex.jpg';
import OksanaQuote from './../../assets/images/oksana-quote.png';
import KirillQuote from './../../assets/images/kirill-quote.png';
import DzmitryQuote from './../../assets/images/dzmitry-quote.png';
import AlexQuote from './../../assets/images/alex-quote.png';
import { TMember } from '@lib/types/about-us';

export const team: TMember[] = [
  {
    name: 'Dzmitry Melayok',
    location: 'Katowice, Poland',
    github: 'https://github.com/mdz1985',
    position: 'Mentor',
    description: '',
    photo: Dzmitry,
    quote: DzmitryQuote,
  },
  {
    name: 'Oleksandr Pirko',
    location: 'Odessa, Ukraine',
    github: 'https://github.com/alexpirko',
    position: 'Team Lead, Frontend Developer',
    description:
      "Olexander is into photography, capturing life's brightest moments. Seeking to broaden his horizons, Olexander enrolled in a frontend course at RS School. He emerged as a true leader of the group. It was Olexander who proposed the idea of creating a web application that would merge his two passions - photography and programming. The team was inspired by this concept, and together they crafted an amazing project that received high praise from fellow students and the mentor.",
    photo: Alex,
    quote: AlexQuote,
  },
  {
    name: 'Kirill Mezentsev',
    location: 'Nizhny Novgorod, Russia',
    github: 'https://github.com/kirillvm',
    position: 'Frontend Developer',
    description:
      'Kirill works as an engineer at a factory and teaches his colleagues about manufacturing processes. One day, Kirill learned about RS School courses in frontend development and decided that it was exactly what he needed. He began studying JavaScript in his spare time after long working days. His work on integrating commerce tools with the project became a crucial component of the project.',
    photo: Kirill,
    quote: KirillQuote,
  },
  {
    name: 'Oksana Pozdniak',
    location: 'Buenos Aires, Argentina',
    github: 'https://github.com/pozdnyakoks',
    position: 'Frontend Developer',
    description:
      'Oksana used to be a musician, and played in an orchestra. She moved in Argentina last year and now she studies in a RS School under the palm trees and see herself as a frontend developer. After the final group task she is a guru of validation',
    photo: Oksana,
    quote: OksanaQuote,
  },
];
