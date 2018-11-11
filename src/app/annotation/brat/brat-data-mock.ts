// Données d'initialisation d'exemple (devront être remplacée par
export let collData = {
  'messages': [],
  'items': [],
  'ui_names': {
    'entities': 'annotation',
    'events': 'événements',
    'relations': 'relations',
    'attributes': 'attributs'
  },
  'search_config': [
    ['Google', 'http://www.google.com/search?q=%s'],
    ['Wikipedia', 'http://en.wikipedia.org/wiki/Special:Search?search=%s'],
    ['UniProt', 'http://www.uniprot.org/uniprot/?sort=score&query=%s'],
    ['EntrezGene', 'http://www.ncbi.nlm.nih.gov/gene?term=%s'],
    ['GeneOntology', 'http://amigo.geneontology.org/cgi-bin/amigo/search.cgi?search_query=%s&action=new-search&search_constraint=term'],
    ['ALC', 'http://eow.alc.co.jp/%s']
  ],
  'disambiguator_config': [],
  'unconfigured_types': [
    {
      'borderColor': 'darken',
      'arrowHead': 'triangle,5',
      'name': 'Cause',
      'color': '#007700',
      'labels': [
        'Cause'
      ],
      'unused': true,
      'bgColor': 'lightgreen',
      'type': 'Cause',
      'fgColor': 'black'
    }
  ],
  'entity_types': [
    {
      'name': 'Person',
      'type': 'Person',
      'labels': ['Per', 'P'],
      'bgColor': '#FE2E2E',
      'borderColor': 'darken',
      // "children": [],
      'unused': false,
      'attributes': [
        'Notorious', 'Polarity'
      ],
      'arcs': [{
        'arrowHead': 'triangle,5',
        'color': 'black',
        'labels': ['Ennemy', 'Enn'],
        'dashArray': ',',
        'hotkey': 'T',
        'type': 'Ennemy',
        'targets': ['Person']
      },
      {
        'arrowHead': 'triangle,5',
        'color': 'black',
        'labels': ['Friend', 'Fr'],
        'dashArray': ',',
        'hotkey': 'T',
        'type': 'Friend',
        'targets': ['Person']
      },
      {
        'arrowHead': 'triangle,5',
        'color': 'black',
        'labels': ['Destruction', 'Dest'],
        'dashArray': ',',
        'hotkey': 'T',
        'type': 'Destruction',
        'targets': ['Object', 'Person']
      }],
      'children': [
        {
          'name': 'Child',
          'type': 'Child',
          'labels': ['Child', 'Child'],
          'bgColor': '#FE2E2E',
          'borderColor': 'darken',
          'children': [
            {
              'name': 'Baby',
              'type': 'Baby',
              'labels': ['Baby', 'Baby'],
              'bgColor': '#DF7401',
              'borderColor': 'darken',
              'children': []
            },
            {
              'name': 'Kid',
              'type': 'Kid',
              'labels': ['Kid', 'Kid'],
              'bgColor': '#FE2E2E',
              'borderColor': 'darken',
              'children': []
            }
          ]
        }/*,
                       {
                       "name": "Teenager",
                       "type"   : "Person",
                       "labels" : ["Person", "Per"],
                       "bgColor": "#FE2E2E",
                       "borderColor": "darken",
                       "children": [],
                       },
                       {
                       "name": "Adult",
                       "type"   : "Adult",
                       "labels" : ["Adult", "Adult"],
                       "bgColor": "#FE2E2E",
                       "borderColor": "darken",
                       "children": []
                       }*/
      ]
    },
    // null, //will produde <hr> between entity groups or single entities but generate bugs with current code
    {
      'name': 'Object',
      'type': 'Object',
      'labels': ['Object', 'Obj'],
      'bgColor': '#7fa2ff',
      'borderColor': 'darken',
      'attributes': [],
      'children': [],
      'unused': false,
      'arcs': [{
        'arrowHead': 'triangle,5',
        'color': 'black',
        'labels': ['Destruction', 'Dest'],
        'dashArray': ',',
        'hotkey': 'T',
        'type': 'Destruction',
        'targets': ['Object', 'Person']
      }]
    }],
  'event_attribute_types': [
    {
      'labels': null,
      'type': 'Confidence',
      'name': 'Confidence',
      'unused': false,
      'values': {
        'Certain': {
          'dashArray': ','
        },
        'Likely': {
          'dashArray': '3,3'
        },
        'Possible': {
          'dashArray': '3,6'
        }
      }
    },
    {
      'labels': null,
      'type': 'BombType', // Renaud, make sure type has no space in it, it is used as a jquery selector class
      'name': 'BombType',
      'unused': false,
      'values': {
        'Nuclear bomb': {},
        'Neutron bomb': {},
        'Napalm bomb': {},
        'Hydrogen bomb': {}
      }
    },
    {
      'name': 'Epic',
      'type': 'Epic',
      'values': { 'Epic': { 'glyph': '★★★' } }
    }
  ],
  'entity_attribute_types': [
    {
      'name': 'Notorious',
      'type': 'Notorious',
      'values': { 'Notorious': { 'glyph': '★' } }
    },
    {
      'type': 'Polarity',
      'name': 'Polarity',
      'values': {
        'Positive': {
          'box': 'none',
          'glyph': '\n[Polarity:true]',
          'dashArray': '1,2'
        },
        'Negative': {
          'box': 'crossed',
          'glyph': '\n[Polarity:false]',
          'dashArray': '3,4'
        }
      }
    }
  ],
  'relation_attribute_types': [
    {
      'labels': null,
      'type': 'RelConfidence',
      'name': 'Relation Confidence',
      'unused': false,
      'values': {
        'Certain': {
          'dashArray': ','
        },
        'Likely': {
          'dashArray': '3,3'
        },
        'Possible': {
          'dashArray': '3,6'
        }
      }
    },
    {
      'name': 'Safe',
      'type': 'Safe',
      'values': { 'Safe': {} }
    }
  ],
  'relation_types': [
    {
      'type': 'Destruction',
      'labels': ['Destruction', 'Dest'],
      'dashArray': '3,3',
      'color': 'purple',
      'args': [
        { 'role': 'Destructor', 'targets': ['Person', 'Object'] },
        { 'role': 'Destroyed', 'targets': ['Person', 'Object'] }
      ]
    },
    {
      'type': 'Friend',
      'labels': ['Friend', 'Fr'],
      'dashArray': '3,3',
      'color': 'purple',
      'attributes': [
        'RelConfidence', 'Safe'
      ],
      'args': [
        { 'role': 'From', 'targets': ['Person'] },
        { 'role': 'To', 'targets': ['Person'] }
      ]
    },
    {
      'type': 'Ennemy',
      'labels': ['Ennemy', 'Enn'],
      'dashArray': '3,3',
      'color': 'purple',
      'args': [
        { 'role': 'From', 'targets': ['Person'] },
        { 'role': 'To', 'targets': ['Person'] }
      ]
    },
    {
      'type': 'Perpetrator',
      'labels': ['Perpetrator', 'Perp'],
      'dashArray': '3,3',
      'color': 'purple',
      'args': [
        { 'role': 'From', 'targets': ['Assassination'] },
        { 'role': 'To', 'targets': ['Person'] }
      ]
    }
  ],
  'event_types': [
    {
      'name': 'Assassination',
      'type': 'Assassination',
      'labels': ['Assassination', 'Assas'],
      'bgColor': 'lightgreen',
      'borderColor': 'darken',
      'attributes': [
        'Epic'
      ],
      'children': [],
      'unused': false,
      'arcs': [
        {
          'type': 'Victim',
          'labels': [
            'Victim',
            'Vict'
          ],
          targets: [
            'Person'
          ],
        },
        {
          'type': 'Perpetrator',
          'labels': [
            'Perpetrator',
            'Perp'
          ],
          targets: [
            'Person'
          ],
          'color': 'green'
        }
      ]
    },
    {
      'name': 'Bomb',
      'type': 'Bomb',
      'labels': ['Bomb', 'Bomb'],
      'bgColor': 'gold',
      'borderColor': 'darken',
      'attributes': [
        'BombType'
      ],
      'children': [],
      'unused': false,
      'arcs': [
        {
          'type': 'Destroyed',
          'labels': ['Destroyed', 'Dest'],
          'color': 'gold'
        }
      ]
    },
    {
      'name': 'Resurrection',
      'type': 'Resurrection',
      'labels': ['Resurrection', 'Resur'],
      'bgColor': 'magenta',
      'borderColor': 'darken',
      'attributes': [
        'Epic', 'Confidence'
      ],
      'children': [],
      'unused': false,
      'arcs': [
        {
          'type': 'Resurrected',
          'labels': ['Resurrected', 'Resur'],
          'color': 'magenta'
        },
        {
          // "arrowHead": "triangle,5",
          // "dashArray": ",",
          // "hotkey": "T",
          // "targets": [],
          'type': 'Savior',
          'labels': ['Savior', 'Sav'],
          'color': 'magenta'
        }
      ]
    }
  ]
};

export let docData = {
  'messages': [],
  'source_files': ['ann', 'txt'],
  'modifications': [],
  'normalizations': [],
  'ctime': 1351154734.5055847,
  'text': 'Ed O\'Kelley was the man who shot the man who shot Jesse James.\nJ\'ai castor le plus petit, mais le plus fort.',
  'entities': [
    /*["N1", "Person", [[0, 2], [5, 11]]],
    ["N2", "Person", [[20, 55], [55, 90], [90,124]]],
    ["N3", "Person", [[37, 40]]],
    ["N4", "Object", [[78, 83], [84, 93]]],
    ["N5", "Person", [[98, 104]]],
    ["N6", "Person", [[105, 111]]],
    ["N7", "Person", [[115, 120]]],
    ["N8", "Person", [[50, 61]]]*/
  ],
  'attributes': [
    /*["A1", "Notorious", "N4"],
    ["A2", "Polarity", "N1", "Positive"],
    ["A3", "Polarity", "N2", "Negative"],
    ["A4", "Epic", "T1"],
    ["A5", "Safe", "R1"]*/// Relation attributes ignored by client at this point
  ],
  'relations': [
    // ["R1", "Friend", [["From", "N2"], ["To", "N1"]]]
  ],
  'triggers': [
    // ["T1", "Assassination", [[45, 49]]],
    // ["T2", "Resurrection", [[28, 32]]],
    // ["T3", "Bomb", [[78, 93]]]
  ],
  'events': [
    // ["E1", "T1", [["Perpetrator", "N3"], ["Victim", "N8"]]],
    // ["E2", "T2", [["Savior", "N2"], ["Resurrected", "N3"]]],
    // ["E3", "T3", [["Destroyed", "N5"], ["Destroyed", "N6"], ["Destroyed", "N7"]]]
  ],
  'comments': [
    // ["N1", "AnnotatorNotes", "test comment"]
  ]
};

// Corrigé pour charger correctement les polices (fonts) (Reste à revoir)
export let options = {
  assetsPath: 'assets/brat-client/static/',
  webFontURLs: [//
    'fonts/Astloch-Bold.ttf',
    'fonts/PT_Sans-Caption-Web-Regular.ttf',
    'fonts/Liberation_Sans-Regular.ttf'
  ],
  ajax: 'local',
  overWriteModals: false,
  maxFragmentLength: 30,
  showTooltip: true
};
