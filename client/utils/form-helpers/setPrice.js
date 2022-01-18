export default function setInteger(e, field, cb, max) {
    let value = e.target.value;
    if(value <= 0 || isNaN(value) || !value) {
      value = '';
    }

    if (value && value < 1 ) {
        value = 1;
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
        value = parseFloat(value);
        value = value.toFixed(2);
    }
    cb(field, value);  
}