import { Ebook } from './types';

export const EBOOKS: Ebook[] = [
  {
    id: 'comptines-francaises',
    title: 'Melodic & Harmonic: The Multilingual French Songbook',
    author: 'Traditional French Nursery Rhymes',
    coverEmoji: '🇫🇷🎶',
    description: 'A multilingual learning book featuring 25 French classics with interactive chords and translations in multiple languages. Perfect for melodic and harmonic exploration.',
    isRecommended: true,
    pages: [
      {
        translations: {
          fr: {
            languageName: 'Français',
            title: 'Frère Jacques',
            paragraphs: [
              { type: 'text', text: 'Frère 👦 Jacques dormez-vous 😴 dormez-vous ?', chords: '[G]Frère 👦 Jacques [G]dormez-vous 😴 [G]dormez-vous ?' },
              { type: 'text', text: 'Sonnez les matines 🔔 sonnez les matines 🔔', chords: '[G]Sonnez les matines 🔔 [G]sonnez les matines 🔔' },
              { type: 'text', text: 'Ding dang dong ding dang dong', chords: '[G]Ding dang [D]dong [G]ding dang [D]dong' }
            ]
          },
          en: {
            languageName: 'English',
            title: 'Brother John',
            paragraphs: [
              { type: 'text', text: 'Brother 👦 John are you sleeping 😴 are you sleeping 😴', chords: '[G]Brother 👦 John [G]are you sleeping 😴 [G]are you sleeping 😴' },
              { type: 'text', text: 'Morning 🌅 bells 🔔 are ringing morning 🌅 bells 🔔 are ringing!', chords: '[G]Morning 🌅 bells 🔔 are ringing [G]morning 🌅 bells 🔔 are ringing!' },
              { type: 'text', text: 'Ding dang dong ding dang dong', chords: '[G]Ding dang [D]dong [G]ding dang [D]dong' }
            ]
          },
          de: {
            languageName: 'Deutsch',
            title: 'Bruder Jakob',
            paragraphs: [
              { type: 'text', text: 'Bruder 👦 Jakob schläfst 😴 du noch schläfst 😴 du noch?', chords: '[G]Bruder 👦 Jakob [G]schläfst 😴 du noch [G]schläfst 😴 du noch?' },
              { type: 'text', text: 'Hörst du nicht die Glocken 🔔 hörst du nicht die Glocken 🔔', chords: '[G]Hörst du nicht die Glocken 🔔 [G]hörst du nicht die Glocken 🔔' },
              { type: 'text', text: 'Ding dang dong ding dang dong', chords: '[G]Ding dang [D]dong [G]ding dang [D]dong' }
            ]
          },
          it: {
            languageName: 'Italiano',
            title: 'Fratello Giacomo',
            paragraphs: [
              { type: 'text', text: 'Fratello 👦 Giacomo dormi 😴 tu ancora dormi 😴 tu ancora?', chords: '[G]Fratello 👦 Giacomo [G]dormi 😴 tu ancora [G]dormi 😴 tu ancora?' },
              { type: 'text', text: 'Senti le campane 🔔 senti le campane 🔔', chords: '[G]Senti le campane 🔔 [G]senti le campane 🔔' },
              { type: 'text', text: 'Din don dan din don dan', chords: '[G]Din don [D]dan [G]Din don [D]dan' }
            ]
          },
          es: {
            languageName: 'Español',
            title: 'Hermano Jacobo',
            paragraphs: [
              { type: 'text', text: 'Hermano 👦 Jacobo ¿duermes 😴 tú aún duermes 😴 tú aún?', chords: '[G]Hermano 👦 Jacobo [G]¿duermes 😴 tú aún [G]duermes 😴 tú aún?' },
              { type: 'text', text: 'Toca las campanas 🔔 toca las campanas 🔔', chords: '[G]Toca las campanas 🔔 [G]toca las campanas 🔔' },
              { type: 'text', text: 'Din don dan din don dan', chords: '[G]Din don [D]dan [G]Din don [D]dan' }
            ]
          },
          ar: {
            languageName: 'العربية',
            title: 'الأخ جاك',
            paragraphs: [
              { type: 'text', text: 'أخ جاك 👦 هل أنت نائم؟ 😴 هل أنت نائم؟ 😴', chords: '[G]أخ جاك 👦 [G]هل أنت نائم؟ 😴 [G]هل أنت نائم؟ 😴' },
              { type: 'text', text: 'دقت الأجراس 🔔 دقت الأجراس 🔔', chords: '[G]دقت الأجراس 🔔 [G]دقت الأجراس 🔔' },
              { type: 'text', text: 'دينغ دانغ دونغ دينغ دانغ دونغ', chords: '[G]دينغ دانغ [D]دونغ [G]دينغ دانغ [D]دونغ' }
            ]
          },
          tr: {
            languageName: 'Türkçe',
            title: 'Jakob Kardeş',
            paragraphs: [
              { type: 'text', text: 'Jakob 👦 Kardeş uyuyor musun? 😴 uyuyor musun? 😴', chords: '[G]Jakob 👦 Kardeş [G]uyuyor musun? 😴 [G]uyuyor musun? 😴' },
              { type: 'text', text: 'Sabah çanları 🔔 çalıyor sabah çanları 🔔 çalıyor!', chords: '[G]Sabah çanları 🔔 [G]çalıyor sabah çanları 🔔 çalıyor!' },
              { type: 'text', text: 'Ding dang dong ding dang dong', chords: '[G]Ding dang [D]dong [G]Ding dang [D]dong' }
            ]
          },
          zh: {
            languageName: '中文',
            title: '两只老虎 (雅克兄弟)',
            paragraphs: [
              { type: 'text', text: '雅克 👦 兄弟，你在睡觉吗？ 😴 你在睡觉吗？ 😴', chords: '[G]雅克 👦 兄弟 [G]你在睡觉吗？ 😴 [G]你在睡觉吗？ 😴' },
              { type: 'text', text: '晨钟 🔔 正在响，晨钟 🔔 正在响！', chords: '[G]晨钟 🔔 正在响 [G]晨钟 🔔 正在响！' },
              { type: 'text', text: '叮当咚，叮当咚', chords: '[叮当 [D]咚 [G]叮当 [D]咚' }
            ]
          },
          hr: {
            languageName: 'Hrvatski',
            title: 'Bratec Martin',
            paragraphs: [
              { type: 'text', text: 'Bratec 👦 Martin, bratec 👦 Martin, još li spavaš? 😴 još li spavaš? 😴', chords: '[G]Bratec 👦 Martin, [G]bratec 👦 Martin, [G]još li spavaš? 😴 [G]još li spavaš? 😴' },
              { type: 'text', text: 'Čuj kako zvona 🔔 zvone, čuj kako zvona 🔔 zvone!', chords: '[G]Čuj kako zvona 🔔 zvone, [G]čuj kako zvona 🔔 zvone!' },
              { type: 'text', text: 'Din dan don, din dan don', chords: '[G]Din dan [D]don, [G]din dan [D]don' }
            ]
          },
          ru: {
            languageName: 'Русский',
            title: 'Братец Яков',
            paragraphs: [
              { type: 'text', text: 'Братец 👦 Яков, спишь 😴 ли ты, спишь 😴 ли ты?', chords: '[G]Братец 👦 Яков [G]спишь 😴 ли ты [G]спишь 😴 ли ты?' },
              { type: 'text', text: 'Колокола 🔔 звонят, колокола 🔔 звонят!', chords: '[G]Колокола 🔔 [G]звонят [G]колокола 🔔 звонят!' },
              { type: 'text', text: 'Динь-дань-донь, динь-дань-донь', chords: '[G]Динь-дань [D]донь [G]динь-дань [D]донь' }
            ]
          }
        }
      },
      {
        translations: {
          fr: {
            languageName: 'Français',
            title: 'À la claire fontaine',
            paragraphs: [
              { type: 'text', text: 'À la claire fontaine ⛲ m\'en allant promener', chords: '[C]À la claire fon[G]taine ⛲ [C]m\'en allant pro[G]mener' },
              { type: 'text', text: 'J\'ai trouvé l\'eau 💧 si belle ✨ que je m\'y suis baignée 🛁', chords: '[C]J\'ai trouvé l\'eau 💧 [F]si belle ✨ [G]que je m\'y suis bai[C]gnée 🛁' },
              { type: 'text', text: 'Sous les feuilles 🍃 d\'un chêne 🌳 je me suis fait sécher.', chords: '[C]Sous les feuilles 🍃 [G]d\'un chêne 🌳 [C]je me suis fait sé[G]cher.' },
              { type: 'text', text: 'Il y a longtemps que je t\'aime 💖', chords: '[C]Il y a long[F]temps que [G]je t\'aime 💖' }
            ]
          },
          en: {
            languageName: 'English',
            title: 'By the clear fountain',
            paragraphs: [
              { type: 'text', text: 'By the clear fountain ⛲ I went for a walk' },
              { type: 'text', text: 'I found the water 💧 so beautiful ✨ that I bathed 🛁 in it.' },
              { type: 'text', text: 'Under the leaves 🍃 of an oak 🌳 I dried myself.' },
              { type: 'text', text: 'I have loved you for so long 💖' }
            ]
          },
          de: {
            languageName: 'Deutsch',
            title: 'An der klaren Quelle',
            paragraphs: [
              { type: 'text', text: 'An der klaren Quelle ⛲ spazierte ich umher' },
              { type: 'text', text: 'Ich fand das Wasser 💧 so schön ✨ dass ich mich gebadet 🛁 habe.' },
              { type: 'text', text: 'Unter den Blättern einer Eiche 🌳 ließ ich mich trocknen.' },
              { type: 'text', text: 'Ich liebe dich schon lange 💖' }
            ]
          }
        }
      },
      {
        translations: {
          fr: {
            languageName: 'Français',
            title: 'Au clair de la lune',
            paragraphs: [
              { type: 'text', text: 'Au clair de la lune 🌙 mon ami Pierrot', chords: '[C]Au clair de la [G]lune 🌙 [C]mon ami Pie[G]rrot' },
              { type: 'text', text: 'Prête-moi ta plume 🪶 pour écrire un mot 📝', chords: '[C]Prête-moi ta [G]plume 🪶 [C]pour écrire un [G]mot 📝' },
              { type: 'text', text: 'Ma chandelle 🕯️ est morte 💀 je n\'ai plus de feu 🔥', chords: '[C]Ma chandelle 🕯️ [G]est morte 💀 [C]je n\'ai plus de [G]feu 🔥' },
              { type: 'text', text: 'Ouvre-moi ta porte 🚪 pour l\'amour de Dieu ⛪', chords: '[C]Ouvre-moi ta [G]porte 🚪 [C]pour l\'amour de [G]Dieu ⛪' }
            ]
          },
          en: {
            languageName: 'English',
            title: 'By the light of the moon',
            paragraphs: [
              { type: 'text', text: 'By the light of the moon 🌙 my friend Pierrot' },
              { type: 'text', text: 'Lend me your pen 🪶 to write a word 📝' },
              { type: 'text', text: 'My candle 🕯️ is out 💀 I have no more fire 🔥' },
              { type: 'text', text: 'Open your door 🚪 for the love of God ⛪' }
            ]
          }
        }
      },
      {
        translations: {
          fr: {
            languageName: 'Français',
            title: 'Sur le pont d\'Avignon',
            paragraphs: [
              { type: 'text', text: 'Sur le pont d\'Avignon 🌉 on y danse 💃 on y danse 💃', chords: '[G]Sur le pont d\'Avi[D]gnon 🌉 [G]on y danse 💃 [D]on y danse 💃' },
              { type: 'text', text: 'Sur le pont d\'Avignon 🌉 on y danse 💃 tous en rond ⭕', chords: '[G]Sur le pont d\'Avi[D]gnon 🌉 [G]on y danse 💃 [D]tous en [G]rond ⭕' }
            ]
          },
          en: {
            languageName: 'English',
            title: 'On the bridge of Avignon',
            paragraphs: [
              { type: 'text', text: 'On the bridge of Avignon 🌉 we dance 💃 we dance 💃' },
              { type: 'text', text: 'On the bridge of Avignon 🌉 we dance 💃 all in a circle ⭕' }
            ]
          }
        }
      },
      {
        translations: {
          fr: {
            languageName: 'Français',
            title: 'Une souris verte',
            paragraphs: [
              { type: 'text', text: 'Une souris 🐭 verte 💚 qui courait 🏃 dans l\'herbe 🌿', chords: '[G]Une souris 🐭 [C]verte 💚 [D]qui courait 🏃 dans [G]l\'herbe 🌿' },
              { type: 'text', text: 'Je l\'attrape par la queue 🐁 je la montre à ces messieurs 👨', chords: '[G]Je l\'attrape par la [C]queue 🐁 [D]je la montre à ces [G]messieurs 👨' },
              { type: 'text', text: 'Ces messieurs me disent : trempez-la dans l\'eau 💧', chords: '[G]Ces messieurs me [C]disent : [D]trempez-la dans [G]l\'eau 💧' },
              { type: 'text', text: 'Trempez-la dans l\'huile 🛢️ trempez-la dans le bouillon 🍲', chords: '[G]Trempez-la dans [C]l\'huile 🛢️ [D]trempez-la dans le [G]bouillon 🍲' }
            ]
          },
          en: {
            languageName: 'English',
            title: 'A green mouse',
            paragraphs: [
              { type: 'text', text: 'A green 💚 mouse 🐭 that was running 🏃 in the grass 🌿' },
              { type: 'text', text: 'I catch it by the tail 🐁 I show it to these gentlemen 👨' },
              { type: 'text', text: 'These gentlemen tell me: dip it in water 💧' },
              { type: 'text', text: 'Dip it in oil 🛢️ dip it in the broth 🍲' }
            ]
          }
        }
      },
      {
        translations: {
          fr: {
            languageName: 'Français',
            title: 'Il était un petit navire',
            paragraphs: [
              { type: 'text', text: 'Il était un petit navire 🚢 (bis)', chords: '[C]Il était un pe[G]tit na[C]vire 🚢' },
              { type: 'text', text: 'Qui n\'avait ja-ja-jamais navigué 🌊 (bis)', chords: '[C]Qui n\'avait ja-ja-[G]jamais navi[C]gué 🌊' },
              { type: 'text', text: 'Ohé ! Ohé ! ⚓', chords: '[F]Ohé ! [C]Ohé ! ⚓' }
            ]
          },
          en: {
            languageName: 'English',
            title: 'There was a little ship',
            paragraphs: [
              { type: 'text', text: 'There was a little ship 🚢' },
              { type: 'text', text: 'That had never, ever sailed 🌊' },
              { type: 'text', text: 'Ahoy! Ahoy! ⚓' }
            ]
          }
        }
      },
      {
        translations: {
          fr: {
            languageName: 'Français',
            title: 'Alouette',
            paragraphs: [
              { type: 'text', text: 'Alouette 🐦 gentille alouette 🐦', chords: '[G]Alouette [D]gentille a[G]louette' },
              { type: 'text', text: 'Alouette 🐦 je te plumerai 🪶', chords: '[G]Alouette [D]je te plu[G]merai' },
              { type: 'text', text: 'Je te plumerai la tête 👤', chords: '[G]Je te plumerai la [D]tête' }
            ]
          },
          en: {
            languageName: 'English',
            title: 'Lark',
            paragraphs: [
              { type: 'text', text: 'Lark 🐦 nice little lark 🐦' },
              { type: 'text', text: 'Lark 🐦 I shall pluck your feathers 🪶' },
              { type: 'text', text: 'I shall pluck your head 👤' }
            ]
          }
        }
      },
      {
        translations: {
          fr: {
            languageName: 'Français',
            title: 'Savez-vous planter les choux ?',
            paragraphs: [
              { type: 'text', text: 'Savez-vous planter les choux 🥬', chords: '[C]Savez-vous plan[G]ter les [C]choux 🥬' },
              { type: 'text', text: 'À la mode, à la mode ✨', chords: '[C]À la mode, [G]à la [C]mode ✨' },
              { type: 'text', text: 'On les plante avec le doigt ☝️', chords: '[C]On les plante a[G]vec le [C]doigt ☝️' }
            ]
          },
          en: {
            languageName: 'English',
            title: 'Do you know how to plant cabbage?',
            paragraphs: [
              { type: 'text', text: 'Do you know how to plant cabbage 🥬' },
              { type: 'text', text: 'In the fashion, in the fashion ✨' },
              { type: 'text', text: 'We plant them with the finger ☝️' }
            ]
          }
        }
      },
      {
        translations: {
          fr: {
            languageName: 'Français',
            title: 'Meunier tu dors',
            paragraphs: [
              { type: 'text', text: 'Meunier 👨‍🌾 tu dors 😴 ton moulin 🎡 va trop vite ⚡', chords: '[G]Meunier 👨‍🌾 tu [D]dors 😴 ton mou[G]lin 🎡 va trop [D]vite ⚡' },
              { type: 'text', text: 'Meunier 👨‍🌾 tu dors 😴 ton moulin 🎡 va trop fort 💪', chords: '[G]Meunier 👨‍🌾 tu [D]dors 😴 ton mou[G]lin 🎡 va trop [D]fort 💪' }
            ]
          },
          en: {
            languageName: 'English',
            title: 'Miller you are sleeping',
            paragraphs: [
              { type: 'text', text: 'Miller 👨‍🌾 you are sleeping 😴 your mill 🎡 is going too fast ⚡' },
              { type: 'text', text: 'Miller 👨‍🌾 you are sleeping 😴 your mill 🎡 is going too strong 💪' }
            ]
          }
        }
      },
      {
        translations: {
          fr: {
            languageName: 'Français',
            title: 'Gentil coquelicot',
            paragraphs: [
              { type: 'text', text: 'J\'ai descendu dans mon jardin 🏡 (bis)', chords: '[C]J\'ai descen[G]du dans mon jar[C]din 🏡' },
              { type: 'text', text: 'Pour y cueillir du romarin 🌿 (bis)', chords: '[C]Pour y cueillir [G]du roma[C]rin 🌿' },
              { type: 'text', text: 'Gentil coquelicot 🌺 Mesdames 👩', chords: '[F]Gentil coque[C]licot 🌺 [G]Mesdames 👩' }
            ]
          },
          en: {
            languageName: 'English',
            title: 'Gentle poppy',
            paragraphs: [
              { type: 'text', text: 'I went down into my garden 🏡' },
              { type: 'text', text: 'To pick some rosemary 🌿' },
              { type: 'text', text: 'Gentle poppy 🌺 Ladies 👩' }
            ]
          }
        }
      },
      {
        translations: {
          fr: {
            languageName: 'Français',
            title: 'Cadet Rousselle',
            paragraphs: [
              { type: 'text', text: 'Cadet Rousselle a trois maisons 🏠🏠🏠', chords: '[G]Cadet Rousselle a [D]trois mai[G]sons 🏠🏠🏠' },
              { type: 'text', text: 'Qui n\'ont ni poutres ni chevrons 🪵', chords: '[G]Qui n\'ont ni poutres [D]ni chev[G]rons 🪵' },
              { type: 'text', text: 'Ah ! Ah ! Ah ! Oui vraiment ! 😄', chords: '[C]Ah ! Ah ! [G]Ah ! Oui vrai[D]ment ! 😄' }
            ]
          },
          en: {
            languageName: 'English',
            title: 'Cadet Rousselle',
            paragraphs: [
              { type: 'text', text: 'Cadet Rousselle has three houses 🏠🏠🏠' },
              { type: 'text', text: 'Which have neither beams nor rafters 🪵' },
              { type: 'text', text: 'Ah! Ah! Ah! Yes indeed! 😄' }
            ]
          }
        }
      },
      {
        translations: {
          fr: {
            languageName: 'Français',
            title: 'Dansons la capucine',
            paragraphs: [
              { type: 'text', text: 'Dansons la capucine 💃 y\'a pas de pain 🥖 chez nous', chords: '[C]Dansons la capu[G]cine 💃 y\'a [C]pas de pain 🥖 chez [G]nous' },
              { type: 'text', text: 'Y\'en a chez la voisine 👩‍🦳 mais ce n\'est pas pour nous 🚫', chords: '[C]Y\'en a chez la voi[G]sine 👩‍🦳 mais [C]ce n\'est pas pour [G]nous 🚫' }
            ]
          },
          en: {
            languageName: 'English',
            title: 'Let\'s dance the nasturtium',
            paragraphs: [
              { type: 'text', text: 'Let\'s dance the nasturtium 💃 there is no bread 🥖 at our house' },
              { type: 'text', text: 'There is some at the neighbor\'s 👩‍🦳 but it is not for us 🚫' }
            ]
          }
        }
      },
      {
        translations: {
          fr: {
            languageName: 'Français',
            title: 'Fais dodo, Colas mon p\'tit frère',
            paragraphs: [
              { type: 'text', text: 'Fais dodo 😴 Colas mon p\'tit frère 👦', chords: '[G]Fais do[D]do 😴 [G]Colas mon p\'tit [D]frère 👦' },
              { type: 'text', text: 'Maman 👩 est en haut ⬆️ qui fait du gâteau 🍰', chords: '[G]Maman 👩 est en [D]haut ⬆️ [G]qui fait du gâ[D]teau 🍰' }
            ]
          },
          en: {
            languageName: 'English',
            title: 'Go to sleep, Colas my little brother',
            paragraphs: [
              { type: 'text', text: 'Go to sleep 😴 Colas my little brother 👦' },
              { type: 'text', text: 'Mom 👩 is upstairs ⬆️ making some cake 🍰' }
            ]
          }
        }
      },
      {
        translations: {
          fr: {
            languageName: 'Français',
            title: 'Il pleut, il pleut, bergère',
            paragraphs: [
              { type: 'text', text: 'Il pleut 🌧️ il pleut 🌧️ bergère 👩‍🌾', chords: '[C]Il pleut 🌧️ il [G]pleut 🌧️ ber[C]gère 👩‍🌾' },
              { type: 'text', text: 'Rentre tes blancs moutons 🐑🐑', chords: '[C]Rentre tes [G]blancs mou[C]tons 🐑🐑' }
            ]
          },
          en: {
            languageName: 'English',
            title: 'It\'s raining, it\'s raining, shepherdess',
            paragraphs: [
              { type: 'text', text: 'It\'s raining 🌧️ it\'s raining 🌧️ shepherdess 👩‍🌾' },
              { type: 'text', text: 'Bring in your white sheep 🐑🐑' }
            ]
          }
        }
      },
      {
        translations: {
          fr: {
            languageName: 'Français',
            title: 'Jean de la Lune',
            paragraphs: [
              { type: 'text', text: 'Jean de la Lune 🌙 mon ami 👦', chords: '[G]Jean de la [D]Lune 🌙 [G]mon a[D]mi 👦' },
              { type: 'text', text: 'Prête-moi ta plume 🪶 pour écrire un mot 📝', chords: '[G]Prête-moi ta [D]plume 🪶 [G]pour écrire un [D]mot 📝' }
            ]
          },
          en: {
            languageName: 'English',
            title: 'John of the Moon',
            paragraphs: [
              { type: 'text', text: 'John of the Moon 🌙 my friend 👦' },
              { type: 'text', text: 'Lend me your pen 🪶 to write a word 📝' }
            ]
          }
        }
      },
      {
        translations: {
          fr: {
            languageName: 'Français',
            title: 'La Mère Michel',
            paragraphs: [
              { type: 'text', text: 'C\'est la mère Michel 👩‍🦳 qui a perdu son chat 🐱', chords: '[C]C\'est la mère Mi[G]chel 👩‍🦳 qui a per[C]du son [G]chat 🐱' },
              { type: 'text', text: 'Qui crie par la fenêtre 🪟 qui est-ce qui lui rendra ? 🙋‍♂️', chords: '[C]Qui crie par la fe[G]nêtre 🪟 qui [C]est-ce qui lui ren[G]dra ? 🙋‍♂️' }
            ]
          },
          en: {
            languageName: 'English',
            title: 'Mother Michel',
            paragraphs: [
              { type: 'text', text: 'It\'s Mother Michel 👩‍🦳 who lost her cat 🐱' },
              { type: 'text', text: 'Who shouts through the window 🪟 who will return it to her? 🙋‍♂️' }
            ]
          }
        }
      },
      {
        translations: {
          fr: {
            languageName: 'Français',
            title: 'Le bon roi Dagobert',
            paragraphs: [
              { type: 'text', text: 'Le bon roi Dagobert 👑 avait sa culotte 🩳 à l\'envers 🔄', chords: '[G]Le bon roi Dago[D]bert 👑 avait sa cu[G]lotte 🩳 à l\'en[D]vers 🔄' },
              { type: 'text', text: 'Le grand saint Éloi ⛪ lui dit : O mon roi ! 👑', chords: '[G]Le grand saint É[D]loi ⛪ lui [G]dit : O mon [D]roi ! 👑' }
            ]
          },
          en: {
            languageName: 'English',
            title: 'The good king Dagobert',
            paragraphs: [
              { type: 'text', text: 'The good king Dagobert 👑 had his pants 🩳 on inside out 🔄' },
              { type: 'text', text: 'The great Saint Eloi ⛪ said to him: O my king! 👑' }
            ]
          }
        }
      },
      {
        translations: {
          fr: {
            languageName: 'Français',
            title: 'Malbrough s\'en va-t-en guerre',
            paragraphs: [
              { type: 'text', text: 'Malbrough s\'en va-t-en guerre ⚔️ mironton, mironton, mirontaine 🎶', chords: '[C]Malbrough s\'en va-t-en [G]guerre ⚔️ [C]mironton, miron[G]ton, miron[C]taine 🎶' },
              { type: 'text', text: 'Malbrough s\'en va-t-en guerre ⚔️ ne sait quand reviendra ❓', chords: '[C]Malbrough s\'en va-t-en [G]guerre ⚔️ [C]ne sait quand revien[G]dra ❓' }
            ]
          },
          en: {
            languageName: 'English',
            title: 'Marlborough is going to war',
            paragraphs: [
              { type: 'text', text: 'Marlborough is going to war ⚔️' },
              { type: 'text', text: 'Marlborough is going to war ⚔️ doesn\'t know when he\'ll return ❓' }
            ]
          }
        }
      },
      {
        translations: {
          fr: {
            languageName: 'Français',
            title: 'Maman les p\'tits bateaux',
            paragraphs: [
              { type: 'text', text: 'Maman les p\'tits bateaux ⛵ qui vont sur l\'eau 💧 ont-ils des jambes ? 🦵', chords: '[G]Maman les p\'tits ba[D]teaux ⛵ qui vont sur [G]l\'eau 💧 ont-ils des [D]jambes ? 🦵' },
              { type: 'text', text: 'Mais oui mon gros bêta 🤡 s\'ils n\'en avaient pas 🚫 ils ne marcheraient pas 🚶‍♂️', chords: '[G]Mais oui mon gros bê[D]ta 🤡 s\'ils n\'en a[G]vaient pas 🚫 ils ne marche[D]raient pas 🚶‍♂️' }
            ]
          },
          en: {
            languageName: 'English',
            title: 'Mom, the little boats',
            paragraphs: [
              { type: 'text', text: 'Mom, the little boats ⛵ that go on the water 💧 do they have legs? 🦵' },
              { type: 'text', text: 'Why yes, you big silly 🤡 if they didn\'t have any 🚫 they wouldn\'t walk 🚶‍♂️' }
            ]
          }
        }
      },
      {
        translations: {
          fr: {
            languageName: 'Français',
            title: 'Nous n\'irons plus au bois',
            paragraphs: [
              { type: 'text', text: 'Nous n\'irons plus au bois 🌲 les lauriers 🌿 sont coupés ✂️', chords: '[C]Nous n\'irons plus au [G]bois 🌲 les lau[C]riers 🌿 sont cou[G]pés ✂️' },
              { type: 'text', text: 'La belle 👩 que voilà 📍 ira les ramasser 🧺', chords: '[C]La belle 👩 que voi[G]là 📍 [C]ira les ramas[G]ser 🧺' }
            ]
          },
          en: {
            languageName: 'English',
            title: 'We will no longer go to the woods',
            paragraphs: [
              { type: 'text', text: 'We will no longer go to the woods 🌲 the laurels 🌿 are cut ✂️' },
              { type: 'text', text: 'The beauty 👩 who is here 📍 will go and pick them up 🧺' }
            ]
          }
        }
      },
      {
        translations: {
          fr: {
            languageName: 'Français',
            title: 'Pirouette Cacahuète',
            paragraphs: [
              { type: 'text', text: 'Il était un petit homme 👨 pirouette cacahuète 🥜', chords: '[G]Il était un petit [D]homme 👨 [G]pirouette caca[D]huète 🥜' },
              { type: 'text', text: 'Il était un petit homme 👨 qui avait une drôle de maison 🏠', chords: '[G]Il était un petit [D]homme 👨 [G]qui avait une drôle de mai[D]son 🏠' }
            ]
          },
          en: {
            languageName: 'English',
            title: 'Pirouette Peanut',
            paragraphs: [
              { type: 'text', text: 'There was a little man 👨 pirouette peanut 🥜' },
              { type: 'text', text: 'There was a little man 👨 who had a funny house 🏠' }
            ]
          }
        }
      },
      {
        translations: {
          fr: {
            languageName: 'Français',
            title: 'Pomme de reinette et pomme d\'api',
            paragraphs: [
              { type: 'text', text: 'Pomme de reinette 🍎 et pomme d\'api 🍏', chords: '[C]Pomme de rei[G]nette 🍎 [C]et pomme d\'a[G]pi 🍏' },
              { type: 'text', text: 'Tapis, tapis rouge 🔴 pomme de reinette 🍎 et pomme d\'api 🍏', chords: '[C]Tapis, tapis [G]rouge 🔴 [C]pomme de rei[G]nette 🍎 [C]et pomme d\'a[G]pi 🍏' }
            ]
          },
          en: {
            languageName: 'English',
            title: 'Pippin apple and lady apple',
            paragraphs: [
              { type: 'text', text: 'Pippin apple 🍎 and lady apple 🍏' },
              { type: 'text', text: 'Carpet, red carpet 🔴 pippin apple 🍎 and lady apple 🍏' }
            ]
          }
        }
      },
      {
        translations: {
          fr: {
            languageName: 'Français',
            title: 'Promenons-nous dans les bois',
            paragraphs: [
              { type: 'text', text: 'Promenons-nous dans les bois 🌲 pendant que le loup 🐺 n\'y est pas 🚫', chords: '[G]Promenons-nous dans les [D]bois 🌲 pendant que le [G]loup 🐺 n\'y est [D]pas 🚫' },
              { type: 'text', text: 'Loup 🐺 y es-tu ? ❓ Que fais-tu ? ❓', chords: '[G]Loup 🐺 y es-[D]tu ? ❓ [G]Que fais-[D]tu ? ❓' }
            ]
          },
          en: {
            languageName: 'English',
            title: 'Let\'s walk in the woods',
            paragraphs: [
              { type: 'text', text: 'Let\'s walk in the woods 🌲 while the wolf 🐺 is not there 🚫' },
              { type: 'text', text: 'Wolf 🐺 are you there? ❓ What are you doing? ❓' }
            ]
          }
        }
      },
      {
        translations: {
          fr: {
            languageName: 'Français',
            title: 'Une poule sur un mur',
            paragraphs: [
              { type: 'text', text: 'Une poule 🐔 sur un mur 🧱 qui picote du pain dur 🥖', chords: '[C]Une poule 🐔 sur un [G]mur 🧱 [C]qui picote du pain [G]dur 🥖' },
              { type: 'text', text: 'Picoti, picota 🐔 lève la queue 🐁 et puis s\'en va 🏃‍♀️', chords: '[C]Picoti, pico[G]ta 🐔 [C]lève la queue 🐁 [G]et puis s\'en [C]va 🏃‍♀️' }
            ]
          },
          en: {
            languageName: 'English',
            title: 'A hen on a wall',
            paragraphs: [
              { type: 'text', text: 'A hen 🐔 on a wall 🧱 pecking hard bread 🥖' },
              { type: 'text', text: 'Picoti, picota 🐔 lifts her tail 🐁 and then goes away 🏃‍♀️' }
            ]
          }
        }
      },
      {
        translations: {
          fr: {
            languageName: 'Français',
            title: 'Vent frais, vent du matin',
            paragraphs: [
              { type: 'text', text: 'Vent frais 🌬️ vent du matin 🌅', chords: '[G]Vent frais 🌬️ [D]vent du ma[G]tin 🌅' },
              { type: 'text', text: 'Vent qui souffle 🌬️ au sommet du grand pin 🌲', chords: '[G]Vent qui [D]souffle 🌬️ au [G]sommet du grand [D]pin 🌲' }
            ]
          },
          en: {
            languageName: 'English',
            title: 'Fresh wind, morning wind',
            paragraphs: [
              { type: 'text', text: 'Fresh wind 🌬️ morning wind 🌅' },
              { type: 'text', text: 'Wind blowing 🌬️ at the top of the tall pine 🌲' }
            ]
          }
        }
      }
    ]
  },
  {
    id: 'wolf-seven-kids',
    title: 'Vuk i sedam kozlića',
    author: 'Vladimir Nazor / Brothers Grimm',
    coverEmoji: '🐺🐐',
    description: 'A classic tale of a clever mother goat and her seven kids outsmarting a hungry wolf.',
    pages: [
      {
        translations: {
          hr: {
            languageName: 'Hrvatski',
            title: 'Hrvatski',
            paragraphs: [
              { type: 'text', text: 'Bila je jedna koza 🐐💕 i imala sedam kozlića 🐐✨.' },
              { type: 'text', text: 'Jednog dana htjede otići 🏃‍♀️ u šumu 🌲 po lišće 🌿, pa ih sve pozva 🗣️ i reče 🗣️:' },
              { type: 'dialog', text: '— Draga djeco 👶 moja, idem u šumu 🌲, a vi ostanite kod kuće 🏠 i čuvajte vrata 🚪. Ne otvarajte nikome 😈, jer vuk 🐺 rado bi vas pojeo 🍴!' },
              { type: 'text', text: 'Kozlići odgovoriše:' },
              { type: 'dialog', text: '— Ne boj se majko 👩, nećemo otvoriti 🚪!' }
            ]
          },
          es: {
            languageName: 'Español',
            title: 'Español',
            paragraphs: [
              { type: 'text', text: 'Había una cabra 🐐💕 que tenía siete cabritillos 🐐✨.' },
              { type: 'text', text: 'Un día quiso irse 🏃‍♀️ al bosque 🌲 por hojas 🌿, así que llamó 🗣️ a todos y dijo:' },
              { type: 'dialog', text: '— Queridos niños 👶 míos, voy al bosque 🌲, quedaos en casa 🏠 y cuidad la puerta 🚪. No abráis a nadie 😈, porque el lobo 🐺 os comería 🍴.' },
              { type: 'text', text: 'Los cabritillos respondieron:' },
              { type: 'dialog', text: '— No tengas miedo mamá 👩, ¡no abriremos 🚪!' }
            ]
          },
          de: {
            languageName: 'Deutsch',
            title: 'Deutsch',
            paragraphs: [
              { type: 'text', text: 'Es war einmal eine Geiß 🐐💕, die hatte sieben junge Geißlein 🐐✨.' },
              { type: 'text', text: 'Eines Tages wollte sie in den Wald 🌲 gehen, um Blätter 🌿 zu holen, rief alle zu sich und sagte:' },
              { type: 'dialog', text: '— Liebliche Kinder 👶, ich gehe in den Wald, bleibt im Haus 🏠 und schließt die Tür 🚪 gut zu. Macht niemandem auf 😈, der Wolf 🐺 want euch fressen 🍴.' },
              { type: 'text', text: 'Die Geißlein antworteten:' },
              { type: 'dialog', text: '— Fürchte dich nicht, Mutter 👩, wir machen nicht auf 🚪!' }
            ]
          },
          en: {
            languageName: 'English',
            title: 'English',
            paragraphs: [
              { type: 'text', text: 'There was once an old goat 🐐💕 who had seven little kids 🐐✨.' },
              { type: 'text', text: 'One day she wanted to go into the forest 🌲 for leaves 🌿, called them all and said:' },
              { type: 'dialog', text: '— Dear children 👶, I am going into the forest. Stay in the house 🏠 and lock the door 🚪. Don\'t open to anyone 😈 — the wolf 🐺 wants to eat you 🍴.' },
              { type: 'text', text: 'The little kids answered:' },
              { type: 'dialog', text: '— Don\'t worry, mother 👩, we won\'t open 🚪!' }
            ]
          },
          fr: {
            languageName: 'Français',
            title: 'Français',
            paragraphs: [
              { type: 'text', text: 'Il y avait une fois une chèvre 🐐💕 qui avait sept petits chevreaux 🐐✨.' },
              { type: 'text', text: 'Un jour elle voulut aller dans la forêt 🌲 chercher des feuilles 🌿, elle les appela tous et dit :' },
              { type: 'dialog', text: '— Mes chers enfants 👶, je vais dans la forêt. Restez à la maison 🏠 et fermez bien la porte 🚪. N\'ouvrez à personne 😈, le loup 🐺 veut vous manger 🍴.' },
              { type: 'text', text: 'Les chevreaux répondirent :' },
              { type: 'dialog', text: '— N’aie pas peur, maman 👩, nous n’ouvrirons pas 🚪 !' }
            ]
          }
        }
      }
    ]
  },
  {
    id: 'little-red-hen',
    title: 'Mala crvena koka',
    author: 'Traditional Folk Tale',
    coverEmoji: '🐔🌾',
    description: 'A story about the importance of hard work and helping others.',
    pages: [
      {
        translations: {
          hr: {
            languageName: 'Hrvatski',
            title: 'Hrvatski',
            paragraphs: [
              { type: 'text', text: 'Jednom davno, mala crvena koka 🐔 pronašla je zrno pšenice 🌾.' },
              { type: 'dialog', text: '— Tko će mi pomoći posaditi ovo zrno? — upitala je.' },
              { type: 'dialog', text: '— Ja neću — reče mačak 🐱.' },
              { type: 'dialog', text: '— Ja neću — reče pas 🐶.' },
              { type: 'dialog', text: '— Ja neću — reče patka 🦆.' },
              { type: 'dialog', text: '— Onda ću ja sama — reče koka. I tako je i učinila.' }
            ]
          },
          en: {
            languageName: 'English',
            title: 'English',
            paragraphs: [
              { type: 'text', text: 'Once upon a time, a little red hen 🐔 found a grain of wheat 🌾.' },
              { type: 'dialog', text: '— Who will help me plant this grain? — she asked.' },
              { type: 'dialog', text: '— Not I — said the cat 🐱.' },
              { type: 'dialog', text: '— Not I — said the dog 🐶.' },
              { type: 'dialog', text: '— Not I — said the duck 🦆.' },
              { type: 'dialog', text: '— Then I will do it myself — said the hen. And so she did.' }
            ]
          },
          es: {
            languageName: 'Español',
            title: 'Español',
            paragraphs: [
              { type: 'text', text: 'Érase una vez una gallinita roja 🐔 que encontró un grano de trigo 🌾.' },
              { type: 'dialog', text: '— ¿Quién me ayudará a plantar este grano? — preguntó.' },
              { type: 'dialog', text: '— Yo no — dijo el gato 🐱.' },
              { type: 'dialog', text: '— Yo no — dijo el perro 🐶.' },
              { type: 'dialog', text: '— Yo no — dijo el pato 🦆.' },
              { type: 'dialog', text: '— Entonces lo haré yo misma — dijo la gallinita. Y así lo hizo.' }
            ]
          }
        }
      }
    ]
  }
];
