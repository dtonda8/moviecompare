import { Notyf } from 'notyf';

export const generalNotfy = new Notyf({
    duration: 2000,
    position: {y: 'top'}
  });
export const warningNotyf = new Notyf({
    duration: 2000,
    position: {y: 'top'},
    types: [
    {
        type: 'success',
        background: 'orange',
        duration: 2000,
    }
    ]});
