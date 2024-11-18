import { animate, group, keyframes, query, stagger, state, style, transition, trigger } from "@angular/animations";

export const highlightedStateTrigger = trigger('highlightedState', [
    state('default', style({
      border: '2px solid #B2B6FF',
    })),
    state('highlighted', style({
      border: '4px solid #B2B6FF',
      filter: 'brightness(92%)'
    })),
    transition('default => highlighted', [
      animate('200ms ease-out', style({
        transform: 'scale(1.02)'
      })),
      animate(200)
    ])
])

export const shownStateTrigger = trigger('shownState', [
    state('shown', style({
      
    })),
    transition(':enter', [
        style({
            opacity: 0
        }),
        animate(300, style({
            opacity: 1
        }))
    ]),
    transition(':leave', [
        animate(300, style({
            opacity: 0
        }))
    ])
])

export const buttonStateTrigger = trigger('buttonState', [
  transition(':enter', [
    animate('400ms ease-in', style({
      transform: 'scale(0.4)',
    })),
  ]),
])

export const checkButtonTrigger = trigger('checkButton', [
  transition(':enter', [
    style({
      opacity: 0,
      width: 0
    }),
    animate('400ms ease-out', keyframes([
      style({offset: 0, opacity: 0, width: 0}),
      style({offset: 0.8, opacity: 0.5, width: '*'}),
      style({offset: 1, opacity: 1, width: '*'})
    ]))
  ]),
  transition(':leave', [
    animate('200ms cubic-bezier(.13,.9,.8,.1)', style({
      opacity: 0,
      width: 0
    }))
  ])
])

export const filterTrigger = trigger('filterAnimation',[
  transition(':enter',[
    style({opacity: 0, width: 0}),
    animate('400ms cubic-bezier(.13,.9,.8,.1)', keyframes([
      style({opacity: 0, width: 0, offset: 0}),
      style({opacity: 0.5, width: '*', backgroundColor: 'lightgreen', offset: 0.5}),
      style({opacity: 1, width: '*', backgroundColor: 'lightblue', offset: 1})
    ]))
    ]),
    transition(':leave',[
    animate('400ms ease-out', style({opacity: 0, width: 0}))
  ])
])

export const formButtonTrigger = trigger('formButton', [
  transition('invalid => valid', [
    query('#botao-salvar', [
      group([
        animate(200, style({
          backgroundColor: '#63B77C'
        })),
        animate(100, style({
          transform: 'scale(1.1)'
        })),
      ]),
      animate(200, style({
        transform: 'scale(1)'
      }))
    ], { optional: true }),
  ]),
  transition('valid => invalid', [
    query('#botao-salvar', [
    group([
      animate(200, style({
        backgroundColor: '#6C757D'
      })),
      animate(100, style({
        transform: 'scale(1.1)'
      })),
    ]),
    animate(200, style({
      transform: 'scale(1)'
    }))
  ], { optional: true }),
  ])
])

export const flyInOutTrigger = trigger('flyInOut', [
  transition(':enter', [
    style({
      width: '100%',
      transform: 'translateX(-100%)',
      opacity: 0,
      marginLeft: '-300px'
    }),
    group([
      animate('0.3s 0.1s ease', style({
        transform: 'translateX(0%)',
        width: '*'
      })),
      animate('0.3s ease', style({
        opacity: 1,
        marginLeft: '0px'
      }))
    ]),
    transition(':leave', [
      group([
        animate('0.3s ease', style({
          transform: 'translateX(100%)',
          width: '*'
        })),
        animate('0.3s 0.2s ease', style({
          opacity: 0
        }))
      ])
    ])
  ])
])

export const shakeTrigger = trigger('shakeAnimation', [
  transition('* => shake', [
    query('input.ng-invalid:focus, select.ng-invalid:focus', [
      animate('0.5s', keyframes([
        style({ border: '2px solid red', offset: 0 }),
        style({ transform: 'translateX(-10px)', offset: 0.1 }),
        style({ transform: 'translateX(10px)', offset: 0.2 }),
        style({ transform: 'translateX(-10px)', offset: 0.3 }),
        style({ transform: 'translateX(10px)', offset: 0.4 }),
        style({ transform: 'translateX(-10px)', offset: 0.5 }),
        style({ transform: 'translateX(10px)', offset: 0.6 }),
        style({ transform: 'translateX(-10px)', offset: 0.7 }),
        style({ transform: 'translateX(10px)', offset: 0.8 }),
        style({ transform: 'translateX(0px)', offset: 0.9 })
      ]))
    ], {optional: true})
  ])
]);

export const listStateTrigger = trigger('listState', [
  transition('* => *', [
    query(':enter',[
      style({
        opacity: 0,
        transform: 'translateX(-100%)'
      }),
      stagger(200, [
        animate('500ms ease-out', keyframes([
          style({
            opacity: 1,
            transform: 'translateX(15%)',
            offset: 0.4
          }),
          style({
            opacity: 1,
            transform: 'translateX(0)',
            offset: 1
          })
      ]))
      ])
    ], {optional: true}),
  ])
])