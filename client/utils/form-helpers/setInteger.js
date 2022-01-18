export default function setInteger(e, field, cb, max) {
    let value = e.target.value;
    if(value < 0 || isNaN(value) || !value) {
      value = '';
    }

    if (value && value < 0 ) {
        value = 0;
    }

    if(max) {
        if (value && value > max) {
            value = max;
        }
    } else {
        if (value && value > 10000000) {
            value = 9999999;
        }
    }

    if(value) {
        value = Math.floor(value)
    }
    cb(field, value);  
}