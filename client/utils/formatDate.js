export const formatDate = (date, extented) => {
    if(!date) {
        return '';
    }

    let d = new Date(date);
    const daysZero = d.getDate() < 10 ? '0' : '';
    const monthsZero = d.getMonth() < 9 ? '0' : '';
    let dateString = daysZero + d.getDate() + '.' + monthsZero + (d.getMonth() + 1) + '.' + d.getFullYear();

    if(extented) {
        const hoursZero = d.getHours() < 10 ? '0' : '';
        const minutesZero = d.getMinutes() < 10 ? '0' : '';
        dateString += ' ' + hoursZero + d.getHours() + ':' + d.getMinutes() + minutesZero;
    }
    
    return dateString;
}