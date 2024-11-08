import { animate, keyframes, state, style, transition, trigger } from "@angular/animations";

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
    animate(200, style({
      backgroundColor: '#63B77C'
    })),
    animate(100, style({
      transform: 'scale(1.1)'
    })),
    animate(200, style({
      transform: 'scale(1)'
    }))
  ])
])
