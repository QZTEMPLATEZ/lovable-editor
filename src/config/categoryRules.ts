export const CATEGORY_RULES = {
  BridePrep: {
    visualCues: [
      'bride', 'makeup', 'dress', 'hair', 'mirror', 'preparation',
      'getting ready', 'beauty', 'salon', 'bridal'
    ],
    keywords: ['bride', 'noiva', 'makeup', 'making'],
    environmentalCues: ['room', 'indoor', 'mirror', 'window']
  },
  GroomPrep: {
    visualCues: [
      'groom', 'suit', 'tie', 'formal', 'man', 'preparation',
      'getting ready', 'tuxedo', 'bowtie'
    ],
    keywords: ['groom', 'noivo', 'suit', 'terno'],
    environmentalCues: ['room', 'indoor', 'mirror']
  },
  Ceremony: {
    visualCues: [
      'altar', 'church', 'ceremony', 'wedding', 'bride and groom',
      'vows', 'rings', 'priest', 'minister'
    ],
    keywords: ['ceremony', 'cerimonia', 'altar', 'church'],
    environmentalCues: ['church', 'altar', 'aisle', 'guests']
  },
  Reception: {
    visualCues: [
      'party', 'dance', 'celebration', 'guests', 'cake',
      'dinner', 'toast', 'entertainment'
    ],
    keywords: ['party', 'festa', 'dance', 'reception'],
    environmentalCues: ['ballroom', 'dance floor', 'tables']
  },
  Decoration: {
    visualCues: [
      'flowers', 'decoration', 'venue', 'setup', 'table',
      'centerpiece', 'lights', 'arrangement'
    ],
    keywords: ['decor', 'flores', 'venue', 'local'],
    environmentalCues: ['venue', 'setup', 'static']
  },
  DroneFootage: {
    visualCues: [
      'aerial', 'drone', 'bird view', 'landscape', 'sky',
      'overhead', 'venue'
    ],
    keywords: ['drone', 'aerial', 'dji', 'mavic'],
    environmentalCues: ['sky', 'outdoor', 'aerial']
  },
  OtherMoments: {
    visualCues: ['video', 'scene', 'moment'],
    keywords: ['other', 'extra'],
    environmentalCues: ['any']
  }
};