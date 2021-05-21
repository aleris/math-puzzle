import {ReactNode} from 'react'

export type Category = {
  texts: {
    [key: string]: {
      [locale: string]: ReactNode
    }
  }
  images: {
    [name: string]: {
      [locale: string]: string
    }
  }
}

const TEXTS: {
  [category: string]: Category
} = {
  'animals': {
    texts: {
      // config
      'title': {
        'ro': 'Puzzle matematic cu animale',
        'en': 'Animal Math Puzzle',
      },
      'config-section-title-general': {
        'ro': 'General',
        'en': 'General',
      },
      'config-language': {
        'ro': 'Limbă',
        'en': 'Language',
      },
      'config-number-of-questions': {
        'ro': 'Număr de întrebări',
        'en': 'Number of questions',
      },
      'config-maximum-name-length': {
        'ro': 'Lungime maximă nume',
        'en': 'Maximum name length',
      },
      'config-unlimited': {
        'ro': 'Nelimitat',
        'en': 'Unlimited',
      },
      'config-uppercase-letters': {
        'ro': 'Litere mari',
        'en': 'Uppercase letters',
      },
      'config-maximum-number-of-response-images': {
        'ro': 'Număr maxim de imagini răspuns',
        'en': 'Maximum number of response images',
      },
      'config-qgen-addition': {
        'ro': 'Adunare',
        'en': 'Addition',
      },
      'config-qgen-enabled': {
        'ro': 'Activă',
        'en': 'Enabled',
      },
      'config-qgen-result-maximum-value': {
        'ro': 'Valoare maximă rezultat',
        'en': 'Result maximum value',
      },
      'config-qgen-allow-zero': {
        'ro': 'Permite zero',
        'en': 'Allow zero',
      },
      'config-qgen-subtraction': {
        'ro': 'Scădere',
        'en': 'Subtraction',
      },
      'config-section-title-preview': {
        'ro': 'Previzualizare',
        'en': 'Preview',
      },
      'config-show-answers': {
        'ro': 'Afișare răspunsuri la previzualizare (nu vor fi tipărite)',
        'en': 'Show answers on preview (will not be printed)',
      },
      'config-regenerate': {
        'ro': 'Regenerare',
        'en': 'Regenerate',
      },
      'config-print': {
        'ro': 'Tipărire',
        'en': 'Print',
      },
      'print-collection': {
        'ro': 'Tipărire colecție',
        'en': 'Print collection'
      },

      // worksheet
      'worksheet-title': {
        'ro': 'Găsește animalul!',
        'en': 'Find the animal!',
      },
      'instructions-1': {
        'ro': '1. Rezolvă fiecare operație aritmetică și scrie rezultatul în spațiile gole:',
        'en': '1. Solve each arithmetic challenge and write down the result in the empty spaces:',
      },
      'instructions-2': {
        'ro': '2. Completează literele corespunzătoare răspunsurilor:',
        'en': '2. Fill in the letters that match the answers:',
      },
      'instructions-3': {
        'ro': '3. Citește numele! Ce animal ai găsit?',
        'en': '3. Read the name! What animal did you find?',
      },
      'attributions': {
        'ro': <span>Imagini create de <a href="https://www.freepik.com" title="Freepik">Freepik</a> de la <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></span>,
        'en': <span>Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></span>,
      },

      // collection
      'collection-title': {
        'ro': 'Colecția de animale pentru $1',
        'en': '$1\'s Animal Collection',
      }
    },
    images: {
      'bat': {
        'en': 'Bat',
        'ro': 'Liliac',
      },
      'bear': {
        'en': 'Bear',
        'ro': 'Urs',
      },
      'bee': {
        'en': 'Bee',
        'ro': 'Albină',
      },
      'butterfly': {
        'en': 'Butterfly',
        'ro': 'Fluture',
      },
      'camel': {
        'en': 'Camel',
        'ro': 'Cămilă',
      },
      'cat': {
        'en': 'Cat',
        'ro': 'Pisică',
      },
      'chameleon': {
        'en': 'Chameleon',
        'ro': 'Cameleon',
      },
      'chicken': {
        'en': 'Chicken',
        'ro': 'Găină',
      },
      'clownfish': {
        'en': 'Clownfish',
        'ro': 'Pește clovn',
      },
      'cow': {
        'en': 'Cow',
        'ro': 'Vacă',
      },
      'crab': {
        'en': 'Crab',
        'ro': 'Crab',
      },
      'crocodile': {
        'en': 'Crocodile',
        'ro': 'Crocodil',
      },
      'dog': {
        'en': 'Dog',
        'ro': 'Câine',
      },
      'dolphin': {
        'en': 'Dolphin',
        'ro': 'Delfin',
      },
      'duck': {
        'en': 'Duck',
        'ro': 'Rață',
      },
      'elephant': {
        'en': 'Elephant',
        'ro': 'Elefant',
      },
      'flamingo': {
        'en': 'Flamingo',
        'ro': 'Flamingo',
      },
      'fox': {
        'en': 'Fox',
        'ro': 'Vulpe',
      },
      'frog': {
        'en': 'Frog',
        'ro': 'Broască',
      },
      'giraffe': {
        'en': 'Giraffe',
        'ro': 'Girafă',
      },
      'hedgehog': {
        'en': 'Hedgehog',
        'ro': 'Bursuc',
      },
      'hippopotamus': {
        'en': 'Hippopotamus',
        'ro': 'Hipopotam',
      },
      'horse': {
        'en': 'Horse',
        'ro': 'Cal',
      },
      'kangaroo': {
        'en': 'Kangaroo',
        'ro': 'Cangur',
      },
      'koala': {
        'en': 'Koala',
        'ro': 'Koala',
      },
      'lion': {
        'en': 'Lion',
        'ro': 'Leu',
      },
      'llama': {
        'en': 'Llama',
        'ro': 'Lamă'
      },
      'manta-ray': {
        'en': 'Manta ray',
        'ro': 'Pisică de mare',
      },
      'monkey': {
        'en': 'Monkey',
        'ro': 'Maimuță',
      },
      'mouse': {
        'en': 'Mouse',
        'ro': 'Șoarece',
      },
      'octopus': {
        'en': 'Octopus',
        'ro': 'Caracatiță',
      },
      'owl': {
        'en': 'Owl',
        'ro': 'Bufniță',
      },
      'panther': {
        'en': 'Panther',
        'ro': 'Panteră',
      },
      'parrot': {
        'en': 'Parrot',
        'ro': 'Papagal',
      },
      'penguin': {
        'en': 'Penguin',
        'ro': 'Pinguin',
      },
      'pig': {
        'en': 'Pig',
        'ro': 'Porc',
      },
      'polar-bear': {
        'en': 'Polar bear',
        'ro': 'Urs polar',
      },
      'rabbit': {
        'en': 'Rabbit',
        'ro': 'Iepure',
      },
      'reindeer': {
        'en': 'Reindeer',
        'ro': 'Ren',
      },
      'rhino': {
        'en': 'Rhino',
        'ro': 'Rinocer',
      },
      'shark': {
        'en': 'Shark',
        'ro': 'Rechin',
      },
      'sloth': {
        'en': 'Sloth',
        'ro': 'Leneș',
      },
      'snail': {
        'en': 'Snail',
        'ro': 'Melc',
      },
      'snake': {
        'en': 'Snake',
        'ro': 'Șarpe',
      },
      'squirrel': {
        'en': 'Squirrel',
        'ro': 'Veveriță',
      },
      'tiger': {
        'en': 'Tiger',
        'ro': 'Tigru',
      },
      'turtle': {
        'en': 'Turtle',
        'ro': 'Broască țestoasă',
      },
      'whale': {
        'en': 'Whale',
        'ro': 'Balenă',
      },
      'wolf': {
        'en': 'Wolf',
        'ro': 'Lup',
      },
    },
  },
}

export type ImageItem = {
  name: string
  label: string
}

export class Texts {
  static category: keyof typeof TEXTS = 'animals'
  static locale = 'en'

  /**
   * Gets the translated text, for the current locale, optionally replacing parameters.
   * Examples:
   *  Texts.text('title')
   *    where title for the current local is defined as 'Animal Puzzle Math'
   *    > returns 'Animal Puzzle Math'
   *  Texts.text('collection-title', 'YURI')
   *    where title for the current local is defined as '$1\'s Animals Collection'
   *    > returns 'YURI's Animals Collection'
   * @param key the text key
   * @param params list of parameters in the form $N, starting with 1, for example $1
   */
  static text(key: keyof typeof TEXTS['animals']['texts'], ...params: string[]): string {
    let template = this.translated('texts', key as string) as string
    params.forEach((param, index) => template = template.replace(`$${index + 1}`, param))
    return template
  }

  static imageLabel(key: keyof typeof TEXTS['animals']['images']): string {
    return this.translated('images', key as string) as string
  }

  static translated(type: 'images' | 'texts', key: string ): ReactNode | string {
    const category = TEXTS[this.category]
    if (category === undefined) {
      return key
    }
    const item = category[type][key]
    if (item === undefined) {
      return key
    }
    const text = item[this.locale]
    if (text === undefined) {
      return item['en']
    }
    return text
  }

  static allLabels(maxLabelLength: number = 1001): string[] {
    return this.allImageKeys().map(this.imageLabel).filter(w => w.length <= maxLabelLength)
  }

  static allImageKeys(): string[] {
    const aCategory = TEXTS['animals']
    return Object.keys(aCategory['images'])
  }

  static allImages(): ImageItem[] {
    return this.allImageKeys().map(key => ({name: key, label: this.imageLabel(key)}))
  }
}
