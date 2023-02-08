import { Notyf } from 'notyf';

export const generalNotfy = new Notyf({ duration: 2000 });
export const warningNotyf = new Notyf({
    duration: 2000,
    types: [
    {
        type: 'success',
        background: 'orange',
        duration: 2000,
    }
    ]});
